import { CircleMinus, ThumbsDown, ThumbsUp } from "lucide-react";
import { Card, CardContent } from "~/components/ui/card";

type VoteOption = {
  type: "yes" | "no" | "abstain";
  amount: number;
};

export type GovernanceSectionVotingProps = {
  title: string;
  votes: VoteOption[];
  threshold: number;
};

const formatAda = (amount: number) => {
  return `₳ ${amount.toLocaleString("en-US", {
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  })}`;
};

const VoteCard = ({ type, amount }: VoteOption) => {
  const config = {
    yes: {
      icon: <ThumbsUp />,
      text: "YES",
      colorClass: "text-green-600",
    },
    no: {
      icon: <ThumbsDown />,
      text: "NO",
      colorClass: "text-red-600",
    },
    abstain: {
      icon: <CircleMinus />,
      text: "ABSTAIN",
      colorClass: "text-gray-500",
    },
  };

  const { icon, text, colorClass } = config[type];

  return (
    <div className="flex items-center justify-between p-2 gap-6 rounded-lg bg-white border border-gray-200 hover:border-gray-300 transition-colors">
      <div className={`flex items-center justify-center gap-2 ${colorClass}`}>
        {icon}
        <span className="font-bold">{text}</span>
      </div>
      <span className="font-bold text-sm">{formatAda(amount)}</span>
    </div>
  );
};

export const GovernanceSectionVoting = ({
  title,
  votes,
  threshold,
}: GovernanceSectionVotingProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <h2 className="text-lg font-semibold">{title}</h2>
        </div>

        <div className="space-y-3 mb-6">
          {votes.map((vote, index) => (
            <VoteCard key={index} {...vote} />
          ))}
        </div>

        <div className="space-y-2">
          <div className="text-sm text-gray-600">
            THRESHOLD: {threshold.toFixed(2)}
          </div>
          <div className="h-2 rounded-full bg-[#6B7280] relative">
            <div
              className="h-full rounded-l-full bg-gradient-to-r from-green-500 to-green-500 absolute"
              style={{ width: `${threshold * 100 - 5}%` }}
            />
            <div
              className="h-full bg-red-500 absolute"
              style={{ width: "30%", left: `${threshold * 100 - 5}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
