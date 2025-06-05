import { FileTextIcon, HandHelpingIcon } from "lucide-react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProposalHeader } from "~/components/features/proposals/ProposalHeader";
import { ProposalIdentification } from "~/components/features/proposals/ProposalIdentification";
import { PageTitle } from "~/components/layout/PageTitle";
import { TopBar } from "~/components/layout/TopBar";
import { Card, CardContent } from "~/components/ui/card";
import { getDictionary } from "~/config/dictionaries";
import { calculateEpochNumber } from "~/lib/utils";
import { PageProps } from "../../layout";
import {
  getBudgetDiscussion,
  listBudgetDiscussions,
} from "~/lib/budgetDiscussions";
import { BudgetDiscussionContent } from "~/components/features/budget/BudgetContent";
import { getBudgetDiscussionComments } from "~/lib/comments";
import { Suspense } from "react";
import { Comments, CommentsSkeleton } from "~/components/features/Comments";
import {
  BudgetVotes,
  VoteResultsSkeleton,
} from "~/components/features/budget/BudgetVotes";
import { Breadcrumbs } from "~/components/layout/Breadcrumbs";

export async function generateMetadata({
  params: paramsPromise,
}: BudgetDiscussionDetailsProps): Promise<Metadata> {
  const params = await paramsPromise;
  const dictionary = await getDictionary(params.lang);
  const budgetDiscussion = await getBudgetDiscussion(params.discussion);
  const proposalName =
    budgetDiscussion?.attributes.bd_proposal_detail?.data.attributes
      .proposal_name;
  const proposalId = params.discussion;
  const title = proposalName ?? proposalId;

  return {
    title: `${title} - ${dictionary.metatags.title}`,
    description: dictionary.metatags.description,
  };
}

export async function generateStaticParams() {
  let page = 0;
  const pageSize = 50;
  const search = "";
  const sort = "desc";

  const firstPage = await listBudgetDiscussions({
    page: page++,
    pageSize,
    search,
    sortDirection: sort,
  });
  const totalPages = firstPage?.meta.pagination?.pageCount ?? 0;

  const nextPages = (
    await Promise.all(
      Array.from({ length: totalPages - 1 }).map(async () => {
        try {
          const response = await listBudgetDiscussions({
            page: page++,
            pageSize,
            search,
            sortDirection: sort,
          });
          return response ? response.data : [];
        } catch {
          return [];
        }
      })
    )
  ).flat();

  return [...(firstPage?.data ?? []), ...nextPages].map((p) => ({
    discussion: p.id.toString(),
  }));
}

type BudgetDiscussionDetailsProps = PageProps<{ discussion: number }>;

export default async function BudgetDiscussionDetailsPage({
  params: paramsPromise,
}: BudgetDiscussionDetailsProps) {
  const params = await paramsPromise;
  const locale = params.lang;
  const dictionary = await getDictionary(locale);
  const { discussion: discussionId } = params;
  const budgetDiscussion = await getBudgetDiscussion(discussionId);

  if (!budgetDiscussion) {
    return notFound();
  }

  const createdDate = budgetDiscussion.attributes.createdAt;
  const createdEpoch = calculateEpochNumber(createdDate);
  const updatedAt = budgetDiscussion.attributes.updatedAt;
  const updatedEpoch = calculateEpochNumber(updatedAt);

  const title =
    budgetDiscussion.attributes.bd_proposal_detail?.data.attributes
      .proposal_name ?? "";
  const username =
    budgetDiscussion.attributes.creator?.data.attributes.govtool_username ?? "";
  const isProposalActive = budgetDiscussion.attributes.is_active;
  const actionType =
    budgetDiscussion.attributes.bd_psapb?.data.attributes.type_name.data
      .attributes;

  const commentCount = budgetDiscussion.attributes.prop_comments_number;

  const commentsPromise = getBudgetDiscussionComments({
    proposalId: discussionId.toString(),
  });

  const breadcrumbsTitle = title ?? undefined;

  return (
    <>
      <Breadcrumbs
        translations={dictionary.breadcrumbs}
        additionalSegment={breadcrumbsTitle}
      />
      <div className="bg-background text-foreground">
        <PageTitle
          icon={
            <div className="p-2 rounded-full bg-muted text-muted-foreground w-12 h-12 flex flex-col justify-center items-center">
              <FileTextIcon className="w-5 h-5 relative top-1" />
              <HandHelpingIcon className="w-6 h-6" />
            </div>
          }
          translations={dictionary.pageBudgetDiscussionDetails}
        />
        <TopBar
          backHref="/budget-discussions"
          translations={dictionary.general}
        />
        <Card className="mb-4 bg-card text-card-foreground">
          <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-6">
            <div className="w-full flex flex-col gap-4 sm:gap-6">
              <ProposalHeader
                title={title}
                isActive={isProposalActive}
                type={actionType?.type_name ?? ""}
                createdDate={createdDate}
                createdEpoch={createdEpoch}
                updatedAt={updatedAt}
                updatedEpoch={updatedEpoch}
                commentCount={commentCount}
                translations={dictionary}
                contentType="budgetDiscussion"
              />
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_1fr]">
                <div className="w-full col-span-full">
                  <ProposalIdentification
                    id={discussionId.toString()}
                    authorName={username}
                    translations={dictionary}
                  />
                </div>
              </div>
              <BudgetDiscussionContent
                discussion={budgetDiscussion}
                translations={dictionary}
              />
            </div>
          </CardContent>
        </Card>

        <div className="mb-4 bg-card text-card-foreground">
          <Suspense fallback={<VoteResultsSkeleton></VoteResultsSkeleton>}>
            <BudgetVotes discussionId={discussionId} dictionary={dictionary} />
          </Suspense>
        </div>

        <Suspense fallback={<CommentsSkeleton />}>
          <Comments
            loadChildCommentsAction={getBudgetDiscussionComments}
            commentsPromise={commentsPromise}
            translations={dictionary}
            proposalId={discussionId.toString()}
            totalCommentCount={commentCount}
            type="budgetDiscussion"
          />
        </Suspense>
      </div>
    </>
  );
}
