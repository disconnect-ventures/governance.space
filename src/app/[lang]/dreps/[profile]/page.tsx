import { DRepFilterOption, getDRepById, getDReps } from "~/lib/dreps";
import { notFound } from "next/navigation";
import { VotingHistory } from "~/components/features/profile/VotingHistory";
import { ProfileInfo } from "~/components/features/profile/ProfileInfo";
import { ProfileCard } from "~/components/features/profile/ProfileCard";
import { ProfileBody } from "~/components/features/profile/ProfileBody";
import { getProposals } from "~/lib/proposals";
import { User } from "lucide-react";
import { TopBar } from "~/components/layout/TopBar";
import { PageTitle } from "~/components/layout/PageTitle";
import { Metadata } from "next";
import { getDictionary } from "~/config/dictionaries";
import { PageProps } from "../../layout";

export async function generateMetadata({
  params: paramsPromise,
}: DRepProfileProps): Promise<Metadata> {
  const params = await paramsPromise;
  const dictionary = await getDictionary(params.lang);
  const drepById = await getDRepById(params.profile);
  const profileName = drepById?.givenName;
  const profileId = params.profile;
  const title = profileName ?? profileId;

  return {
    title: `${title} - ${dictionary.metatags.title}`,
    description: dictionary.metatags.description,
  };
}

export async function generateStaticParams() {
  let page = 0;
  const pageSize = 50;
  const search = "";
  const sort = "RegistrationDate";
  const filters: DRepFilterOption[] = [];

  const firstPage = await getDReps(page++, pageSize, search, sort, filters);
  const totalPages = Math.ceil(firstPage.total / pageSize);

  const nextPages = (
    await Promise.all(
      Array.from({ length: totalPages - 1 }).map(async () => {
        try {
          const data = await getDReps(page++, pageSize, search, sort, filters);
          return data.elements;
        } catch {
          return [];
        }
      })
    )
  ).flat();

  return [...firstPage.elements, ...nextPages].map((p) => ({
    profile: p.view,
  }));
}

type DRepProfileProps = PageProps<{ profile: string }>;

export default async function DRepProfilePage({
  params: paramsPromise,
}: DRepProfileProps) {
  const params = await paramsPromise;
  const locale = params.lang;
  const dictionary = await getDictionary(locale);
  const { profile } = params;

  const drep = await getDRepById(profile);
  const proposals = (await getProposals(0, 3, "", "desc", [])).data;

  if (!drep) {
    return notFound();
  }

  return (
    <div className="w-full max-w-7xl mx-auto overflow-hidden">
      <PageTitle
        icon={<User className="h-6 w-6" />}
        translations={dictionary.pageDrepsDetails}
      />
      <TopBar backHref="/dreps" translations={dictionary.general} />
      <div className="w-full flex flex-col lg:flex-row gap-4 justify-center">
        <div className="lg:w-2/3 flex flex-col gap-4">
          <ProfileCard drep={drep} translations={dictionary} />
          <ProfileBody drep={drep} translations={dictionary} />
          <VotingHistory proposals={proposals} translations={dictionary} />
          {/* <Comments drep={drep} comments={comments} translations={dictionary} /> */}
        </div>
        <div className="lg:w-1/3">
          <ProfileInfo drep={drep} translations={dictionary} />
        </div>
      </div>
    </div>
  );
}
