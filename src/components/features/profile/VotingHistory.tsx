"use client";
import React, { useState, useEffect } from "react";
import { Calendar, CircleX, CircleMinus, CircleCheck } from "lucide-react";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Proposal } from "~/lib/proposals";
import clsx from "clsx";
import { Separator } from "~/components/ui/separator";
import ComingSoon from "~/components/layout/ComingSoon";

type VotingHistoryProps = {
  proposals: Array<Proposal>;
  general: {
    yes: string;
    no: string;
    abstain: string;
    pending: string;
    approved: string;
    rejected: string;
    locale: string;
    item: string;
  };
  pageDrepsDetails: {
    votingHistory: string;
  };
};

type VoteType = "Yes" | "No" | "Abstain";

export const VotingHistory = ({ proposals, general, pageDrepsDetails }: VotingHistoryProps) => {
  const [votes, setVotes] = useState<Record<string, VoteType>>({});

  useEffect(() => {
    const newVotes: Record<string, VoteType> = {};
    proposals.forEach((proposal) => {
      const options: VoteType[] = ["Yes", "No", "Abstain"];
      const randIndex = Math.floor(Math.random() * options.length);
      newVotes[proposal.id] = options[randIndex];
    });
    setVotes(newVotes);
  }, [proposals]);

  const voteTranslations: Record<VoteType, string> = {
    Yes: general.yes,
    No: general.no,
    Abstain: general.abstain,
  };

  const getSubmissionStatus = (proposal: Proposal) => {
    if (!proposal.attributes.content.attributes.prop_submitted) {
      return general.pending;
    }
    if (proposal.attributes.content.attributes.prop_rev_active) {
      return general.approved;
    }
    return general.rejected;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString(general.locale, {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getVoteBadge = (vote: VoteType) => {
    return (
      <Badge
        className={clsx(
          vote === "Yes"
            ? "bg-green-500/10 text-green-500 dark:bg-green-500/20 dark:text-green-400"
            : vote === "No"
              ? "bg-red-500/10 text-red-500 dark:bg-red-500/20 dark:text-red-400"
              : "bg-gray-500/10 text-gray-500 dark:bg-gray-500/20 dark:text-gray-400",
          "p-3 text-lg flex gap-3",
        )}
      >
        {vote === "Yes" ? <CircleCheck /> : vote === "No" ? <CircleX /> : <CircleMinus />}
        {voteTranslations[vote].toUpperCase()}
      </Badge>
    );
  };

  return (
    <Card className="bg-card text-card-foreground">
      <CardHeader className="text-xl font-semibold text-foreground">
        {pageDrepsDetails.votingHistory}
      </CardHeader>
      <CardContent className="space-y-4">
        <ComingSoon>
          {proposals.map((proposal, index) => {
            const vote = votes[proposal.id] || "Abstain";

            return (
              <Card key={proposal.id} className="w-full shadow-none border-border bg-background">
                <CardContent className="px-0">
                  <div className="flex flex-col space-y-4">
                    {index > 0 && <Separator />}
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex gap-4 md:gap-8 mb-2 justify-between">
                          <div className="flex flex-col md:flex-row gap-2 md:items-center">
                            <h2 className="text-lg font-semibold text-foreground">
                              {proposal.attributes.content.attributes.prop_name}
                            </h2>
                            <Badge
                              variant="secondary"
                              className={clsx(
                                proposal.attributes.content.attributes.prop_submitted
                                  ? "bg-green-500/10 text-green-500 dark:bg-green-500/20 dark:text-green-400"
                                  : "bg-yellow-500/10 text-yellow-500 dark:bg-yellow-500/20 dark:text-yellow-400",
                                "w-fit mr-auto",
                              )}
                            >
                              {getSubmissionStatus(proposal)}
                            </Badge>
                          </div>
                          <div className="">{getVoteBadge(vote)}</div>
                        </div>
                        <p className="text-muted-foreground mb-2">
                          {proposal.attributes.content.attributes.prop_abstract}
                        </p>
                        <div className="flex flex-wrap items-center gap-2 text-muted-foreground text-sm">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(proposal.attributes.content.attributes.createdAt)}</span>
                          <span className="text-muted-foreground/50">|</span>
                          <span>
                            {general.item}: {proposal.attributes.content.attributes.proposal_id}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </ComingSoon>
      </CardContent>
    </Card>
  );
};
