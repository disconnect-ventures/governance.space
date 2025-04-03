import { UserIcon } from "lucide-react";
import { Metadata } from "next";
import { CommitteeMembersDirectory } from "~/components/features/committees/CommitteeDirectory";
import { PageTitle } from "~/components/layout/PageTitle";
import { getDictionary } from "~/config/dictionaries";
import { getMockCommitteeMembers } from "~/lib/mock";
import { PageProps } from "../layout";

export const metadata: Metadata = {
  title: "Governance Space - Committee Members",
  description: "All-in-One Governance Platform",
};

export default async function CommitteesPage({
  params: paramsPromise,
}: PageProps) {
  const params = await paramsPromise;
  const locale = params.lang;
  const dictionary = await getDictionary(locale);
  const committees = getMockCommitteeMembers();
  return (
    <div className="space-y-4 bg-background text-foreground dark:bg-background dark:text-foreground">
      <PageTitle
        icon={
          <div className="p-2 rounded-full bg-muted dark:bg-muted/50 w-12 h-12 flex flex-col justify-center items-center">
            <UserIcon className="text-foreground" />
          </div>
        }
        translations={dictionary.pageCommittees}
      />
      <CommitteeMembersDirectory
        committeeMembers={[...committees, ...committees, ...committees]}
        params={{}}
        translations={{
          general: dictionary.general,
          pageCommittees: dictionary.pageCommittees,
        }}
      />
    </div>
  );
}
