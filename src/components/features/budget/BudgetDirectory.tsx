// https://www.figma.com/design/bfEklPIeZVRf0P6xC6f1e7/Governance-Space?node-id=34-2282&t=GGJEhGlKd8rVords-4
import React from "react";
import {
  Directory,
  DirectorySearchParams,
} from "~/components/layout/Directory";
import { Dictionary } from "~/config/dictionaries";
import BudgetDiscussionCard from "./BudgetCard";
import {
  BudgetDiscussion,
  BudgetDiscussionType,
} from "~/lib/budgetDiscussions";

export type BudgetDiscussionDirectoryProps = {
  budgetDiscussions: Array<BudgetDiscussion>;
  params: DirectorySearchParams;
  budgetDiscussionTypes: Array<BudgetDiscussionType>;
  dictionary: Dictionary;
};

export async function BudgetDiscussionDirectory({
  budgetDiscussions,
  params,
  budgetDiscussionTypes,
  dictionary,
}: BudgetDiscussionDirectoryProps) {
  return (
    <Directory
      translations={dictionary}
      searchPlaceholder={dictionary.pageBudgetDiscussions.search}
      params={params}
      sortPopoverTitle={dictionary.pageBudgetDiscussions.sortByLabel}
      sortOptions={[
        {
          label: dictionary.pageBudgetDiscussions.sortByLabelAsc,
          value: "desc",
        },
        {
          label: dictionary.pageBudgetDiscussions.sortByLabelDesc,
          value: "asc",
        },
      ]}
      filterPopoverTitle={dictionary.pageBudgetDiscussions.filterByLabel}
      filterOptions={[
        ...budgetDiscussionTypes.map((p) => ({
          label: p.attributes.type_name,
          value: p.id.toString(),
        })),
      ]}
      rows={budgetDiscussions.map((proposal, index) => (
        <BudgetDiscussionCard
          key={index}
          discussion={proposal}
          dictionary={dictionary}
        />
      ))}
    ></Directory>
  );
}
