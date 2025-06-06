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
  BudgetDiscussionPoll,
  BudgetDiscussionType,
} from "~/lib/budgetDiscussions";
import { toCamelCase } from "~/lib/utils";

export type BudgetDiscussionDirectoryProps = {
  budgetDiscussions: Array<BudgetDiscussion>;
  params: DirectorySearchParams;
  budgetDiscussionTypes: Array<BudgetDiscussionType>;
  polls: Array<BudgetDiscussionPoll>;
  translations: Dictionary;
};

export async function BudgetDiscussionDirectory({
  budgetDiscussions,
  params,
  budgetDiscussionTypes,
  translations,
  polls,
}: BudgetDiscussionDirectoryProps) {
  return (
    <Directory
      translations={translations}
      searchPlaceholder={translations.pageBudgetDiscussions.search}
      params={params}
      sortPopoverTitle={translations.pageBudgetDiscussions.sort}
      sortOptions={[
        {
          label: translations.general.descending,
          value: "desc",
        },
        {
          label: translations.general.ascending,
          value: "asc",
        },
      ]}
      filterPopoverTitle={translations.pageBudgetDiscussions.filter}
      filterOptions={[
        ...budgetDiscussionTypes.map((p) => ({
          label:
            translations.pageBudgetDiscussions[
              toCamelCase(
                p.attributes.type_name
              ) as keyof typeof translations.pageBudgetDiscussions
            ],
          value: p.id.toString(),
        })),
      ]}
      rows={budgetDiscussions.map((proposal, index) => (
        <BudgetDiscussionCard
          key={index}
          discussion={proposal}
          poll={polls.find(
            (p) =>
              proposal.attributes.master_id === p.attributes.bd_proposal_id ||
              proposal.id.toString() === p.attributes.bd_proposal_id.toString()
          )}
          translations={translations}
        />
      ))}
    ></Directory>
  );
}
