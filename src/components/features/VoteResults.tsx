import { CircleMinus, ThumbsDown, ThumbsUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Dictionary } from "~/config/dictionaries";
import { TooltipProvider } from "~/components/ui/tooltip";

type VoteOption = {
  count: number;
  label?: string;
  hide?: boolean;
};

type VoteResultsProps = {
  title: string;
  description?: string;
  votes: Record<"yes" | "no" | "abstain", VoteOption>;
  threshold: number;
  formatValue?: (v: number) => string;
  translations: Dictionary["general"];
};

export function VoteResults({
  title,
  description,
  votes,
  // threshold = 0.51,
  formatValue,
  translations,
}: VoteResultsProps) {
  const config = {
    yes: {
      icon: <ThumbsUp size={20} />,
      text: translations.yes,
      colorClass: "text-green-600 dark:text-green-400",
      bgClass: "bg-green-500 dark:bg-green-600",
    },
    no: {
      icon: <ThumbsDown size={20} />,
      text: translations.no,
      colorClass: "text-red-600 dark:text-red-400",
      bgClass: "bg-red-500 dark:bg-red-600",
    },
    abstain: {
      icon: <CircleMinus size={20} />,
      text: translations.abstain,
      colorClass: "text-gray-500 dark:text-gray-400",
      bgClass: "bg-gray-500 dark:bg-gray-600",
    },
  };

  const totalVotes = Object.values(votes).reduce(
    (total, { count }) => total + count,
    0
  );

  const getPercentage = (count: number) =>
    totalVotes ? Math.round((count / totalVotes) * 100) : 0;

  const yesPercentage = getPercentage(votes.yes.count);
  const noPercentage = getPercentage(votes.no.count);
  const abstainPercentage = getPercentage(votes.abstain.count);

  const formatCount = (count: number) => {
    const percentage = getPercentage(count);
    const displayValue = formatValue
      ? formatValue(count)
      : count.toLocaleString();
    return `${displayValue} (${percentage}%)`;
  };

  // const thresholdPercentage = threshold * 100;
  // const passedThreshold = yesPercentage >= thresholdPercentage;

  return (
    <TooltipProvider>
      <Card className="dark:bg-gray-800 dark:border-gray-700 shadow-md">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold dark:text-gray-100">
              {title}
            </CardTitle>
            <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">
              {translations.totalVotes}: {totalVotes.toLocaleString()}
            </div>
          </div>
          {description && (
            <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">
              {description}
            </div>
          )}
        </CardHeader>
        <CardContent className="p-6 pt-2">
          <div className="space-y-3 mb-4">
            {Object.entries(votes).map(
              ([type, { count, label, hide = false }], index) => {
                const {
                  icon,
                  text: defaultLabel,
                  colorClass,
                } = config[type as keyof typeof config];

                const percentage = getPercentage(count);

                return !hide ? (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 gap-6 rounded-lg
                    bg-white border border-gray-200 hover:border-gray-300
                    dark:bg-gray-900 dark:border-gray-700 dark:hover:border-gray-600
                    transition-colors"
                  >
                    <div
                      className={`flex items-center justify-center gap-2 ${colorClass}`}
                    >
                      {icon}
                      <span className="font-bold">
                        {(label ?? defaultLabel).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 rounded-full bg-gray-200 dark:bg-gray-700 relative">
                        <div
                          className={`h-full rounded-full ${config[type as keyof typeof config].bgClass}`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="font-bold text-sm dark:text-gray-200 min-w-[90px] text-right">
                        {formatCount(count)}
                      </span>
                    </div>
                  </div>
                ) : null;
              }
            )}
          </div>

          <div className="space-y-3">
            {/* <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-600 dark:text-gray-400">
                {translations.threshold}: {Math.round(thresholdPercentage)}%
              </span>
              <div className="flex items-center gap-1">
                <span
                  className={
                    passedThreshold
                      ? "text-green-600 dark:text-green-400"
                      : "text-gray-600 dark:text-gray-400"
                  }
                >
                  {passedThreshold
                    ? translations.approved
                    : translations.rejected}
                </span>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info size={14} className="text-gray-400 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent className="p-2 text-xs">
                    {`Votes require ${Math.round(thresholdPercentage)}% approval to pass`}
                  </TooltipContent>
                </Tooltip>
              </div>
            </div> */}

            <div className="h-3 rounded-full bg-gray-200 dark:bg-gray-700 relative overflow-hidden">
              {/* <div
                className="absolute h-full w-1 bg-gray-600 dark:bg-gray-400 z-10"
                style={{ left: `${thresholdPercentage}%` }}
              /> */}

              <div
                className="h-full rounded-l-full bg-green-500 dark:bg-green-600 absolute"
                style={{ width: `${yesPercentage}%` }}
              />

              <div
                className="h-full bg-red-500 dark:bg-red-600 absolute"
                style={{
                  width: `${noPercentage}%`,
                  left: `${yesPercentage}%`,
                }}
              />

              <div
                className="h-full rounded-r-full bg-gray-500 dark:bg-gray-600 absolute"
                style={{
                  width: `${abstainPercentage}%`,
                  left: `${yesPercentage + noPercentage}%`,
                }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
}
