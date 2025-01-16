import { Link } from "lucide-react";

export const ProposalContent = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium mb-2">Abstract</h3>
        <p className="text-muted-foreground">
          We propose to upgrade the Cardano Preview test environment to Protocol
          Version 10. This upgrade will be delivered via a Hard Fork (analogous
          to Conway on Mainnet). Following the upgrade to line up with the INRC1
          Contest Constitution, at least 51% of stake pools to stake should have
          upgraded to a version of the node that supports protocol version 10.
        </p>
      </div>

      <div>
        <h3 className="font-medium mb-2">Motivation</h3>
        <p className="text-muted-foreground">
          Protocol Version 10 enables the remainder of the CIP-1694
          functionality, ensuring that DReps can participate in voting on all
          governance actions. It enables treasury withdrawals, the ability to
          record a new constitution, updates to the constitutional committee,
          get votes of no confidence. These are in addition to the 3 existing
          governance actions that were enabled by Protocol Version 9 by the
          pre-Voltaire protocol version 10.
        </p>
      </div>

      <div>
        <h3 className="font-medium mb-2">Rational</h3>
        <p className="text-muted-foreground mb-4">
          We propose to upgrade the Cardano Preview test environment to Protocol
          Version 10. This upgrade will be achieved via a Hard Fork (analogous
          to Conway on Mainnet). Following the upgrade:
          <br />
          <br />
          The Preview protocol will be upgraded to Major Version 10 and Minor
          Version 0<br />
          All 7 governance actions that are described in CIP-1694 will be
          enabled <br />
          DRep voting will be enabled on all 7 governance actions <br />
          SPO voting will be enabled on all applicable governance actions, as
          defined in CIP-1694 <br />
          Constitutional Committee voting will be enabled on all applicable
          governance action, also as defined in CIP-1694 <br />
          Staking rewards can be accumulated as usual, but can only be withdrawn
          following delegation to a DRep (including the pre-defined
          abstain/no-confidence options) <br />
          Several new Plutus primitives will be available once an update to the
          Plutus v3 cost model has been ratifie
        </p>

        <div>
          <h3 className="font-medium mb-2">Supporting links</h3>
          <div className="space-y-3">
            <a href="#" className="flex items-center gap-2 transition-colors">
              <Link className="w-4 h-4 text-indigo-500" />
              <span className="text-indigo-600">
                Documentação de Governança
              </span>
            </a>
            <a href="#" className="flex items-center gap-2 transition-colors">
              <Link className="w-4 h-4 text-indigo-500" />
              <span className="text-indigo-600">Histórico de Propostas</span>
            </a>
            <a href="#" className="flex items-center gap-2 transition-colors">
              <Link className="w-4 h-4 text-indigo-500" />
              <span className="text-indigo-600">Discussão no Fórum</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
