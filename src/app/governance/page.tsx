import { BookOpenCheckIcon } from "lucide-react";
import { Metadata } from "next";
import { GovernanceActionDirectory } from "~/components/features/governance/GovernanceActionDirectory";
import { PageTitle } from "~/components/layout/PageTitle";
import { getGovernanceActions } from "~/lib/governance-actions";

export const metadata: Metadata = {
  title: "Governance Space - Governance Actions",
  description: "All-in-One Governance Platform",
};

export default async function GovernancePage() {
  let governanceActions = await getGovernanceActions();
  governanceActions = new Array(18).fill(governanceActions[0]);

  return (
    <div className="space-y-4">
      <PageTitle
        title="Governance Actions"
        icon={
          <div className="p-2 rounded-full bg-gray-300 w-12 h-12 flex flex-col justify-center items-center">
            <BookOpenCheckIcon />
          </div>
        }
        info="Anyone that has ADA in a wallet can propose a Governace Action. To submit a Governance Action, the submitter pays a refundable deposit of 100,000 Ada. The deposit will be returned automatically back to the submitter's wallet upon completion of the Voting period."
      ></PageTitle>
      <GovernanceActionDirectory governanceActions={governanceActions} />
    </div>
  );
}
