import { Calendar, Clock } from "lucide-react";
import {
  GovernanceVotingCard,
  GovernanceVotingCardProps,
} from "./GovernanceVotingCard";
import { Progress } from "~/components/ui/progress";
import { GovernanceAction } from "~/lib/governance-actions";
import {
  formatAda,
  formatDate,
  formatVotingPower,
  truncateMiddle,
} from "~/lib/utils";
import CopyToClipboard from "../CopyToClipboard";

export const GovernaceVoting = ({ action }: { action: GovernanceAction }) => {
  // TODO:Get correct threshold
  const sposVotingData: GovernanceVotingCardProps = {
    title: "SPOS",
    votes: {
      yes: { count: action.poolYesVotes },
      no: { count: action.poolNoVotes },
      abstain: { count: action.poolAbstainVotes },
    },
    threshold: 0.51,
    formatValue: (value) => formatAda(formatVotingPower(value)),
  };

  const constitutionalCommitteeVotingData: GovernanceVotingCardProps = {
    title: "Constitutional Committee",
    votes: {
      yes: { label: "Constitutional", count: action.ccYesVotes },
      no: { label: "Unconstitutional", count: action.ccNoVotes },
      abstain: { label: "Abstain", count: action.ccAbstainVotes },
    },
    threshold: 0.51,
  };

  const dRepsVotingData: GovernanceVotingCardProps = {
    title: "DReps",
    votes: {
      yes: { count: action.dRepYesVotes },
      no: { count: action.dRepNoVotes },
      abstain: { count: action.dRepAbstainVotes },
    },
    threshold: 0.51,
    formatValue: (value) => formatAda(formatVotingPower(value)),
  };

  const totalDuration =
    new Date(action.expiryDate).getTime() -
    new Date(action.createdDate).getTime();
  const currentProgress = Date.now() - new Date(action.createdDate).getTime();
  const progressPercentage = (currentProgress / totalDuration) * 100;

  const daysPassed = Math.floor(currentProgress / (1000 * 60 * 60 * 24));
  const totalDays = Math.floor(totalDuration / (1000 * 60 * 60 * 24));
  const daysRemaining = totalDays - daysPassed;

  const actionId = `${action.txHash}#${action.index}`;

  return (
    <div className="m-8">
      <h2 className="text-lg font-bold mb-6 dark:text-gray-100">
        Votes submitted for this Governance Action By:
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        <GovernanceVotingCard {...dRepsVotingData} />
        <GovernanceVotingCard {...sposVotingData} />
        <GovernanceVotingCard {...constitutionalCommitteeVotingData} />
      </div>

      <div className="w-full flex flex-col md:flex-row gap-8 mt-6">
        <div className="w-full md:flex-1">
          <p className="mb-4 font-bold text-gray-600 dark:text-gray-400">
            Legacy Governance Action ID:
          </p>

          <div className="flex items-center gap-2 mb-8">
            <code className="text-xs sm:text-sm font-mono break-all dark:text-gray-300">
              {truncateMiddle(actionId, 25)}
            </code>
            <CopyToClipboard value={actionId} />
          </div>

          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <Calendar className="h-5 w-5 text-gray-400 dark:text-gray-600 flex-shrink-0" />
              <span className="text-gray-500 dark:text-gray-400 font-bold">
                Submitted:
              </span>
              <span className="text-[#4B5563] dark:text-gray-300">
                {formatDate(action.createdDate, action.createdEpochNo)}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Clock className="h-5 w-5 text-gray-400 dark:text-gray-600 flex-shrink-0" />
              <span className="text-gray-500 dark:text-gray-400 font-bold">
                Expires:
              </span>
              <span className="text-[#4B5563] dark:text-gray-300">
                {formatDate(action.expiryDate, action.expiryEpochNo)}
              </span>
            </div>
          </div>
        </div>

        <div className="w-full md:flex-1 flex flex-col gap-2">
          <div className="space-y-2">
            <div className="flex justify-between">
              <p className="text-gray-600 dark:text-gray-400">Deadline</p>
              <span className="font-medium text-[#2563EB] dark:text-blue-400">
                {progressPercentage.toFixed(2)} %
              </span>
            </div>
            <Progress
              value={progressPercentage}
              className="h-2"
              color="#2563EB"
            />
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {daysPassed} / {totalDays} days
              {daysRemaining > 0 ? (
                <span className="text-[#2563EB] dark:text-blue-400 ml-1">
                  ({daysRemaining} days remaining)
                </span>
              ) : (
                <span className="text-red-500 dark:text-red-400 ml-1">
                  (Expired)
                </span>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
