import { RadioIcon } from "lucide-react";
import { Metadata } from "next";
import { LiveEventsDirectory } from "~/components/features/liveEvents/LiveEventsDirectory";
import ComingSoon from "~/components/layout/ComingSoon";
import { PageTitle } from "~/components/layout/PageTitle";
import { getDictionary } from "~/config/dictionaries";
import { getMockLiveEvents } from "~/lib/mock";
import { PageProps } from "../layout";
import { Breadcrumbs } from "~/components/layout/Breadcrumbs";

export async function generateMetadata({
  params: paramsPromise,
}: PageProps): Promise<Metadata> {
  const params = await paramsPromise;
  const dictionary = await getDictionary(params.lang);

  return {
    title: `${dictionary.pageLiveEvents.title} - ${dictionary.metatags.title}`,
    description: dictionary.metatags.description,
  };
}

export default async function LiveEventsPage({
  params: paramsPromise,
}: PageProps) {
  const params = await paramsPromise;
  const locale = params.lang;
  const dictionary = await getDictionary(locale);
  const liveEvents = getMockLiveEvents();
  return (
    <>
      <Breadcrumbs translations={dictionary.breadcrumbs} />
      <div className="space-y-4 bg-background text-foreground">
        <PageTitle
          icon={
            <div className="p-2 rounded-full bg-muted text-muted-foreground w-12 h-12 flex flex-col justify-center items-center">
              <RadioIcon />
            </div>
          }
          translations={dictionary.pageLiveEvents}
        ></PageTitle>
        <ComingSoon>
          <LiveEventsDirectory
            liveEvents={liveEvents}
            params={{}}
            translations={dictionary}
          />
        </ComingSoon>
      </div>
    </>
  );
}
