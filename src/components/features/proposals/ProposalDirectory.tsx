// https://www.figma.com/design/bfEklPIeZVRf0P6xC6f1e7/Governance-Space?node-id=34-2282&t=GGJEhGlKd8rVords-4
import React from "react";
import { Proposal, ProposalType } from "~/lib/proposals";
import ProposalCard from "./ProposalCard";
import {
  Directory,
  DirectorySearchParams,
} from "~/components/layout/Directory";
import { Dictionary } from "~/config/dictionaries";

export type ProposalDirectoryProps = {
  proposals: Array<Proposal>;
  params: DirectorySearchParams;
  proposalTypes: Array<ProposalType>;
  translations: Dictionary["general"];
};

export async function ProposalDirectory({
  proposals,
  params,
  proposalTypes,
  translations,
}: ProposalDirectoryProps) {
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
        ...proposalTypes.map((p) => ({
          label: p.attributes.gov_action_type_name,
          value: p.id.toString(),
        })),
      ]}
      rows={proposals.map((proposal, index) => (
        <ProposalCard
          key={index}
          proposal={proposal}
          translations={translations}
        />
      ))}
      translations={translations}
    ></Directory>
  );
}
