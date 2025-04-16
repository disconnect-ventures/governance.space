// https://www.figma.com/design/bfEklPIeZVRf0P6xC6f1e7/Governance-Space?node-id=34-2282&t=GGJEhGlKd8rVords-4
import React from "react";
import { Proposal, ProposalType } from "~/lib/proposals";
import ProposalCard from "./ProposalCard";
import {
  Directory,
  DirectorySearchParams,
} from "~/components/layout/Directory";
import { Dictionary } from "~/config/dictionaries";
import { toCamelCase } from "~/lib/utils";

type ProposalDirectoryProps = {
  proposals: Array<Proposal>;
  params: DirectorySearchParams;
  proposalTypes: Array<ProposalType>;
  translations: Dictionary;
};

export async function ProposalDirectory({
  proposals,
  params,
  proposalTypes,
  translations,
}: ProposalDirectoryProps) {
  return (
    <Directory
      searchPlaceholder={translations.pageProposals.search}
      params={params}
      sortPopoverTitle={translations.pageProposals.sort}
      sortOptions={[
        { label: translations.general.descending, value: "desc" },
        { label: translations.general.ascending, value: "Asc" },
      ]}
      filterPopoverTitle={translations.pageProposals.filter}
      filterOptions={[
        ...proposalTypes.map((p) => ({
          label:
            translations.pageProposals[
              toCamelCase(
                p.attributes.gov_action_type_name
              ) as keyof typeof translations.pageProposals
            ],
          value: p.id.toString(),
        })),
      ]}
      rows={proposals.map((proposal, index) => (
        <ProposalCard
          key={index}
          proposal={proposal}
          translations={translations.general}
        />
      ))}
      translations={translations}
    ></Directory>
  );
}
