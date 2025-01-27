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
import { User } from "lucide-react";
import { TopBar } from "~/components/layout/TopBar";
import { PageTitle } from "~/components/layout/PageTitle";

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
      <PageTitle
        icon={<User className="h-6 w-6" />}
        title="DRep Profile"
        info="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In dolor odio, laoreet ac eros eu, euismod sollicitudin nulla. Nam sed sem massa. Nunc sit amet porta neque. Vivamus nibh magna, tristique at justo eget, hendrerit convallis risus. Vivamus eleifend felis quis tristique porttitor. Maecenas ornare molestie lobortis. Quisque at ultricies augue."
      />
      <TopBar backHref="/dreps" />
      <div className="w-full flex flex-col lg:flex-row gap-4 justify-center">
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
