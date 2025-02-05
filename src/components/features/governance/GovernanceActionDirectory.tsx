// https://www.figma.com/design/bfEklPIeZVRf0P6xC6f1e7/Governance-Space?node-id=34-1870&t=GGJEhGlKd8rVords-4
import React from "react";
import { GovernanceAction } from "~/lib/governance-actions";
import { GovernanceActionCard } from "./GovernanceActionCard";
import { getMockGovernanceActionMetadata } from "~/lib/mock";
import { Directory } from "~/components/layout/Directory";

type GovernanceActionDirectoryProps = {
  governanceActions: Array<GovernanceAction>;
};

export function GovernanceActionDirectory({
  governanceActions,
}: GovernanceActionDirectoryProps) {
  return (
    <Directory
      searchPlaceholder="Search"
      page={0}
      pageSize={15}
      totalResults={0}
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
