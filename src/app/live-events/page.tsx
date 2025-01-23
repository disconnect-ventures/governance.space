// https://www.figma.com/design/bfEklPIeZVRf0P6xC6f1e7/Governance-Space?node-id=34-1870&t=GGJEhGlKd8rVords-4
import { RadioIcon } from "lucide-react";
import { LiveEventsDirectory } from "~/components/features/liveEvents/LiveEventsDirectory";
import { PageTitle } from "~/components/layout/PageTitle";
import { Badge } from "~/components/ui/badge";
import { getMockLiveEvents } from "~/lib/mock";

export default async function LiveEventsPage() {
  const liveEvents = getMockLiveEvents();
  return (
    <div className="space-y-4">
      <PageTitle
        title="Live Events"
        icon={
          <div className="p-2 rounded-full bg-gray-300 w-12 h-12 flex flex-col justify-center items-center">
            <RadioIcon />
          </div>
        }
      >
        <Badge
          variant="secondary"
          className="bg-gray-100 border-foreground p-2 rounded-full"
        >
          200 events in the last 24h
        </Badge>
      </PageTitle>
      <LiveEventsDirectory liveEvents={liveEvents} />
    </div>
  );
}
