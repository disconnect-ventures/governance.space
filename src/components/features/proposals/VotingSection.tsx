import ComingSoon from "~/components/layout/ComingSoon";
import { Button } from "~/components/ui/button";

export const VotingSection = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl sm:text-2xl font-bold">Cast Your Vote</h2>
      <ComingSoon>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Button
            variant="secondary"
            className="w-full bg-green-500/20 text-green-500 hover:bg-green-500/30"
          >
            YES
          </Button>
          <Button
            variant="secondary"
            className="w-full bg-red-500/20 text-red-500 hover:bg-red-500/30"
          >
            NO
          </Button>
          <Button
            variant="secondary"
            className="w-full bg-muted text-muted-foreground hover:bg-muted/80"
          >
            ABSTAIN
          </Button>
        </div>
      </ComingSoon>
    </div>
  );
};
