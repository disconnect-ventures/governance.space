"use server";
import { fetchApi, PdfApiResponse } from ".";
import { PDF_API_URL } from "./constants";

export interface Comment {
  id: number;
  attributes: {
    proposal_id: string;
    comment_parent_id: string | null;
    user_id: string;
    comment_text: string;
    createdAt: string;
    updatedAt: string;
    bd_proposal_id: string | null;
    drep_id: string;
    comments_reports: {
      data: CommentReport[];
    };
    user_govtool_username: string;
    user_is_validated: boolean;
    subcommens_number: number;
  };
}

interface CommentReport {
  id: number;
  attributes: {
    reporter: {
      data: {
        id: number;
        attributes: {
          username: string;
        };
      };
    };
    maintainer: {
      data: {
        id: number;
        attributes: {
          username: string;
        };
      };
    };
  };
}

export type GetCommentsParams =
  | ProposalGetCommentsParams
  | BudgetDiscussionGetCommentsParams;

export type ProposalGetCommentsParams = BaseGetCommentsParams & {
  type: "proposal";
};

export type BudgetDiscussionGetCommentsParams = BaseGetCommentsParams & {
  type: "budgetDiscussion";
};

export type BaseGetCommentsParams = {
  proposalId: string;
  parentCommentId?: string;
  page?: number;
  pageSize?: number;
  sortBy?: {
    field: string;
    direction: "asc" | "desc";
  };
};

export type CommentResponse = PdfApiResponse<Comment[]>;

export async function getComments(
  params: GetCommentsParams
): Promise<CommentResponse> {
  const {
    type,
    proposalId,
    parentCommentId = null,
    page = 1,
    pageSize = 25,
    sortBy = { field: "createdAt", direction: "desc" },
  } = params;

  const url = new URL("/api/comments", PDF_API_URL);
  const queryParams = url.searchParams;

  if (type === "budgetDiscussion") {
    queryParams.append("filters[$and][0][bd_proposal_id]", proposalId);
  } else {
    queryParams.append("filters[$and][0][proposal_id]", proposalId);
  }

  if (parentCommentId) {
    queryParams.append("filters[$and][1][comment_parent_id]", parentCommentId);
  } else {
    queryParams.append("filters[$and][1][comment_parent_id][$null]", "true");
  }
  queryParams.append(`sort[${sortBy.field}]`, sortBy.direction);
  queryParams.append("pagination[page]", page.toString());
  queryParams.append("pagination[pageSize]", pageSize.toString());
  queryParams.append(
    "populate[comments_reports][populate][reporter][fields][0]",
    "username"
  );
  queryParams.append(
    "populate[comments_reports][populate][maintainer][fields][0]",
    "username"
  );

  try {
    const response = await fetchApi<CommentResponse>(url);
    return response;
  } catch (error) {
    console.error("Error fetching proposal comments:", error);
    throw error;
  }
}

export async function getProposalComments(
  params: Pick<
    ProposalGetCommentsParams,
    Exclude<keyof ProposalGetCommentsParams, "type">
  >
): Promise<CommentResponse> {
  return getComments({
    ...params,
    type: "proposal",
  });
}

export async function getBudgetDiscussionComments(
  params: Pick<
    BudgetDiscussionGetCommentsParams,
    Exclude<keyof BudgetDiscussionGetCommentsParams, "type">
  >
): Promise<CommentResponse> {
  return getComments({
    ...params,
    type: "budgetDiscussion",
  });
}
