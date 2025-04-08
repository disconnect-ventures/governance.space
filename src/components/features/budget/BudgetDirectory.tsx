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
      searchPlaceholder="Search proposals..."
      params={params}
      sortPopoverTitle="Sort by Creation Date"
      sortOptions={[
        { label: "Descending", value: "desc" },
        { label: "Ascending", value: "Asc" },
      ]}
      filterPopoverTitle="Filter by Action Type"
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
