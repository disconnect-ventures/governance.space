// https://www.figma.com/design/bfEklPIeZVRf0P6xC6f1e7/Governance-Space?node-id=34-2282&t=GGJEhGlKd8rVords-4

import { FileTextIcon, HandHelpingIcon } from "lucide-react";
import { ProposalDirectory } from "~/components/features/proposals/ProposalDirectory";
import { PageTitle } from "~/components/layout/PageTitle";
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
        badge="12 registered proposals"
        info="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In dolor odio, laoreet ac eros eu, euismod sollicitudin nulla. Nam sed sem massa. Nunc sit amet porta neque. Vivamus nibh magna, tristique at justo eget, hendrerit convallis risus. Vivamus eleifend felis quis tristique porttitor. Maecenas ornare molestie lobortis. Quisque at ultricies augue."
      ></PageTitle>
      <ProposalDirectory proposals={proposals} />
    </div>
  );
}
