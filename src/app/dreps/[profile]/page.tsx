// https://www.figma.com/design/bfEklPIeZVRf0P6xC6f1e7/Governance-Space?node-id=34-1458&t=GGJEhGlKd8rVords-4

import { getDRepById } from "~/lib/dreps";
import { notFound } from "next/navigation";
import { VotingHistory } from "~/components/features/profile/VotingHistory";
import { ProfileInfo } from "~/components/features/profile/ProfileInfo";
import { ProfileCard } from "~/components/features/profile/ProfileCard";
import { ProfileBody } from "~/components/features/profile/ProfileBody";
import { Comments } from "~/components/features/Comments";
import { getProposals } from "~/lib/proposals";
import { getComments } from "~/lib/comments";
import { Users } from "lucide-react";

type DRepProfileProps = {
  params: Promise<{
    profile: string;
  }>;
};

export default async function DRepProfilePage({ params }: DRepProfileProps) {
  const { profile } = await params;
  const drep = await getDRepById(profile);
  const proposals = (await getProposals()).slice(0, 3);
  const comments = (await getComments(-1)).slice(0, 3);

  if (!drep) {
    return notFound();
  }

  return (
    <div className="w-full max-w-7xl mx-auto overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="p-2 rounded-full bg-gray-300">
            <Users className="h-6 w-6" />
          </div>
          <h1 className="text-4xl font-bold">DRep Profile</h1>
        </div>
      </div>
      <div className="w-full flex flex-col lg:flex-row gap-4 px-4 justify-center">
        <div className="lg:w-2/3 flex flex-col gap-4">
          <ProfileCard drep={drep} />
          <ProfileBody drep={drep} />
          <VotingHistory proposals={proposals} />
          <Comments drep={drep} comments={comments} />
        </div>
        <div className="lg:w-1/3">
          <ProfileInfo drep={drep} comments={comments} />
        </div>
      </div>
    </div>
  );
}
