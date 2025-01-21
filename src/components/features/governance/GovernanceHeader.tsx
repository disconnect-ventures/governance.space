import { Badge } from "~/components/ui/badge";
import { Card, CardContent } from "~/components/ui/card";

type VersionDetailProps = {
  label: string;
  value: string;
};

const VersionDetail = ({ label, value }: VersionDetailProps) => (
  <div>
    <p className="text-muted-foreground">{label}</p>
    <p className="font-bold">{value}</p>
  </div>
);

export const GovernanceHeader = () => {
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

      <h2 className="text-2xl font-bold mb-4">
        Hard Fork to Protocol Version 10 (Plomin Hard Fork)
      </h2>

      <div className="flex flex-col sm:flex-row gap-3 justify-between items-start">
        <p className="text-muted-foreground mb-4 w-full sm:max-w-xl">
          We propose to upgrade Cardano mainnet to Protocol Version 10. This
          upgrade will be achieved via a Hard Fork (called Plomin). Following
          the upgrade: The Cardano mainnet protocol will be upgraded to Major
          Version 10 and Minor Version 0; All 7 governance actions that are
          described in CIP-1694 will be enabled; DRep voting will be enabled on
          all 7 governance actions; SPO voting will be enabled on all applicable
          governance actions, as defined in CIP-1694; Constitutional Committee
          voting will be enabled on all applicable governance actions, also as
          defined in CIP-1694; Staking rewards can be accumulated as usual, but
          can only be withdrawn following delegation to a DRep (including the
          pre-defined abstain/no-confidence options); Several new Plutus
          primitives will be available.
        </p>

        <Card>
          <CardContent className="w-auto p-4">
            <h3 className="font-semibold mb-4">Version details</h3>
            <div className="space-y-3">
              <VersionDetail label="Current version:" value="10.10" />
              <VersionDetail label="Proposed version:" value="11.10" />
              <VersionDetail label="Previous Governance Action ID:" value="-" />
            </div>
          </CardContent>
        </Card>
      </div>
    </CardContent>
  );
};
