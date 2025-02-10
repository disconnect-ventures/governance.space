// https://www.figma.com/design/bfEklPIeZVRf0P6xC6f1e7/Governance-Space?node-id=34-1870&t=GGJEhGlKd8rVords-4
import React from "react";
import { GovernanceAction } from "~/lib/governance-actions";
import { GovernanceActionCard } from "./GovernanceActionCard";
import { getMockGovernanceActionMetadata } from "~/lib/mock";
import {
  Directory,
  DirectorySearchParams,
} from "~/components/layout/Directory";

type GovernanceActionDirectoryProps = {
  governanceActions: Array<GovernanceAction>;
  params: DirectorySearchParams;
};

export function GovernanceActionDirectory({
  governanceActions,
  params,
}: GovernanceActionDirectoryProps) {
  return (
    <Directory
      searchPlaceholder="Search"
      params={params}
      sortOptions={[
        { value: "SoonestToExpire", label: "Soon to Expire" },
        {
          value: "NewestCreated",
          label: "Newest First",
        },
        {
          value: "MostYesVotes",
          label: 'Highest Amount of "Yes" votes',
        },
      ]}
      filterPopoverTitle="Governance Action Type"
      filterOptions={[
        { value: "NoConfidence", label: "No Confidence" },
        { value: "NewCommittee", label: "New Committee" },
        { value: "NewConstitution", label: "New Constitution" },
        { value: "HardForkInitiation", label: "Hard Fork Initiation" },
        { value: "ParameterChange", label: "Parameter Change" },
        { value: "TreasuryWithdrawals", label: "Treasury Withdrawals" },
        { value: "InfoAction", label: "Info Action" },
      ]}
      rows={governanceActions.map((action, index) => {
        const metadata = getMockGovernanceActionMetadata(); // TODO
        const status = "In Progress"; // TODO
        return (
          <GovernanceActionCard
            key={index}
            action={action}
            status={status}
            metadata={metadata.metadata}
          />
        );
      })}
    />
  );
}
