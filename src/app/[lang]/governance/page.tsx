import { BookOpenCheckIcon } from "lucide-react";
import { Metadata } from "next";
import { GovernanceActionDirectory } from "~/components/features/governance/GovernanceActionDirectory";
import { PageTitle } from "~/components/layout/PageTitle";
import {
  getGovernanceActions,
  GovernanceActionFilterOption,
  GovernanceActionSortOption,
} from "~/lib/governance-actions";
import { PageProps } from "../layout";
import {
  getGovernanceActionMetadata,
  Metadata as ApiMetadata,
  MetadataStandard,
} from "~/lib/metadata";
import { getDictionary } from "~/config/dictionaries";

export const metadata: Metadata = {
  title: "Governance Space - Governance Actions",
  description: "All-in-One Governance Platform",
};

export default async function GovernancePage({
  params: paramsPromise,
  searchParams: searchParamsPromise,
}: PageProps) {
  const params = (await paramsPromise) ?? {};
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

  const metadata: Record<string, ApiMetadata | null> = {};
  await Promise.all(
    governanceActions.elements.map(async (action) => {
      const data = await getGovernanceActionMetadata(
        action.metadataHash,
        MetadataStandard.CIP108,
        action.url
      );
      metadata[action.id] = data;
    })
  );

  const dictionary = await getDictionary(params.lang);

  return (
    <div className="space-y-4 bg-background text-foreground">
      <PageTitle
        icon={
          <div className="p-2 rounded-full bg-muted text-muted-foreground w-12 h-12 flex flex-col justify-center items-center">
            <BookOpenCheckIcon />
          </div>
        }
        badge={`${governanceActions.total}`}
        translations={dictionary.pageGovernanceActions}
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
        metadata={metadata}
      />
    </div>
  );
}
