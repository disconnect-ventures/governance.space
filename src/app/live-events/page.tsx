// https://www.figma.com/design/bfEklPIeZVRf0P6xC6f1e7/Governance-Space?node-id=34-1870&t=GGJEhGlKd8rVords-4
import { RadioIcon } from "lucide-react";
import { LiveEventsDirectory } from "~/components/features/liveEvents/LiveEventsDirectory";
import { PageTitle } from "~/components/layout/PageTitle";
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
        info="See all governance events in real time."
        badge="200 events in the last 24h"
      >
      </PageTitle>
      <LiveEventsDirectory liveEvents={liveEvents} />
    </div>
  );
}
