import { Calendar, Clock } from "lucide-react";
import { formatDate } from "~/lib/utils";

type ProposalTimelineProps = {
  createdTime: string;
  createdEpoch: number;
  updateDate: string;
  updateEpoch: number;
};

export const ProposalTimeline = ({
  createdTime,
  createdEpoch,
  updateDate,
  updateEpoch,
}: ProposalTimelineProps) => {
  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-8 text-gray-700 mb-4">
      <div className="flex items-center gap-3">
        <Calendar
          className="w-6 h-6 text-gray-500 shrink-0"
          aria-label="Submission date icon"
        />
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-2">
          <span>
            Submitted:{" "}
            <span className="font-semibold">
              {formatDate(createdTime, createdEpoch)}
            </span>
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Clock
          className="w-6 h-6 text-gray-500 shrink-0"
          aria-label="Expiry date icon"
        />
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-2">
          <span>
            Updated At:{" "}
            <span className="font-semibold">
              {formatDate(updateDate, updateEpoch)}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};
