import { History } from "lucide-react";
import ComingSoon from "~/components/layout/ComingSoon";
import { CardContent } from "~/components/ui/card";

type HistoryEntry = {
  action: string;
  author: string;
  date: string;
};

interface GovernanceHistoryProps {
  entries: HistoryEntry[];
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export const GovernanceHistory = ({ entries }: GovernanceHistoryProps) => {
  return (
    <CardContent className="p-6">
      <h2 className="mb-4 text-lg font-medium">History</h2>
      <ComingSoon>
        <div className="space-y-1">
          {entries.map((entry, index) => (
            <div
              key={index}
              className="flex items-start p-2 gap-4 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <History
                className="w-7 h-7 text-gray-400 mt-1 flex-shrink-0"
                aria-hidden="true"
              />
              <div className="min-w-0 flex-1">
                <p className="text-gray-600 font-medium">{entry.action}</p>
                <span className="text-gray-500 text-sm">
                  {entry.author} - {formatDate(entry.date)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </ComingSoon>
    </CardContent>
  );
};
