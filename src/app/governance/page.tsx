// https://www.figma.com/design/bfEklPIeZVRf0P6xC6f1e7/Governance-Space?node-id=34-1870&t=GGJEhGlKd8rVords-4
import { BookOpenCheckIcon } from "lucide-react";
import { GovernanceActionDirectory } from "~/components/features/governance/GovernanceActionDirectory";
import { PageTitle } from "~/components/layout/PageTitle";
import { getGovernanceActions } from "~/lib/governance-actions";

export default async function GovernancePage() {
  let governanceActions = await getGovernanceActions();
  governanceActions = new Array(18).fill(governanceActions[0]);

  return (
    <div className="space-y-4">
      <PageTitle
        title="Governance Actions"
        icon={
          <div className="p-2 rounded-full bg-gray-300 w-12 h-12 flex flex-col justify-center items-center">
            <BookOpenCheckIcon />
          </div>
        }
        info="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In dolor odio, laoreet ac eros eu, euismod sollicitudin nulla. Nam sed sem massa. Nunc sit amet porta neque. Vivamus nibh magna, tristique at justo eget, hendrerit convallis risus. Vivamus eleifend felis quis tristique porttitor. Maecenas ornare molestie lobortis. Quisque at ultricies augue."
      ></PageTitle>
      <GovernanceActionDirectory governanceActions={governanceActions} />
    </div>
  );
}
