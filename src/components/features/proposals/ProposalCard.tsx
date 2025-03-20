import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import {
  MessageSquare,
  Calendar,
  ThumbsUpIcon,
  ThumbsDownIcon,
} from "lucide-react";
import { buttonVariants } from "~/components/ui/button";
import { Proposal } from "~/lib/proposals";
import clsx from "clsx";
import Link from "~/components/features/Link";
import { calculateEpochNumber, formatDate } from "~/lib/utils";
import { Dictionary } from "~/config/dictionaries";
import Latex from "react-latex-next";
import markdownToHtml from "~/lib/markdown";
import { use } from "react";

export type ProposalCardProps = {
  proposal: Proposal;
  dictionary: Dictionary;
};

const ProposalCard = ({ proposal, dictionary }: ProposalCardProps) => {
  const abstract = use(
    markdownToHtml(proposal.attributes.content.attributes.prop_abstract)
  );

  const username = proposal.attributes.user_govtool_username;
  const proposalId = proposal.attributes.content.attributes.proposal_id;
  const isProposalActive =
    proposal.attributes.content.attributes.prop_rev_active;
  const actionType =
    proposal.attributes.content.attributes.gov_action_type.attributes
      .gov_action_type_name;

  const getStatusBadgeClasses = () => {
    return isProposalActive
      ? "bg-green-500/20 text-green-500"
      : "bg-red-500/20 text-red-500";
  };

  const getActionTypeBadgeClasses = () => {
    return actionType === "Info"
      ? "bg-primary/20 text-primary"
      : "bg-muted text-muted-foreground";
  };

  const createdDate = proposal.attributes.createdAt;
  const createdEpoch = calculateEpochNumber(createdDate);
  const updatedAt = proposal.attributes.updatedAt;
  const updatedEpoch = calculateEpochNumber(updatedAt);

  return (
    <Card className="w-full flex flex-col mx-auto border-border bg-card">
      <CardHeader className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">
              # ID: {proposalId}
            </div>
            <h2 className="text-2xl text-foreground font-semibold leading-[1.5rem] h-[3rem] overflow-hidden">
              {proposal.attributes.content.attributes.prop_name}
            </h2>
          </div>
          <Badge
            variant="secondary"
            className={clsx("p-2 rounded-full", getStatusBadgeClasses())}
          >
            {isProposalActive
              ? dictionary.general.active.toUpperCase()
              : dictionary.general.inactive.toUpperCase()}
          </Badge>
        </div>

        <div className="flex gap-4 items-center">
          <Avatar className="h-10 w-10">
            <AvatarFallback>{username.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <div className="flex gap-x-4 items-center flex-wrap">
              <div className="font-medium">{username}</div>
              <div className="text-sm text-muted-foreground">
                {dictionary.general.author}
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="h-full flex flex-col gap-4 justify-between">
        <div className="max-h-48 h-full overflow-y-auto text-muted-foreground bg-muted/50 p-4 rounded-lg">
          <Latex>{abstract}</Latex>
          {/* <p>{proposal.attributes.content.attributes.prop_abstract}</p> */}
        </div>
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <Badge
            variant="outline"
            className={clsx(
              "text-lg px-6 rounded-full",
              getActionTypeBadgeClasses()
            )}
          >
            {actionType}
          </Badge>
          <div className="text-muted-foreground">Governance Action Type</div>
        </div>

        <div className="grid grid-cols-3 justify-between sm:space-y-0 text-sm gap-4 text-muted-foreground">
          <div className="flex items-center space-x-2">
            <ThumbsUpIcon className="h-4 w-4" />
            <span>{proposal.attributes.prop_likes} likes</span>
          </div>
          <div className="flex items-center space-x-2">
            <ThumbsDownIcon className="h-4 w-4" />
            <span>{proposal.attributes.prop_dislikes} dislikes</span>
          </div>
          <div className="flex items-center space-x-2">
            <MessageSquare className="h-4 w-4" />
            <span>{proposal.attributes.prop_comments_number} comments</span>
          </div>

          <div className="col-span-full space-y-2 text-foreground">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>
                Submitted:{" "}
                <span className="font-semibold">
                  {formatDate(createdDate, createdEpoch)}
                </span>
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>
                Updated:{" "}
                <span className="font-semibold">
                  {formatDate(updatedAt, updatedEpoch)}
                </span>
              </span>
            </div>
          </div>
        </div>

        <Link
          href={`/proposals/${proposal.id}`}
          className={buttonVariants({ variant: "default" })}
        >
          {dictionary.general.viewDetailsAndVote}
        </Link>
      </CardContent>
    </Card>
  );
};

export default ProposalCard;
