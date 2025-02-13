import { BookOpenCheckIcon } from "lucide-react";
import { Metadata } from "next";
import { GovernanceActionDirectory } from "~/components/features/governance/GovernanceActionDirectory";
import { PageTitle } from "~/components/layout/PageTitle";
import {
  getGovernanceActions,
  GovernanceActionFilterOption,
  GovernanceActionSortOption,
} from "~/lib/governance-actions";
import { PageProps } from "../../layout";

export const metadata: Metadata = {
  title: "Governance Space - Governance Actions",
  description: "All-in-One Governance Platform",
};

export default async function GovernancePage({
  searchParams: searchParamsPromise,
}: PageProps) {
  const searchParams = (await searchParamsPromise) ?? {};
  const page = parseInt(searchParams["page"] ?? "0");
  const pageSize = parseInt(searchParams["pageSize"] ?? "20");
  const sort =
    (searchParams["sort"] as GovernanceActionSortOption) ?? "NewestCreated";
  const filters = (searchParams["filters"]?.split(",") ??
    []) as GovernanceActionFilterOption[];
  const search = searchParams["search"] ?? "";

  const governanceActions = await getGovernanceActions(
    page,
    pageSize,
    search,
    sort,
    filters
  );
  // const { total: totalGovernanceActions } = await getGovernanceActions(0, 1, "", "NewestCreated", []);

  return (
    <div className="space-y-4">
      <PageTitle
        title="Governance Actions"
        icon={
          <div className="p-2 rounded-full bg-gray-300 w-12 h-12 flex flex-col justify-center items-center">
            <BookOpenCheckIcon />
          </div>
        }
        info="Anyone that has ADA in a wallet can propose a Governace Action. To submit a Governance Action, the submitter pays a refundable deposit of 100,000 Ada. The deposit will be returned automatically back to the submitter's wallet upon completion of the Voting period."
      ></PageTitle>
      <GovernanceActionDirectory
        governanceActions={governanceActions.elements}
        params={{
          page,
          pageSize,
          sort,
          search,
          totalResults: governanceActions.total,
          filters,
        }}
      />
    </div>
  );
}
