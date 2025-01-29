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
import { getProposalsById } from "~/lib/proposals";

export async function generateMetadata(
  { params, }: ProposalDetailsProps
): Promise<Metadata> {
  const proposalId = (await params).proposal;
  return {
    title: `Governance Space - Proposal ${proposalId}`,
    description: "All-in-One Governance Platform",
  }
}

type ProposalDetailsProps = {
  params: Promise<{
    proposal: number;
  }>;
};

export default async function ProposalDetailsPage({
  params,
}: ProposalDetailsProps) {
  const { proposal: proposalId } = await params;
  const proposal = await getProposalsById(proposalId);

  if (!proposal) {
    return notFound();
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="space-y-4 sm:space-y-6">
        <PageTitle
          title="Proposal Details"
          icon={
            <div className="p-2 rounded-full bg-gray-300 w-12 h-12 flex flex-col justify-center items-center">
              <FileTextIcon className="w-5 h-5 relative top-1" />
              <HandHelpingIcon className="w-6 h-6" />
            </div>
          }
          info="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In dolor odio, laoreet ac eros eu, euismod sollicitudin nulla. Nam sed sem massa. Nunc sit amet porta neque. Vivamus nibh magna, tristique at justo eget, hendrerit convallis risus. Vivamus eleifend felis quis tristique porttitor. Maecenas ornare molestie lobortis. Quisque at ultricies augue."
        />

        <TopBar backHref="/proposals" />

        <Card className="mb-4">
          <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-6">
            <div className="grid gap-4 sm:gap-6">
              <ProposalHeader proposal={proposal} />

              <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_1fr]">
                <div className="w-full">
                  <ProposalIdentification />
                </div>
                <div className="w-full lg:col-span-2">
                  <ProposalTimeline />
                </div>
              </div>

              <ProposalContent proposal={proposal} />
            </div>
          </CardContent>
        </Card>

        <Card className="mb-4 sm:mb-6">
          <CardContent className="p-4 sm:p-6">
            <VotingSection />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
