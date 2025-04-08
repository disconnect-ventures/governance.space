import React from "react";
import { GovernanceAction } from "~/lib/governance-actions";
import { GovernanceActionCard } from "./GovernanceActionCard";
import {
  Directory,
  DirectorySearchParams,
} from "~/components/layout/Directory";
import { Metadata } from "~/lib/metadata";
import { Dictionary } from "~/config/dictionaries";

type GovernanceActionDirectoryProps = {
  metadata: Record<string, Metadata | null>;
  governanceActions: Array<GovernanceAction>;
  params: DirectorySearchParams;
  translations: Dictionary["general"];
};

export function GovernanceActionDirectory({
  governanceActions,
  params,
  metadata,
  translations,
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
        const isExpired = new Date(action.expiryDate) < new Date();
        return (
          <GovernanceActionCard
            key={index}
            action={action}
            status={isExpired ? "Completed" : "In Progress"}
            metadata={metadata[action.id]}
          />
        );
      })}
      translations={translations}
    />
  );
}
