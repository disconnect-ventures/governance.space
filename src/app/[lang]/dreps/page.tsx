import { UsersIcon } from "lucide-react";
import { Metadata } from "next";
import { DRepsDirectory } from "~/components/features/dreps/DRepsDirectory";
import { PageTitle } from "~/components/layout/PageTitle";
import { DRepFilterOption, DRepSortOption, getDReps } from "~/lib/dreps";
import { PageProps } from "../layout";
import { getDictionary } from "~/config/dictionaries";
import { getNetworkMetrics } from "~/lib/analytics";

export const metadata: Metadata = {
  title: "Governance Space - DReps Directory",
  description: "All-in-One Governance Platform",
};

export default async function DRepsDirectoryPage({
  params: paramsPromise,
  searchParams: searchParamsPromise,
}: PageProps) {
  const params = await paramsPromise;
  const locale = params.lang;
  const dictionary = await getDictionary(locale);
  const searchParams = (await searchParamsPromise) ?? {};
  const page = parseInt(searchParams["page"] ?? "0");
  const pageSize = parseInt(searchParams["pageSize"] ?? "20");
  const sort = (searchParams["sort"] as DRepSortOption) ?? "Random";
  const filters = (searchParams["filters"]?.split(",") ??
    []) as DRepFilterOption[];
  const search = searchParams["search"] ?? "";
  const dreps = await getDReps(page, pageSize, search, sort, filters);
  const { totalRegisteredDReps: totalDReps } = await getNetworkMetrics();

  return (
    <div className="space-y-4 bg-background text-foreground dark:bg-background dark:text-foreground">
      <PageTitle
        icon={
          <div className="p-2 rounded-full bg-muted dark:bg-muted/50 w-12 h-12 flex flex-col justify-center items-center">
            <UsersIcon className="text-foreground" />
          </div>
        }
        badge={`${totalDReps}`}
        translations={dictionary.pageDreps}
      />
      <DRepsDirectory
        dreps={dreps.elements}
        params={{
          page,
          pageSize,
          sort,
          search,
          totalResults: dreps.total,
          filters,
        }}
        translations={{
          general: dictionary.general,
          pageDreps: dictionary.pageDreps,
        }}
      />
    </div>
  );
}
