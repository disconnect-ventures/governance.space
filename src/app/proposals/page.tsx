// https://www.figma.com/design/bfEklPIeZVRf0P6xC6f1e7/Governance-Space?node-id=34-2282&t=GGJEhGlKd8rVords-4

import { ProposalDirectory } from "~/components/features/proposals/ProposalDirectory";
import { getProposals } from "~/lib/proposals";

export default async function ProposalsPage() {
  const proposals = await getProposals();
  return (
    <div className="space-y-4">
      <ProposalDirectory proposals={proposals} />
    </div>
  );
}
