import ComingSoon from "~/components/layout/ComingSoon";
import { Button } from "~/components/ui/button";
import { Dictionary } from "~/config/dictionaries";

type VotingSectionProps = {
  translations: Dictionary;
};

export const VotingSection = ({ translations }: VotingSectionProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl sm:text-2xl font-bold">
        {translations.general.castYourVote}
      </h2>
      <ComingSoon>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Button
            variant="secondary"
            className="w-full bg-green-500/20 text-green-500 hover:bg-green-500/30"
          >
            {translations.general.yes.toUpperCase()}
          </Button>
          <Button
            variant="secondary"
            className="w-full bg-red-500/20 text-red-500 hover:bg-red-500/30"
          >
            {translations.general.no.toUpperCase()}
          </Button>
          <Button
            variant="secondary"
            className="w-full bg-muted text-muted-foreground hover:bg-muted/80"
          >
            {translations.general.abstain.toUpperCase()}
          </Button>
        </div>
      </ComingSoon>
    </div>
  );
};
