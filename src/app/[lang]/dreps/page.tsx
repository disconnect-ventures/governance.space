import { UsersIcon } from "lucide-react";
import { Metadata } from "next";
import { DRepsDirectory } from "~/components/features/dreps/DRepsDirectory";
import { PageTitle } from "~/components/layout/PageTitle";
import { DRepFilterOption, DRepSortOption, getDReps } from "~/lib/dreps";
import { PageProps } from "../layout";
import { getDictionary } from "~/config/dictionaries";

export const metadata: Metadata = {
  title: "Governance Space - DReps Directory",
  description: "All-in-One Governance Platform",
};

export default async function DRepsDirectoryPage({
  params: paramsPromise,
  searchParams: searchParamsPromise,
}: PageProps) {
  const params = await paramsPromise;
  const searchParams = (await searchParamsPromise) ?? {};
  const page = parseInt(searchParams["page"] ?? "0");
  const pageSize = parseInt(searchParams["pageSize"] ?? "20");
  const sort = (searchParams["sort"] as DRepSortOption) ?? "Random";
  const filters = (searchParams["filters"]?.split(",") ??
    []) as DRepFilterOption[];
  const search = searchParams["search"] ?? "";
  const dreps = await getDReps(page, pageSize, search, sort, filters);
  const { total: totalDReps } = await getDReps(0, 1, "", "Random", []);
  const locale = params.lang;
  const dictionary = await getDictionary(locale);
  const badgeText = dictionary.pageDReps.badgeText;

  return (
    <div className="space-y-4">
      <PageTitle
        title={"DReps Directory"}
        icon={<UsersIcon />}
        badge={`${totalDReps} ${badgeText}`}
        translationPage="pageDReps"
      ></PageTitle>
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
      />
    </div>
  );
}
