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
import { getDictionary } from "~/config/dictionaries";

export const metadata: Metadata = {
  title: "Governance Space - Proposals",
  description: "All-in-One Governance Platform",
};

export default async function ProposalsPage({
  params: paramsPromise,
  searchParams: searchParamsPromise,
}: PageProps) {
  const params = await paramsPromise;
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
    filters
  );
  const { meta: totalMeta } = await getProposals(0, 1, "", "asc", []);
  const dictionary = await getDictionary(params.lang);

  return (
    <div className="space-y-4 bg-background text-foreground">
      <PageTitle
        icon={
          <div className="p-2 rounded-full bg-muted text-muted-foreground w-12 h-12 flex flex-col justify-center items-center">
            <FileTextIcon className="w-5 h-5 relative top-1" />
            <HandHelpingIcon className="w-6 h-6" />
          </div>
        }
        translations={dictionary.pageProposals}
        badge={`${totalMeta.pagination?.total}`}
      ></PageTitle>
      <ProposalDirectory
        proposals={data}
        proposalTypes={proposalTypes.data}
        params={{
          page,
          pageSize,
          totalResults: meta.pagination?.total,
          sort,
          search,
          filters: filters.map(String),
        }}
        dictionary={dictionary}
      />
    </div>
  );
}
