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

export const metadata: Metadata = {
  title: "Governance Space - Governance Actions",
  description: "All-in-One Governance Platform",
};

export default async function GovernancePage({ searchParams: searchParamsPromise }: PageProps) {
  const searchParams = (await searchParamsPromise) ?? {};
  const page = parseInt(searchParams["page"] ?? "0");
  const pageSize = parseInt(searchParams["pageSize"] ?? "20");
  const sort = (searchParams["sort"] as GovernanceActionSortOption) ?? "NewestCreated";
  const filters = (searchParams["filters"]?.split(",") ?? []) as GovernanceActionFilterOption[];
  const search = searchParams["search"] ?? "";

  const governanceActions = await getGovernanceActions(page, pageSize, search, sort, filters);

  const metadata: Record<string, ApiMetadata | null> = {};
  await Promise.all(
    governanceActions.elements.map(async (action) => {
      const data = await getGovernanceActionMetadata(
        action.metadataHash,
        MetadataStandard.CIP108,
        action.url,
      );
      metadata[action.id] = data;
    }),
  );

  return (
    <div className="space-y-4 bg-background text-foreground">
      <PageTitle
        title="Governance Actions"
        icon={
          <div className="p-2 rounded-full bg-muted text-muted-foreground w-12 h-12 flex flex-col justify-center items-center">
            <BookOpenCheckIcon />
          </div>
        }
        translationPage="pageGovernanceActions"
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
