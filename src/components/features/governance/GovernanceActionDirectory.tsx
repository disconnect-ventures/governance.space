import React from "react";
import { GovernanceAction } from "~/lib/governance-actions";
import { GovernanceActionCard } from "./GovernanceActionCard";
import {
  Directory,
  DirectorySearchParams,
} from "~/components/layout/Directory";
import { GovernanceActionMetadataPayload, Metadata } from "~/lib/metadata";
import { Dictionary } from "~/config/dictionaries";

type GovernanceActionDirectoryProps = {
  metadata: Record<string, Metadata<GovernanceActionMetadataPayload> | null>;
  governanceActions: Array<GovernanceAction>;
  params: DirectorySearchParams;
  translations: Pick<
    Dictionary,
    "general" | "accessibility" | "pageGovernanceActions"
  >;
};

export function GovernanceActionDirectory({
  governanceActions,
  params,
  metadata,
  translations,
}: GovernanceActionDirectoryProps) {
  return (
    <Directory
      searchPlaceholder={translations.pageGovernanceActions.search}
      params={params}
      sortOptions={[
        {
          value: "SoonestToExpire",
          label: translations.pageGovernanceActions.soonestToExpire,
        },
        {
          value: "NewestCreated",
          label: translations.pageGovernanceActions.newestCreated,
        },
        {
          value: "MostYesVotes",
          label: translations.pageGovernanceActions.mostYesVotes,
        },
      ]}
      filterPopoverTitle={
        translations.pageGovernanceActions.governanceActionType
      }
      filterOptions={[
        {
          value: "NoConfidence",
          label: translations.pageGovernanceActions.noConfidence,
        },
        {
          value: "NewCommittee",
          label: translations.pageGovernanceActions.newCommittee,
        },
        {
          value: "NewConstitution",
          label: translations.pageGovernanceActions.newConstitution,
        },
        {
          value: "HardForkInitiation",
          label: translations.pageGovernanceActions.hardForkInitiation,
        },
        {
          value: "ParameterChange",
          label: translations.pageGovernanceActions.parameterChange,
        },
        {
          value: "TreasuryWithdrawals",
          label: translations.pageGovernanceActions.treasuryWithdrawals,
        },
        {
          value: "InfoAction",
          label: translations.pageGovernanceActions.infoAction,
        },
      ]}
      rows={governanceActions.map((action, index) => {
        const isExpired = new Date(action.expiryDate) < new Date();
        return (
          <GovernanceActionCard
            key={index}
            action={action}
            status={isExpired ? "Completed" : "In Progress"}
            metadata={metadata[action.id]}
            translations={translations}
          />
        );
      })}
      translations={translations}
    />
  );
}
