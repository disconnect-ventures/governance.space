// https://www.figma.com/design/bfEklPIeZVRf0P6xC6f1e7/Governance-Space?node-id=34-2282&t=GGJEhGlKd8rVords-4
import React from "react";
import { Proposal, ProposalType } from "~/lib/proposals";
import ProposalCard from "./ProposalCard";
import {
  Directory,
  DirectorySearchParams,
} from "~/components/layout/Directory";

export type ProposalDirectoryProps = {
  proposals: Array<Proposal>;
  params: DirectorySearchParams;
  proposalTypes: Array<ProposalType>;
};

export function ProposalDirectory({
  proposals,
  params,
  proposalTypes,
}: ProposalDirectoryProps) {
  return (
    <Directory
      searchPlaceholder="Search proposals..."
      params={params}
      sortOptions={[
        { label: "Descending", value: "desc" },
        { label: "Ascending", value: "Asc" },
      ]}
      filterOptions={[
        ...proposalTypes.map((p) => ({
          label: p.attributes.gov_action_type_name,
          value: p.id.toString(),
        })),
      ]}
      rows={proposals.map((proposal, index) => (
        <ProposalCard key={index} proposal={proposal} />
      ))}
    ></Directory>
  );
}
