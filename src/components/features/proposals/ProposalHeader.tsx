import { Badge } from "~/components/ui/badge";
import {
  CalendarIcon,
  MessageSquareIcon,
  ThumbsDownIcon,
  ThumbsUpIcon,
} from "lucide-react";
import { formatDate } from "~/lib/utils";
import { ProposalTypeBadge } from "./ProposalBadge";

interface ProposalHeaderProps {
  type: string;
  isActive: boolean;
  title: string;
  createdDate: string;
  createdEpoch: number;
  updatedAt: string;
  updatedEpoch: number;
  commentCount: number;
  dislikes: number;
  likes: number;
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
}: ProposalHeaderProps) => {
  return (
    <div>
      <div className="flex items-center gap-4 mb-4 text-center w-full">
        <ProposalTypeBadge type={type} />
        <span className="text-sm text-muted-foreground">
          Governance Action Type
        </span>
        <Badge className="text-sm ml-auto bg-green-100 text-green-800">
          {isActive ? "ACTIVE" : "INACTIVE"}
        </Badge>
      </div>

      <h2 className="text-2xl font-bold mb-4">{title}</h2>

      <div className="grid grid-cols-3 justify-between sm:space-y-0 text-sm gap-4">
        <div className="flex items-center space-x-2">
          <ThumbsUpIcon className="h-4 w-4" />
          <span>{likes} likes</span>
        </div>
        <div className="flex items-center space-x-2">
          <ThumbsDownIcon className="h-4 w-4" />
          <span>{dislikes} dislikes</span>
        </div>
        <div className="flex items-center space-x-2">
          <MessageSquareIcon className="h-4 w-4" />
          <span>{commentCount} comments</span>
        </div>

        <div className="col-span-full space-y-2">
          <div className="flex items-center space-x-2">
            <CalendarIcon className="h-4 w-4" />
            <span>
              Submitted:{" "}
              <span className="font-semibold">
                {formatDate(createdDate, createdEpoch)}
              </span>
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <CalendarIcon className="h-4 w-4" />
            <span>
              Updated:{" "}
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
