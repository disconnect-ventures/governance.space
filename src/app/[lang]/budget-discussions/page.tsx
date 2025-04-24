import { SpeechIcon } from "lucide-react";
import { Metadata } from "next";
import { PageTitle } from "~/components/layout/PageTitle";
import { getDictionary } from "~/config/dictionaries";
import { PageProps } from "../layout";
import {
  getBudgetDiscussionPollsByIds,
  getBudgetDiscussionTypes,
  listBudgetDiscussions,
  ListBudgetDiscussionsParams,
} from "~/lib/budgetDiscussions";
import { BudgetDiscussionDirectory } from "~/components/features/budget/BudgetDirectory";

export async function generateMetadata({
  params: paramsPromise,
}: PageProps): Promise<Metadata> {
  const params = await paramsPromise;
  const dictionary = await getDictionary(params.lang);

  return {
    title: `${dictionary.pageBudgetDiscussions.title} - ${dictionary.metatags.title}`,
    description: dictionary.metatags.description,
  };
}

export default async function BudgetDiscussionsPage({
  params: paramsPromise,
  searchParams: searchParamsPromise,
}: PageProps) {
  const params = await paramsPromise;
  const locale = params.lang;
  const dictionary = await getDictionary(locale);
  const searchParams = (await searchParamsPromise) ?? {};
  const page = parseInt(searchParams["page"] ?? "0");
  const pageSize = parseInt(searchParams["pageSize"] ?? "20");

  const types = await getBudgetDiscussionTypes();
  const search = searchParams["search"] ?? "";
  const sort =
    (searchParams["sort"] as ListBudgetDiscussionsParams["sortDirection"]) ??
    "desc";
  const filters =
    searchParams["filters"]?.split(",").map((f) => parseInt(f)) ?? [];

  const discussions = await listBudgetDiscussions({
    page: page,
    pageSize,
    search: searchParams["search"] ?? "",
    sortDirection: sort,
    typeIds: filters,
  });

  const polls = await getBudgetDiscussionPollsByIds(
    discussions?.data.map((d) => d.id) ?? [],
    true,
    1,
    pageSize
  );

  return (
    <div className="space-y-4 bg-background text-foreground">
      <PageTitle
        icon={
          <div className="p-2 rounded-full bg-muted text-muted-foreground w-12 h-12 flex flex-col justify-center items-center">
            <SpeechIcon />
          </div>
        }
        badge={`${discussions?.meta.pagination?.total ?? 0}`}
        translations={dictionary.pageBudgetDiscussions}
      ></PageTitle>
      <BudgetDiscussionDirectory
        budgetDiscussions={discussions?.data ?? []}
        budgetDiscussionTypes={types?.data ?? []}
        polls={polls?.data ?? []}
        translations={dictionary}
        params={{
          page,
          pageSize,
          totalResults: discussions?.meta.pagination?.total,
          sort,
          search,
          filters: filters.map(String),
        }}
      />
    </div>
  );
}
