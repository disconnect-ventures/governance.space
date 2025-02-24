import { RadioIcon } from "lucide-react";
import { Metadata } from "next";
import { LiveEventsDirectory } from "~/components/features/liveEvents/LiveEventsDirectory";
import ComingSoon from "~/components/layout/ComingSoon";
import { PageTitle } from "~/components/layout/PageTitle";
import { getMockLiveEvents } from "~/lib/mock";

export const metadata: Metadata = {
  title: "Governance Space - Live Events",
  description: "All-in-One Governance Platform",
};

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
        translationPage="pageLiveEvents"
        badge="200 events in the last 24h"
      ></PageTitle>
      <ComingSoon>
        <LiveEventsDirectory liveEvents={liveEvents} params={{}} />
      </ComingSoon>
    </div>
  );
}
