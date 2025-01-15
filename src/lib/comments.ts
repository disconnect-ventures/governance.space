import { getMockComments } from "./mock";

export type Comment = {
  id: number;
  attributes: {
    proposal_id: string;
    comment_parent_id: number | null;
    user_id: string;
    comment_text: string;
    createdAt: string;
    updatedAt: string;
    user_govtool_username: string;
    subcommens_number: number;
  };
};

export async function getComments(
  // eslint-disable-next-line
  discussionId: number
): Promise<Array<Comment>> {
  return getMockComments();
}
