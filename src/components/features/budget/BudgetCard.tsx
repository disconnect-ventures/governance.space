import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { MessageSquare, Calendar } from "lucide-react";
import { buttonVariants } from "~/components/ui/button";
import clsx from "clsx";
import Link from "~/components/features/Link";
import { calculateEpochNumber, formatDate } from "~/lib/utils";
import { Dictionary } from "~/config/dictionaries";
import { BudgetTypeBadge } from "./BudgetBadge";
import { Markdown } from "../Markdown";
import { BudgetDiscussion } from "~/lib/budgetDiscussions";
import { useCallback, useMemo } from "react";

export type BudgetDiscussionCardProps = {
  discussion: BudgetDiscussion;
  dictionary: Dictionary;
};

const BudgetDiscussionCard = ({
  discussion,
  dictionary,
}: BudgetDiscussionCardProps) => {
  const proposalId = useMemo(() => discussion.id, [discussion]);
  const proposalName = useMemo(
    () =>
      discussion.attributes.bd_proposal_detail?.data.attributes.proposal_name,
    [discussion]
  );
  const isDiscussionActive = useMemo(
    () => discussion.attributes.is_active,
    [discussion]
  );
  const creatorUsername = useMemo(
    () => discussion.attributes.creator?.data.attributes.govtool_username ?? "",
    [discussion]
  );

  const createdAt = useMemo(
    () => discussion.attributes.createdAt,
    [discussion]
  );
  const updatedAt = useMemo(
    () => discussion.attributes.updatedAt,
    [discussion]
  );

  const discussionBenefit = useMemo(
    () => discussion.attributes.bd_psapb?.data.attributes.proposal_benefit,
    [discussion]
  );
  const discussionType = useMemo(
    () =>
      discussion.attributes.bd_psapb?.data.attributes.type_name.data.attributes,
    [discussion]
  );

  const getStatusBadgeClasses = useCallback(() => {
    return isDiscussionActive
      ? "bg-green-500/20 text-green-500"
      : "bg-red-500/20 text-red-500";
  }, [isDiscussionActive]);

  return (
    <Card className="w-full flex flex-col mx-auto border-border bg-card">
      <CardHeader className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">
              # ID: {proposalId}
            </div>
            <h2 className="text-2xl text-foreground font-semibold leading-[1.5rem] h-[3rem] overflow-hidden">
              {proposalName}
            </h2>
          </div>
          <Badge
            variant="secondary"
            className={clsx("p-2 rounded-full", getStatusBadgeClasses())}
          >
            {isDiscussionActive
              ? dictionary.general.active.toUpperCase()
              : dictionary.general.inactive.toUpperCase()}
          </Badge>
        </div>

        <div className="flex gap-4 items-center">
          <Avatar className="h-10 w-10">
            <AvatarFallback>{creatorUsername.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <div className="flex gap-x-4 items-center flex-wrap">
              <div className="font-medium">{creatorUsername}</div>
              <div className="text-sm text-muted-foreground">
                {dictionary.general.author}
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="h-full flex flex-col gap-4 justify-between">
        <div className="max-h-48 h-full overflow-y-auto text-muted-foreground bg-muted/50 p-4 rounded-lg">
          <Markdown content={discussionBenefit ?? ""}></Markdown>
        </div>
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <BudgetTypeBadge type={discussionType?.type_name ?? ""} />
          <div className="text-muted-foreground">
            {dictionary.pageBudgetDiscussions.cardTypeLabel}
          </div>
        </div>

        <div className="grid grid-cols-3 justify-between sm:space-y-0 text-sm gap-4 text-muted-foreground">
          <div className="flex items-center space-x-2">
            <MessageSquare className="h-4 w-4" />
            <span>
              {discussion.attributes.prop_comments_number}{" "}
              {dictionary.general.comments}
            </span>
          </div>

          <div className="col-span-full space-y-2 text-foreground">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>
                {dictionary.general.submitted}:{" "}
                <span className="font-semibold">
                  {formatDate(createdAt, calculateEpochNumber(createdAt))}
                </span>
              </span>
            </div>
            {updatedAt !== createdAt && (
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>
                  {dictionary.general.expires}:{" "}
                  <span className="font-semibold">
                    {formatDate(updatedAt, calculateEpochNumber(updatedAt))}
                  </span>
                </span>
              </div>
            )}
          </div>
        </div>

        <Link
          href={`/budget-discussions/${discussion.id}`}
          className={buttonVariants({ variant: "default" })}
        >
          {dictionary.general.viewDetailsAndVote}
        </Link>
      </CardContent>
    </Card>
  );
};

export default BudgetDiscussionCard;
