import { UserIcon } from "lucide-react";
import { Metadata } from "next";
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
    <div className="space-y-4 bg-background text-foreground dark:bg-background dark:text-foreground">
      <PageTitle
        title="Committees Members"
        icon={
          <div className="p-2 rounded-full bg-muted dark:bg-muted/50 w-12 h-12 flex flex-col justify-center items-center">
            <UserIcon className="text-foreground" />
          </div>
        }
        translationPage="pageCommittees"
      />
      <CommitteeMembersDirectory
        committeeMembers={[...committees, ...committees, ...committees]}
        params={{}}
      />
    </div>
  );
}
