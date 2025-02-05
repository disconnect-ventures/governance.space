import { UserIcon } from "lucide-react";
import { Metadata } from "next";
import { Suspense } from "react";
import { CommitteeMembersDirectory } from "~/components/features/committees/CommitteeDirectory";
import { PageTitle } from "~/components/layout/PageTitle";
import { getMockCommitteeMembers } from "~/lib/mock";

export const metadata: Metadata = {
  title: "Governance Space - Committees Members",
  description: "All-in-One Governance Platform",
};

export default async function CommitteesPage() {
  const committees = getMockCommitteeMembers();
  return (
    <div className="space-y-4">
      <PageTitle
        title="Committees Members"
        icon={
          <div className="p-2 rounded-full bg-gray-300 w-12 h-12 flex flex-col justify-center items-center">
            <UserIcon />
          </div>
        }
        info="Meet the Cardano community members who are participating in all existing committees."
      ></PageTitle>
      <Suspense fallback={null}>
        <CommitteeMembersDirectory
          committeeMembers={[...committees, ...committees, ...committees]}
        />
      </Suspense>
    </div>
  );
}
