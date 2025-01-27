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
        info="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In dolor odio, laoreet ac eros eu, euismod sollicitudin nulla. Nam sed sem massa. Nunc sit amet porta neque. Vivamus nibh magna, tristique at justo eget, hendrerit convallis risus. Vivamus eleifend felis quis tristique porttitor. Maecenas ornare molestie lobortis. Quisque at ultricies augue."
        badge="200 events in the last 24h"
      >
      </PageTitle>
      <LiveEventsDirectory liveEvents={liveEvents} />
    </div>
  );
}
