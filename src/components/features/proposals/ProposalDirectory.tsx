// https://www.figma.com/design/bfEklPIeZVRf0P6xC6f1e7/Governance-Space?node-id=34-2282&t=GGJEhGlKd8rVords-4
import React from "react";
import { Proposal } from "~/lib/proposals";
import ProposalCard from "./ProposalCard";
import { Directory, DirectorySearchParams } from "~/components/layout/Directory";

export type ProposalDirectoryProps = {
  proposals: Array<Proposal>;
  params: DirectorySearchParams;
};

export function ProposalDirectory({ proposals, params }: ProposalDirectoryProps) {
  return (
    <Directory
      searchPlaceholder="Search proposals..."
      params={params}
      rows={proposals.map((proposal, index) => (
        <ProposalCard key={index} proposal={proposal} />
      ))}
    ></Directory>
  );
}
