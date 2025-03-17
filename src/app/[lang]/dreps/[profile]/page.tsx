import { DRepFilterOption, getDRepById, getDReps } from "~/lib/dreps";
import { notFound } from "next/navigation";
import { VotingHistory } from "~/components/features/profile/VotingHistory";
import { ProfileInfo } from "~/components/features/profile/ProfileInfo";
import { ProfileCard } from "~/components/features/profile/ProfileCard";
import { ProfileBody } from "~/components/features/profile/ProfileBody";
import { Comments } from "~/components/features/Comments";
import { getProposals } from "~/lib/proposals";
import { getComments } from "~/lib/comments";
import { User } from "lucide-react";
import { TopBar } from "~/components/layout/TopBar";
import { PageTitle } from "~/components/layout/PageTitle";
import { Metadata } from "next";
import { getDictionary } from "~/config/dictionaries";
import { Locale } from "~/config/i18n";

export async function generateMetadata({ params }: DRepProfileProps): Promise<Metadata> {
  const profileId = (await params).profile;
  return {
    title: `Governance Space - DRep Profile ${profileId}`,
    description: "All-in-One Governance Platform",
  };
}

type DRepProfileProps = {
  params: Promise<{
    profile: string;
    lang: Locale;
  }>;
};

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
      }),
    )
  ).flat();

  return [...firstPage.elements, ...nextPages].map((p) => ({
    profile: p.view,
  }));
}

export default async function DRepProfilePage({ params }: DRepProfileProps) {
  const { profile, lang } = await params;
  const drep = await getDRepById(profile);
  const proposals = (await getProposals(0, 3, "", "desc", [])).data;
  const comments = (await getComments(-1)).slice(0, 3);
  const dictionary = await getDictionary(lang);

  if (!drep) {
    return notFound();
  }

  return (
    <div className="w-full max-w-7xl mx-auto overflow-hidden">
      <PageTitle icon={<User className="h-6 w-6" />} title="DRep Profile" />
      <TopBar backHref="/dreps" />
      <div className="w-full flex flex-col lg:flex-row gap-4 justify-center">
        <div className="lg:w-2/3 flex flex-col gap-4">
          <ProfileCard
            drep={drep}
            general={dictionary.general}
            pageDrepsDetails={dictionary.pageDrepsDetails}
          />
          <ProfileBody drep={drep} pageDrepsDetails={dictionary.pageDrepsDetails} />
          <VotingHistory
            proposals={proposals}
            general={dictionary.general}
            pageDrepsDetails={dictionary.pageDrepsDetails}
          />
          <Comments
            drep={drep}
            comments={comments}
            general={dictionary.general}
            pageDrepsDetails={dictionary.pageDrepsDetails}
          />
        </div>
        <div className="lg:w-1/3">
          <ProfileInfo
            drep={drep}
            comments={comments}
            general={dictionary.general}
            pageDreps={dictionary.pageDreps}
            pageDrepsDetails={dictionary.pageDrepsDetails}
          />
        </div>
      </div>
    </div>
  );
}
