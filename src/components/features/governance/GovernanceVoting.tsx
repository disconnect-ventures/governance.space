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
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "~/components/ui/tooltip";
import { Dictionary } from "~/config/dictionaries";

export const GovernaceVoting = ({
  action,
  translations,
}: {
  action: GovernanceAction;
  translations: Pick<
    Dictionary,
    "general" | "pageGovernanceActions" | "pageGovernanceActionsDetails"
  >;
}) => {
  // TODO:Get correct threshold
  const dRepsVotingData: GovernanceVotingCardProps = {
    title: translations.pageGovernanceActionsDetails.dreps,
    votes: {
      yes: {
        label: translations.general.yes,
        count: action.dRepYesVotes,
      },
      no: { label: translations.general.no, count: action.dRepNoVotes },
      abstain: {
        label: translations.general.abstain,
        count: action.dRepAbstainVotes,
      },
    },
    threshold: 0.51,
    formatValue: (value) => formatAda(formatVotingPower(value)),
  };

  const sposVotingData: GovernanceVotingCardProps = {
    title: translations.pageGovernanceActionsDetails.spos,
    votes: {
      yes: { label: translations.general.yes, count: action.poolYesVotes },
      no: { label: translations.general.no, count: action.poolNoVotes },
      abstain: {
        label: translations.general.abstain,
        count: action.poolAbstainVotes,
      },
    },
    threshold: 0.51,
    formatValue: (value) => formatAda(formatVotingPower(value)),
  };

  const constitutionalCommitteeVotingData: GovernanceVotingCardProps = {
    title: translations.pageGovernanceActionsDetails.constitutionalCommittee,
    votes: {
      yes: {
        label: translations.pageGovernanceActionsDetails.constitutional,
        count: action.ccYesVotes,
      },
      no: {
        label: translations.pageGovernanceActionsDetails.unconstitutional,
        count: action.ccNoVotes,
      },
      abstain: {
        label: translations.general.abstain,
        count: action.ccAbstainVotes,
      },
    },
    threshold: 0.51,
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
        {translations.pageGovernanceActionsDetails.votesSubmittedBy}:
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        <GovernanceVotingCard {...dRepsVotingData} />
        <GovernanceVotingCard {...sposVotingData} />
        <GovernanceVotingCard {...constitutionalCommitteeVotingData} />
      </div>

      <div className="w-full flex flex-col md:flex-row gap-8 mt-6">
        <div className="w-full md:flex-1">
          <p className="mb-4 font-bold text-gray-600 dark:text-gray-400">
            {translations.pageGovernanceActions.legacyGovernanceActionID}:
          </p>

          <div className="flex items-center gap-2 mb-8">
            <code className="text-xs sm:text-sm font-mono break-all dark:text-gray-300">
              {truncateMiddle(actionId, 25)}
            </code>
            <CopyToClipboard
              value={actionId}
              translations={translations.general}
            />
          </div>

          <div className="space-y-3">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <div className="flex flex-wrap items-center gap-2">
                    <Calendar className="h-5 w-5 text-gray-400 dark:text-gray-600 flex-shrink-0" />
                    <span className="text-gray-500 dark:text-gray-400 font-bold">
                      {translations.pageGovernanceActionsDetails.submitted}:
                    </span>
                    <span className="text-[#4B5563] dark:text-gray-300">
                      {formatDate(action.createdDate, action.createdEpochNo)}
                    </span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="w-64 max-w-[90vw]">
                    <span className="block text-lg font-semibold">
                      {translations.pageGovernanceActionsDetails.submitted}
                    </span>
                    {translations.pageGovernanceActionsDetails.submittedTooltip}
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <div className="flex flex-wrap items-center gap-2">
                    <Clock className="h-5 w-5 text-gray-400 dark:text-gray-600 flex-shrink-0" />
                    <span className="text-gray-500 dark:text-gray-400 font-bold">
                      {translations.general.expires}:
                    </span>
                    <span className="text-[#4B5563] dark:text-gray-300">
                      {formatDate(action.expiryDate, action.expiryEpochNo)}
                    </span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="w-64 max-w-[90vw]">
                    <span className="block text-lg font-semibold">
                      {translations.general.expires}
                    </span>
                    {translations.pageGovernanceActionsDetails.expiresTooltip}
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        <div className="w-full md:flex-1 flex flex-col gap-2">
          <div className="space-y-2">
            <div className="flex justify-between">
              <p className="text-gray-600 dark:text-gray-400">
                {translations.pageGovernanceActionsDetails.deadline}:
              </p>
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
              {daysPassed} / {totalDays} {translations.general.days}
              {daysRemaining > 0 ? (
                <span className="text-[#2563EB] dark:text-blue-400 ml-1">
                  ({daysRemaining} {translations.general.days}{" "}
                  {translations.general.remaining})
                </span>
              ) : (
                <span className="text-red-500 dark:text-red-400 ml-1">
                  ({translations.general.expired})
                </span>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
