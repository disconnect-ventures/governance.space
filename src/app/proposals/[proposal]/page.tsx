import { ProposalContent } from "~/components/features/proposals/ProposalContent";
import { ProposalHeader } from "~/components/features/proposals/ProposalHeader";
import { ProposalIdentification } from "~/components/features/proposals/ProposalIdentification";
import { ProposalTimeline } from "~/components/features/proposals/ProposalTimeline";
import { VotingSection } from "~/components/features/proposals/VotingSection";
import { TopBar } from "~/components/layout/TopBar";
import { Card, CardContent } from "~/components/ui/card";

// https://www.figma.com/design/bfEklPIeZVRf0P6xC6f1e7/Governance-Space?node-action=34-2076&t=GGJEhGlKd8rVords-4
type ProposalDetailsProps = {
  params: Promise<{
    proposal: string;
  }>;
};

export default async function ProposalDetailsPage({
  params,
}: ProposalDetailsProps) {
  const { proposal } = await params;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="space-y-4 sm:space-y-6">
        {/* Header section with responsive text and spacing */}
        <h1 className="text-2xl sm:text-3xl font-bold pt-4 sm:pt-6">
          Proposal Details
        </h1>

        <TopBar backHref="/proposals" />

        {/* Main content card with responsive padding */}
        <Card className="mb-4">
          <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-6">
            <div className="grid gap-4 sm:gap-6">
              <ProposalHeader />
              
              {/* Wrap identification and timeline in a responsive grid */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="w-full">
                  <ProposalIdentification />
                </div>
                <div className="w-full">
                  <ProposalTimeline />
                </div>
              </div>
              
              <ProposalContent />
            </div>
          </CardContent>
        </Card>

        {/* Voting section with responsive layout */}
        <Card className="mb-4 sm:mb-6">
          <CardContent className="p-4 sm:p-6">
            <VotingSection />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}