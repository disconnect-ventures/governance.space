// https://www.figma.com/design/bfEklPIeZVRf0P6xC6f1e7/Governance-Space?node-id=34-2282&t=GGJEhGlKd8rVords-4

import { FileTextIcon, HandHelpingIcon } from "lucide-react";
import { Metadata } from "next";
import { ProposalDirectory } from "~/components/features/proposals/ProposalDirectory";
import { PageTitle } from "~/components/layout/PageTitle";
import { getProposals } from "~/lib/proposals";

export const metadata: Metadata = {
  title: "Governance Space - Proposals",
  description: "All-in-One Governance Platform",
};

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
        badge="12 registered proposals"
        info="Participate in discussions and decision-making processes guided by community governance. See all the proposed governance actions."
      ></PageTitle>
      <ProposalDirectory proposals={proposals} />
    </div>
  );
}
