import { notFound } from "next/navigation";
import { ProposalContent } from "~/components/features/proposals/ProposalContent";
import { ProposalHeader } from "~/components/features/proposals/ProposalHeader";
import { ProposalIdentification } from "~/components/features/proposals/ProposalIdentification";
import { ProposalTimeline } from "~/components/features/proposals/ProposalTimeline";
import { VotingSection } from "~/components/features/proposals/VotingSection";
import { TopBar } from "~/components/layout/TopBar";
import { Card, CardContent } from "~/components/ui/card";
import { getProposals } from "~/lib/proposals";

type ProposalDetailsProps = {
  params: Promise<{
    proposal: string;
  }>;
};

export default async function ProposalDetailsPage({}: ProposalDetailsProps) {
  const proposal = (await getProposals()).at(0);

  if (!proposal) {
    return notFound();
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="space-y-4 sm:space-y-6">
        <h1 className="text-2xl sm:text-3xl font-bold pt-4 sm:pt-6">
          Proposal Details
        </h1>

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
