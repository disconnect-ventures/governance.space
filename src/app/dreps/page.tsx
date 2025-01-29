import { UsersIcon } from "lucide-react";
import { Metadata } from "next";
import {
  DRepsDirectory,
  DRepsDirectoryProps,
} from "~/components/features/dreps/DRepsDirectory";
import { PageTitle } from "~/components/layout/PageTitle";
import { getDReps } from "~/lib/dreps";

export const metadata: Metadata = {
  title: "Governance Space - DReps Directory",
  description: "All-in-One Governance Platform",
};

export default async function DRepsDirectoryPage() {
  const dreps = await getDReps();
  return (
    <div className="space-y-4">
      <PageTitle
        title={"DReps Directory"}
        icon={<UsersIcon />}
        badge="259 registered DReps"
        info="Delegated Representatives (DReps) are ADA holders who registered on-chain to allow other members of the community to delegate their voting power to them, so that they can vote on their behalf. They are are like 'parlimentary representatives' in the Governance system."
      ></PageTitle>
      <DRepsDirectory dreps={dreps as DRepsDirectoryProps["dreps"]} />
    </div>
  );
}
