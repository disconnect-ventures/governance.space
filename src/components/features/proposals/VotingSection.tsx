import { Button } from "~/components/ui/button";

export const VotingSection = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl sm:text-2xl font-bold">Cast Your Vote</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Button className="w-full bg-[#DCFCE7] text-black hover:bg-[#DCFCE7]/90">
          YES
        </Button>
        <Button className="w-full bg-[#FEE2E2] text-black hover:bg-[#FEE2E2]/90">
          NO
        </Button>
        <Button className="w-full bg-[#F3F4F6] text-black hover:bg-[#F3F4F6]/90">
          ABSTAIN
        </Button>
      </div>
    </div>
  );
}