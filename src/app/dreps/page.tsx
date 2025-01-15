// https://www.figma.com/design/bfEklPIeZVRf0P6xC6f1e7/Governance-Space?node-id=30-346&t=GGJEhGlKd8rVords-4
import { Users } from "lucide-react";
import {
  DRepsDirectory,
  DRepsDirectoryProps,
} from "~/components/features/dreps/DRepsDirectory";
import { Badge } from "~/components/ui/badge";
import { getDReps } from "~/lib/dreps";

export default async function DRepsDirectoryPage() {
  const dreps = await getDReps();
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="p-2 rounded-full bg-gray-300">
            <Users className="h-6 w-6" />
          </div>
          <h1 className="text-4xl font-bold">DReps Directory</h1>
          <Badge
            variant="secondary"
            className="bg-gray-100 border-primary p-2 rounded-full"
          >
            259 registered DReps
          </Badge>
        </div>
      </div>
      <DRepsDirectory dreps={dreps as DRepsDirectoryProps["dreps"]} />
    </div>
  );
}
