import { UserIcon } from "lucide-react";
import { Metadata } from "next";
import { CommitteeMembersDirectory } from "~/components/features/committees/CommitteeDirectory";
import { PageTitle } from "~/components/layout/PageTitle";
import { getDictionary } from "~/config/dictionaries";
import { getMockCommitteeMembers } from "~/lib/mock";
import { PageProps } from "../layout";
import { Breadcrumbs } from "~/components/layout/Breadcrumbs";

export async function generateMetadata({
  params: paramsPromise,
}: PageProps): Promise<Metadata> {
  const params = await paramsPromise;
  const dictionary = await getDictionary(params.lang);

  return {
    title: `${dictionary.pageCommittees.title} - ${dictionary.metatags.title}`,
    description: dictionary.metatags.description,
  };
}

export default async function CommitteesPage({
  params: paramsPromise,
}: PageProps) {
  const params = await paramsPromise;
  const locale = params.lang;
  const dictionary = await getDictionary(locale);
  const committees = getMockCommitteeMembers();
  return (
    <>
      <Breadcrumbs translations={dictionary.breadcrumbs} />
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
          translations={dictionary}
        />
      </div>
    </>
  );
}
