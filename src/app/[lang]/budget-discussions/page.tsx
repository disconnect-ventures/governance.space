import { SpeechIcon } from "lucide-react";
import { Metadata } from "next";
import { PageTitle } from "~/components/layout/PageTitle";
import { getDictionary } from "~/config/dictionaries";
import { PageProps } from "../layout";
import {
  getBudgetDiscussionTypes,
  listBudgetDiscussions,
} from "~/lib/budgetDiscussions";
import { BudgetDiscussionDirectory } from "~/components/features/budget/BudgetDirectory";

export const metadata: Metadata = {
  title: "Governance Space - Budget Discussions",
  description: "All-in-One Governance Platform",
};

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
  const discussions = await listBudgetDiscussions({
    page,
    pageSize,
    search: searchParams["search"] ?? "",
  });
  const types = await getBudgetDiscussionTypes();

  return (
    <div className="space-y-4 bg-background text-foreground">
      <PageTitle
        icon={
          <div className="p-2 rounded-full bg-muted text-muted-foreground w-12 h-12 flex flex-col justify-center items-center">
            <SpeechIcon />
          </div>
        }
        translations={dictionary.pageBudgetDiscussions}
      ></PageTitle>
      <BudgetDiscussionDirectory
        budgetDiscussions={discussions?.data ?? []}
        budgetDiscussionTypes={types?.data ?? []}
        dictionary={dictionary}
        params={{
          page,
          pageSize,
          totalResults: discussions?.meta.pagination?.total,
          // sort,
          // search,
          // filters: filters.map(String),
        }}
      />
    </div>
  );
}
