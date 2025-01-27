// https://www.figma.com/design/bfEklPIeZVRf0P6xC6f1e7/Governance-Space?node-id=30-346&t=GGJEhGlKd8rVords-4
import { UsersIcon } from "lucide-react";
import {
  DRepsDirectory,
  DRepsDirectoryProps,
} from "~/components/features/dreps/DRepsDirectory";
import { PageTitle } from "~/components/layout/PageTitle";
import { getDReps } from "~/lib/dreps";

export default async function DRepsDirectoryPage() {
  const dreps = await getDReps();
  return (
    <div className="space-y-4">
      <PageTitle
        title={"DReps Directory"}
        icon={<UsersIcon />}
        badge="259 registered DReps"
        info="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In dolor odio, laoreet ac eros eu, euismod sollicitudin nulla. Nam sed sem massa. Nunc sit amet porta neque. Vivamus nibh magna, tristique at justo eget, hendrerit convallis risus. Vivamus eleifend felis quis tristique porttitor. Maecenas ornare molestie lobortis. Quisque at ultricies augue."
      ></PageTitle>
      <DRepsDirectory dreps={dreps as DRepsDirectoryProps["dreps"]} />
    </div>
  );
}
