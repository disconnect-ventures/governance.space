import { CircleMinus, ThumbsDown, ThumbsUp } from "lucide-react";
import { Card, CardContent } from "~/components/ui/card";

type VoteOption = {
  count: number;
  label?: string;
};

export type GovernanceVotingCardProps = {
  title: string;
  votes: Record<"yes" | "no" | "abstain", VoteOption>;
  threshold: number;
  formatValue?: (v: number) => string;
};

export const GovernanceVotingCard = ({
  title,
  votes,
  // threshold,
  formatValue,
}: GovernanceVotingCardProps) => {
  const config = {
    yes: {
      icon: <ThumbsUp />,
      text: "YES",
      colorClass: "text-green-600 dark:text-green-400",
    },
    no: {
      icon: <ThumbsDown />,
      text: "NO",
      colorClass: "text-red-600 dark:text-red-400",
    },
    abstain: {
      icon: <CircleMinus />,
      text: "ABSTAIN",
      colorClass: "text-gray-500 dark:text-gray-400",
    },
  };

  const totalVotes = Object.values(votes).reduce((total, { count }) => total + count, 0);
  const yesPercentage = totalVotes ? (votes["yes"].count / totalVotes) * 100 : 0;
  const noPercentage = totalVotes ? (votes["no"].count / totalVotes) * 100 : 0;

  return (
    <Card className="dark:bg-gray-800 dark:border-gray-700">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <h2 className="text-lg font-semibold dark:text-gray-100">{title}</h2>
        </div>
        <div className="space-y-3 mb-6">
          {Object.entries(votes).map(([type, { count, label }], index) => {
            const { icon, text: defaultLabel, colorClass } = config[type as keyof typeof config];
            return (
              <div
                key={index}
                className="flex items-center justify-between p-2 gap-6 rounded-lg
                  bg-white border border-gray-200 hover:border-gray-300
                  dark:bg-gray-900 dark:border-gray-700 dark:hover:border-gray-600
                  transition-colors"
              >
                <div className={`flex items-center justify-center gap-2 ${colorClass}`}>
                  {icon}
                  <span className="font-bold">{label?.toUpperCase() ?? defaultLabel}</span>
                </div>
                <span className="font-bold text-sm dark:text-gray-200">
                  {formatValue ? formatValue(count) : count}
                </span>
              </div>
            );
          })}
        </div>
        <div className="space-y-2">
          <div className="h-2 rounded-full bg-[#6B7280] dark:bg-gray-700 relative">
            <div
              className="h-full rounded-l-full bg-gradient-to-r from-green-500 to-green-500 dark:from-green-600 dark:to-green-600 absolute"
              style={{ width: `${yesPercentage}%` }}
            />
            <div
              className="h-full bg-red-500 dark:bg-red-600 absolute"
              style={{
                width: `${noPercentage}%`,
                left: `${yesPercentage}%`,
              }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
