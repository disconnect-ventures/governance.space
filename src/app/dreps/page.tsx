// https://www.figma.com/design/bfEklPIeZVRf0P6xC6f1e7/Governance-Space?node-id=30-346&t=GGJEhGlKd8rVords-4
import { UsersIcon } from "lucide-react";
import {
  DRepsDirectory,
  DRepsDirectoryProps,
} from "~/components/features/dreps/DRepsDirectory";
import { PageTitle } from "~/components/layout/PageTitle";
import { Badge } from "~/components/ui/badge";
import { getDReps } from "~/lib/dreps";

export default async function DRepsDirectoryPage() {
  const dreps = await getDReps();
  return (
    <div className="space-y-4">
      <PageTitle title={"DReps Directory"} icon={<UsersIcon />}>
        <Badge
          variant="secondary"
          className="bg-gray-100 border-foreground p-2 rounded-full"
        >
          259 registered DReps
        </Badge>
      </PageTitle>
      <DRepsDirectory dreps={dreps as DRepsDirectoryProps["dreps"]} />
    </div>
  );
}
