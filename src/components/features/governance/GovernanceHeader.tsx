import { useMemo } from "react";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent } from "~/components/ui/card";
import { GovernanceAction } from "~/lib/governance-actions";
import { Metadata } from "~/lib/metadata";
import CopyToClipboard from "../CopyToClipboard";

type VersionDetailProps = {
  label: string;
  value: string;
};

const VersionDetail = ({ label, value }: VersionDetailProps) => (
  <div className="w-64 flex gap-2 items-center">
    <p className="text-muted-foreground pr-2">{label}</p>
    <p className="font-bold overflow-hidden text-ellipsis">{value}</p>
    <CopyToClipboard value={value} />
  </div>
);

export const GovernanceHeader = ({
  action,
  metadata,
}: {
  action: GovernanceAction;
  metadata: Metadata | null;
}) => {
  const title = useMemo(
    () => (action.title || metadata ? metadata?.metadata.title : "No title"),
    [action, metadata]
  );
  const abstract = useMemo(
    () => action.abstract || metadata?.metadata.abstract,
    [action, metadata]
  );

  return (
    <CardContent className="p-6">
      <div className="flex items-center gap-4 mb-4 text-center w-full">
        <Badge variant="secondary" className="text-sm bg-[#C5D0EC] color-black">
          Hard Fork
        </Badge>
        <span className="text-sm text-muted-foreground">
          Governance Action Type
        </span>
        <Badge className="text-sm ml-auto bg-green-100 text-green-800">
          In progress
        </Badge>
      </div>

      <h2 className="text-2xl font-bold mb-4">{title}</h2>

      <div className="flex flex-col sm:flex-row gap-3 justify-between items-start">
        <p className="text-muted-foreground mb-4 w-full sm:max-w-xl">
          {abstract}
        </p>

        <Card>
          <CardContent className="w-auto p-4">
            <h3 className="font-semibold mb-4">Version details</h3>
            <div className="space-y-3">
              <VersionDetail label="Current Hash:" value={action.txHash} />
              {/* <VersionDetail label="Proposed version:" value="11.10" /> */}
              {action.prevGovActionTxHash !== null && (
                <VersionDetail
                  label="Previous Hash:"
                  value={action.prevGovActionTxHash}
                />
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </CardContent>
  );
};
