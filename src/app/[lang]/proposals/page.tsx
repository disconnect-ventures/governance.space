import { FileTextIcon, HandHelpingIcon } from "lucide-react";
import { Metadata } from "next";
import { ProposalDirectory } from "~/components/features/proposals/ProposalDirectory";
import { PageTitle } from "~/components/layout/PageTitle";
import {
  getGovernanceActionProposalTypes,
  getProposals,
  ProposalSortOrderOption,
} from "~/lib/proposals";
import { PageProps } from "../layout";

export const metadata: Metadata = {
  title: "Governance Space - Proposals",
  description: "All-in-One Governance Platform",
};

export default async function ProposalsPage({
  searchParams: searchParamsPromise,
}: PageProps) {
  const proposalTypes = await getGovernanceActionProposalTypes();
  const searchParams = (await searchParamsPromise) ?? {};
  const page = parseInt(searchParams["page"] ?? "0");
  const pageSize = parseInt(searchParams["pageSize"] ?? "20");
  const sort = (searchParams["sort"] as ProposalSortOrderOption) ?? "desc";
  const filters =
    searchParams["filters"]?.split(",").map((f) => parseInt(f)) ?? [];
  const search = searchParams["search"] ?? "";

  const { data, meta } = await getProposals(
    page,
    pageSize,
    search,
    sort,
    filters,
  );
  const { meta: totalMeta } = await getProposals(0, 1, "", "asc", []);

  return (
    <div className="space-y-4">
      <PageTitle
        title="Proposals"
        icon={
          <div className="p-2 rounded-full bg-gray-300 w-12 h-12 flex flex-col justify-center items-center">
            <FileTextIcon className="w-5 h-5 relative top-1" />
            <HandHelpingIcon className="w-6 h-6" />
          </div>
        }
        translationPage="pageProposals"
        badge={`${totalMeta.pagination.total} registered proposals`}
      ></PageTitle>
      <ProposalDirectory
        proposals={data}
        proposalTypes={proposalTypes.data}
        params={{
          page,
          pageSize,
          totalResults: meta.pagination.total,
          sort,
          search,
          filters: filters.map(String),
        }}
      />
    </div>
  );
}
