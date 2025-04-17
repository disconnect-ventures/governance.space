import { Calendar, Clock } from "lucide-react";
import { Dictionary } from "~/config/dictionaries";
import { formatDate } from "~/lib/utils";

type ProposalTimelineProps = {
  createdTime: string;
  createdEpoch: number;
  updateDate: string;
  updateEpoch: number;
  translations: Dictionary;
};

export const ProposalTimeline = ({
  createdTime,
  createdEpoch,
  updateDate,
  updateEpoch,
  translations,
}: ProposalTimelineProps) => {
  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-8 text-foreground mb-4">
      <div className="flex items-center gap-3">
        <Calendar
          className="w-6 h-6 text-muted-foreground shrink-0"
          aria-label={translations.accessibility.submissionDateIcon}
        />
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-2">
          <span>
            {translations.general.submitted}:{" "}
            <span className="font-semibold">
              {formatDate(createdTime, createdEpoch)}
            </span>
          </span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Clock
          className="w-6 h-6 text-muted-foreground shrink-0"
          aria-label={translations.accessibility.expireDateIcon}
        />
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-2">
          <span>
            {translations.general.updated}:{" "}
            <span className="font-semibold">
              {formatDate(updateDate, updateEpoch)}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};
