import { UsersIcon } from "lucide-react";
import { Metadata } from "next";
import { DRepsDirectory } from "~/components/features/dreps/DRepsDirectory";
import { PageTitle } from "~/components/layout/PageTitle";
import { DRepFilterOption, DRepSortOption, getDReps } from "~/lib/dreps";
import { PageProps } from "../layout";

export const metadata: Metadata = {
  title: "Governance Space - DReps Directory",
  description: "All-in-One Governance Platform",
};

export default async function DRepsDirectoryPage({
  searchParams: searchParamsPromise,
}: PageProps) {
  const searchParams = (await searchParamsPromise) ?? {};
  const page = parseInt(searchParams["page"] ?? "0");
  const pageSize = parseInt(searchParams["pageSize"] ?? "20");
  const sort = (searchParams["sort"] as DRepSortOption) ?? "Random";
  const filters = (searchParams["filters"]?.split(",") ??
    []) as DRepFilterOption[];
  const search = searchParams["search"] ?? "";
  const dreps = await getDReps(page, pageSize, search, sort, filters);
  const { total: totalDReps } = await getDReps(0, 1, "", "Random", []);

  return (
    <div className="space-y-4">
      <PageTitle
        title={"DReps Directory"}
        icon={<UsersIcon />}
        badge={`${totalDReps} registered DReps`}
        info="Delegated Representatives (DReps) are ADA holders who registered on-chain to allow other members of the community to delegate their voting power to them, so that they can vote on their behalf. They are are like 'parlimentary representatives' in the Governance system."
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
