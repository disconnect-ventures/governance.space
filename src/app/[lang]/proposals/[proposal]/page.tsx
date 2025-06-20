import { FileTextIcon, HandHelpingIcon } from "lucide-react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProposalContent } from "~/components/features/proposals/ProposalContent";
import { ProposalHeader } from "~/components/features/proposals/ProposalHeader";
import { ProposalIdentification } from "~/components/features/proposals/ProposalIdentification";
import { ProposalTimeline } from "~/components/features/proposals/ProposalTimeline";
import { VotingSection } from "~/components/features/proposals/VotingSection";
import { PageTitle } from "~/components/layout/PageTitle";
import { TopBar } from "~/components/layout/TopBar";
import { Card, CardContent } from "~/components/ui/card";
import { getDictionary } from "~/config/dictionaries";
import { getProposals, getProposalsById } from "~/lib/proposals";
import { calculateEpochNumber } from "~/lib/utils";
import { PageProps } from "../../layout";
import { getProposalComments } from "~/lib/comments";
import { Comments, CommentsSkeleton } from "~/components/features/Comments";
import { Suspense } from "react";
import { Breadcrumbs } from "~/components/layout/Breadcrumbs";

export async function generateMetadata({
  params: paramsPromise,
}: ProposalDetailsProps): Promise<Metadata> {
  const params = await paramsPromise;
  const dictionary = await getDictionary(params.lang);
  const proposalsById = await getProposalsById(params.proposal);
  const proposalName =
    proposalsById.data.attributes.content.attributes.prop_name;
  const proposalId = params.proposal;
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
  const filters: number[] = [];

  const firstPage = await getProposals(page++, pageSize, search, sort, filters);
  const totalPages = firstPage.meta.pagination?.pageCount ?? 0;

  const nextPages = (
    await Promise.all(
      Array.from({ length: totalPages - 1 }).map(async () => {
        try {
          const { data } = await getProposals(
            page++,
            pageSize,
            search,
            sort,
            filters
          );
          return data;
        } catch {
          return [];
        }
      })
    )
  ).flat();

  return [...firstPage.data, ...nextPages].map((p) => ({
    proposal: p.id.toString(),
  }));
}

type ProposalDetailsProps = PageProps<{ proposal: number }>;

export default async function ProposalDetailsPage({
  params: paramsPromise,
}: ProposalDetailsProps) {
  const params = await paramsPromise;
  const locale = params.lang;
  const dictionary = await getDictionary(locale);
  const { proposal: proposalId } = params;
  const { data: proposal } = await getProposalsById(proposalId);

  const createdDate = proposal.attributes.createdAt;
  const createdEpoch = calculateEpochNumber(createdDate);
  const updatedAt = proposal.attributes.updatedAt;
  const updatedEpoch = calculateEpochNumber(updatedAt);

  const title = proposal.attributes.content.attributes.prop_name;
  const username = proposal.attributes.user_govtool_username;
  const isProposalActive =
    proposal.attributes.content.attributes.prop_rev_active;
  const actionType =
    proposal.attributes.content.attributes.gov_action_type.attributes
      .gov_action_type_name;
  const likes = proposal.attributes.prop_likes;
  const dislikes = proposal.attributes.prop_dislikes;
  const commentCount = proposal.attributes.prop_comments_number;

  if (!proposal) {
    return notFound();
  }

  const proposalComments = getProposalComments({
    proposalId: proposalId.toString(),
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
          translations={dictionary.pageProposalsDetails}
        />
        <TopBar backHref="/proposals" translations={dictionary.general} />
        <Card className="mb-4 bg-card text-card-foreground">
          <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-6">
            <div className="w-full flex flex-col gap-4 sm:gap-6">
              <ProposalHeader
                title={title}
                isActive={isProposalActive}
                type={actionType}
                createdDate={createdDate}
                createdEpoch={createdEpoch}
                updatedAt={updatedAt}
                updatedEpoch={updatedEpoch}
                likes={likes}
                dislikes={dislikes}
                commentCount={commentCount}
                translations={dictionary}
                contentType="proposal"
              />

              <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_1fr]">
                <div className="w-full col-span-full">
                  <ProposalIdentification
                    id={proposalId.toString()}
                    authorName={username}
                    translations={dictionary}
                  />
                </div>
                <div className="w-full lg:col-span-2">
                  <ProposalTimeline
                    createdTime={createdDate}
                    createdEpoch={createdEpoch}
                    updateDate={updatedAt}
                    updateEpoch={updatedEpoch}
                    translations={dictionary}
                  />
                </div>
              </div>

              <ProposalContent proposal={proposal} translations={dictionary} />
            </div>
          </CardContent>
        </Card>
        <Card className="mb-4 sm:mb-6 bg-card text-card-foreground">
          <CardContent className="p-4 sm:p-6">
            <VotingSection translations={dictionary} />
          </CardContent>
        </Card>
        <Suspense fallback={<CommentsSkeleton />}>
          <Comments
            loadChildCommentsAction={getProposalComments}
            commentsPromise={proposalComments}
            translations={dictionary}
            proposalId={proposalId.toString()}
            totalCommentCount={proposal.attributes.prop_comments_number}
            type="proposal"
          />
        </Suspense>
      </div>
    </>
  );
}
