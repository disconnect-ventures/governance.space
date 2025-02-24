// https://www.figma.com/design/bfEklPIeZVRf0P6xC6f1e7/Governance-Space?node-id=50-19870&t=GGJEhGlKd8rVords-4
import { Calendar, CircleX, CircleMinus, CircleCheck } from "lucide-react";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Proposal } from "~/lib/proposals";
import clsx from "clsx";
import { Separator } from "~/components/ui/separator";
import ComingSoon from "~/components/layout/ComingSoon";

type VotingHistoryProps = {
  proposals: Array<Proposal>;
};

export const VotingHistory = ({ proposals }: VotingHistoryProps) => {
  const getSubmissionStatus = (proposal: Proposal) => {
    if (!proposal.attributes.content.attributes.prop_submitted) {
      return "Pending";
    }
    if (proposal.attributes.content.attributes.prop_rev_active) {
      return "Approved";
    }
    return "Rejected";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getUserVote = () => {
    const options: Array<"Yes" | "No" | "Abstain"> = ["Yes", "No", "Abstain"];
    const randIndex = ~~(Math.random() * options.length);
    return options[randIndex];
  };

  const getVoteBadge = (vote: "Yes" | "No" | "Abstain") => {
    return (
      <Badge
        className={clsx(
          vote === "Yes"
            ? "bg-green-100 text-green-800"
            : vote === "No"
            ? "bg-red-100 text-red-800"
            : "bg-gray-100 text-gray-800",
          "p-3 text-lg flex gap-3"
        )}
      >
        {vote === "Yes" ? (
          <CircleCheck />
        ) : vote === "No" ? (
          <CircleX />
        ) : (
          <CircleMinus />
        )}
        {vote.toUpperCase()}
      </Badge>
    );
  };

  return (
    <Card>
      <CardHeader className="text-xl font-semibold">Voting History</CardHeader>
      <CardContent className="space-y-4">
        <ComingSoon>
          {proposals.map((proposal, index) => {
            const vote = getUserVote();

            return (
              <Card
                key={proposal.id}
                className="w-full shadow-none border-none"
              >
                <CardContent className="px-0">
                  <div className="flex flex-col space-y-4">
                    {index > 0 && <Separator />}
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex gap-4 md:gap-8 mb-2 justify-between">
                          <div className="flex flex-col md:flex-row gap-2 md:items-center">
                            <h2 className="text-lg font-semibold">
                              {proposal.attributes.content.attributes.prop_name}
                            </h2>
                            <Badge
                              variant="secondary"
                              className={clsx(
                                proposal.attributes.content.attributes
                                  .prop_submitted
                                  ? "bg-green-100 text-green-800"
                                  : "bg-yellow-100 text-yellow-800",
                                "w-fit mr-auto"
                              )}
                            >
                              {getSubmissionStatus(proposal)}
                            </Badge>
                          </div>
                          <div className="">{getVoteBadge(vote)}</div>
                        </div>
                        <p className="text-gray-600 mb-2">
                          {proposal.attributes.content.attributes.prop_abstract}
                        </p>
                        <div className="flex flex-wrap items-center gap-2 text-gray-500 text-sm">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {formatDate(
                              proposal.attributes.content.attributes.createdAt
                            )}
                          </span>
                          <span className="text-gray-400">|</span>
                          <span>
                            ID:{" "}
                            {proposal.attributes.content.attributes.proposal_id}
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
