// https://www.figma.com/design/bfEklPIeZVRf0P6xC6f1e7/Governance-Space?node-id=34-2282&t=GGJEhGlKd8rVords-4

import { FileTextIcon, HandHelpingIcon } from "lucide-react";
import { ProposalDirectory } from "~/components/features/proposals/ProposalDirectory";
import { PageTitle } from "~/components/layout/PageTitle";
import { Badge } from "~/components/ui/badge";
import { getProposals } from "~/lib/proposals";

export default async function ProposalsPage() {
  const proposals = await getProposals();
  return (
    <div className="space-y-4">
      <PageTitle
        title="Proposals"
        icon={
          <div className="p-2 rounded-full bg-gray-300 w-12 h-12 flex flex-col justify-center items-center">
            <FileTextIcon className="w-5 h-5 relative top-1" />
            <HandHelpingIcon className="w-6 h-6" />
          </div>
        }
      >
        <Badge
          variant="secondary"
          className="bg-gray-100 border-foreground p-2 rounded-full"
        >
          12 registered proposals
        </Badge>
      </PageTitle>
      <ProposalDirectory proposals={proposals} />
    </div>
  );
}
