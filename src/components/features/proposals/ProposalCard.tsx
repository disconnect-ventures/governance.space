import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { Eye, MessageSquare, Calendar } from "lucide-react";
import { buttonVariants } from "~/components/ui/button";
import { Proposal } from "~/lib/proposals";
import clsx from "clsx";
import Link from "next/link";

export type ProposalCardProps = {
  proposal: Proposal;
};

const ProposalCard = ({ proposal }: ProposalCardProps) => {
  const username = proposal.attributes.user_govtool_username;
  const proposalId = proposal.attributes.content.attributes.proposal_id;
  const isProposalActive =
    proposal.attributes.content.attributes.prop_rev_active;
  const actionType =
    proposal.attributes.content.attributes.gov_action_type.attributes
      .gov_action_type_name;

  const getProposalBadgeColor = () => {
    return actionType === "Info" ? "purple" : "gray";
  };

  const getStatusBadgeColor = () => {
    return isProposalActive ? "green" : "red";
  };

  const badgeColor = getProposalBadgeColor();
  const statusBadgeColor = getStatusBadgeColor();

  return (
    <Card className="w-full flex flex-col mx-auto">
      <CardHeader className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">
              # ID: {proposalId}
            </div>
            <h2 className="text-2xl font-semibold">
              {proposal.attributes.content.attributes.prop_name}
            </h2>
          </div>
          <Badge
            variant="secondary"
            className={clsx(
              "p-2 rounded-full",
              `bg-${statusBadgeColor}-100 text-${statusBadgeColor}-800`
            )}
          >
            {isProposalActive ? "ACTIVE" : "INACTIVE"}
          </Badge>
        </div>

        <div className="flex gap-4 items-center">
          <Avatar className="h-10 w-10">
            {/* <AvatarImage src="/placeholder-avatar.jpg" /> */} { /** TODO: Fetch user and display proper avatar here */}
            <AvatarFallback>{username.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col ">
            <div className="flex gap-x-4 items-center flex-wrap">
              <div className="font-medium">{username}</div>
              <div className="text-sm text-muted-foreground">Author</div>
            </div>
            <div className="text-sm text-muted-foreground overflow-hidden text-ellipsis">
              <span className="mr-1 text-lg font-semibold text-gray-900">
                #
              </span>{" "}
              CIP-129 Action ID: gov_action1pvv5wmjqhwa4u85vu9f4
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="h-full flex flex-col gap-4 justify-between">
        <div className="max-h-48 overflow-y-auto">
          <p className="text-gray-700 bg-gray-100 p-4 rounded">
            {proposal.attributes.content.attributes.prop_abstract}
          </p>
        </div>
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <Badge
            variant="outline"
            className={clsx(
              "text-lg px-6 rounded-full",
              `bg-${badgeColor}-100 text-${badgeColor}-800`
            )}
          >
            {
              proposal.attributes.content.attributes.gov_action_type.attributes
                .gov_action_type_name
            }
          </Badge>
          <div className="text-muted-foreground">Governance Action Type</div>
        </div>

        <div className="grid grid-cols-2 justify-between sm:space-y-0 text-sm gap-4">
          <div className="flex items-center space-x-2">
            <Eye className="h-4 w-4" />
            <span>{proposal.attributes.prop_likes} views</span>
          </div>
          <div className="flex items-center space-x-2">
            <MessageSquare className="h-4 w-4" />
            <span>{proposal.attributes.prop_comments_number} comments</span>
          </div>

          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4" />
            <span>Submitted: 31st Oct 2024 (Epoch 504)</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4" />
            <span>Expires: 30th Dec 2024 (Epoch 565)</span>
          </div>
        </div>

        <Link
          href={`/proposals/${proposal.id}`}
          className={buttonVariants({ variant: "default" })}
        >
          View Details and Vote
        </Link>
      </CardContent>
    </Card>
  );
};

export default ProposalCard;
