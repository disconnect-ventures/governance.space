import { FileTextIcon, HandHelpingIcon } from "lucide-react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProposalHeader } from "~/components/features/proposals/ProposalHeader";
import { ProposalIdentification } from "~/components/features/proposals/ProposalIdentification";
import { ProposalTimeline } from "~/components/features/proposals/ProposalTimeline";
import { VotingSection } from "~/components/features/proposals/VotingSection";
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

export async function generateMetadata({
  params,
}: BudgetDiscussionDetailsProps): Promise<Metadata> {
  const proposalId = (await params).discussion;

  return {
    title: `Governance Space - Proposal ${proposalId}`,
    description: "All-in-One Governance Platform",
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
    proposal: p.id,
  }));
}

type BudgetDiscussionDetailsProps = PageProps<{ discussion: number }>;

export default async function ProposalDetailsPage({
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

  return (
    <div className="bg-background text-foreground">
      <PageTitle
        icon={
          <div className="p-2 rounded-full bg-muted text-muted-foreground w-12 h-12 flex flex-col justify-center items-center">
            <FileTextIcon className="w-5 h-5 relative top-1" />
            <HandHelpingIcon className="w-6 h-6" />
          </div>
        }
        translations={dictionary.pageProposalsDetails}
      />
      <TopBar backHref="/proposals" translations={dictionary.general} />
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
              typeLabel={dictionary.pageBudgetDiscussions.cardTypeLabel}
            />
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_1fr]">
              <div className="w-full col-span-full">
                <ProposalIdentification
                  id={discussionId.toString()}
                  authorName={username}
                />
              </div>
              <div className="w-full lg:col-span-2">
                <ProposalTimeline
                  createdTime={createdDate}
                  createdEpoch={createdEpoch}
                  updateDate={updatedAt}
                  updateEpoch={updatedEpoch}
                />
              </div>
            </div>
            <BudgetDiscussionContent discussion={budgetDiscussion} />
          </div>
        </CardContent>
      </Card>
      <Card className="mb-4 sm:mb-6 bg-card text-card-foreground">
        <CardContent className="p-4 sm:p-6">
          <VotingSection />
        </CardContent>
      </Card>
    </div>
  );
}
