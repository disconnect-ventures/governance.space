import { Badge } from "~/components/ui/badge";
import {
  CalendarIcon,
  MessageSquareIcon,
  ThumbsDownIcon,
  ThumbsUpIcon,
} from "lucide-react";
import { formatDate } from "~/lib/utils";
import { ProposalBadge } from "./ProposalBadge";
import { Dictionary } from "~/config/dictionaries";

interface ProposalHeaderProps {
  type: string;
  isActive: boolean;
  title: string;
  createdDate: string;
  createdEpoch: number;
  updatedAt: string;
  updatedEpoch: number;
  commentCount: number;
  dislikes?: number;
  likes?: number;
  translations: Dictionary;
}

export const ProposalHeader = ({
  type,
  isActive,
  title,
  createdDate,
  createdEpoch,
  updatedAt,
  updatedEpoch,
  likes,
  dislikes,
  commentCount,
  translations,
}: ProposalHeaderProps) => {
  return (
    <div>
      <div className="flex items-end justify-between gap-4 mb-4 text-center w-full">
        <div className="flex items-center gap-2 flex-wrap-reverse">
          <ProposalBadge type={type} translations={translations} />
          <span className="text-sm text-muted-foreground text-left">
            {translations.pageGovernanceActions.governanceActionType}
          </span>
        </div>
        <Badge className="text-sm bg-green-100 text-green-800">
          {isActive
            ? translations.general.active.toUpperCase()
            : translations.general.inactive.toUpperCase()}
        </Badge>
      </div>

      <h2 className="text-xl md:text-2xl font-bold mb-4">{title}</h2>

      <div className="grid grid-cols-3 justify-between sm:space-y-0 text-sm gap-4">
        {typeof likes !== "undefined" ? (
          <div className="flex items-center space-x-2">
            <ThumbsUpIcon className="h-4 w-4" />
            <span>
              {likes} {translations.general.likes}
            </span>
          </div>
        ) : null}
        {typeof dislikes !== "undefined" ? (
          <div className="flex items-center space-x-2">
            <ThumbsDownIcon className="h-4 w-4" />
            <span>
              {dislikes} {translations.general.dislikes}
            </span>
          </div>
        ) : null}
        <div className="flex items-center space-x-2">
          <MessageSquareIcon className="h-4 w-4 shrink-0" />
          <span className="whitespace-nowrap">
            {commentCount} {translations.general.comments}
          </span>
        </div>

        <div className="col-span-full space-y-2">
          <div className="flex items-center space-x-2">
            <CalendarIcon className="h-4 w-4" />
            <span>
              {translations.general.submitted}:{" "}
              <span className="font-semibold">
                {formatDate(createdDate, createdEpoch)}
              </span>
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <CalendarIcon className="h-4 w-4" />
            <span>
              {translations.general.updated}:{" "}
              <span className="font-semibold">
                {formatDate(updatedAt, updatedEpoch)}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
