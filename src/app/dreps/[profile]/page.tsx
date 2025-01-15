// https://www.figma.com/design/bfEklPIeZVRf0P6xC6f1e7/Governance-Space?node-id=34-1458&t=GGJEhGlKd8rVords-4

import { getDRepById } from "~/lib/dreps";
import { notFound } from "next/navigation";
import { VotingHistory } from "~/components/features/profile/VotingHistory";
import { ProfileInfo } from "~/components/features/profile/ProfileInfo";
import { ProfileCard } from "~/components/features/profile/ProfileCard";
import { ProfileBody } from "~/components/features/profile/ProfileBody";
import { Comments } from "~/components/features/Comments";

type DRepProfileProps = {
  params: Promise<{
    profile: string;
  }>;
};

export default async function DRepProfilePage({ params }: DRepProfileProps) {
  const { profile } = await params;
  const drep = await getDRepById(profile);

  if (!drep) {
    return notFound();
  }

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="w-full flex flex-col lg:flex-row gap-4 justify-center">
        <div className="lg:w-2/3 flex flex-col gap-4">
          <ProfileCard drep={drep} />
          <ProfileBody drep={drep} />
          <VotingHistory />
          <Comments drep={drep} />
        </div>
        <div className="lg:min-w-1/3 flex-shrink-0">
          <ProfileInfo drep={drep} />
        </div>
      </div>
    </div>
  );
}
