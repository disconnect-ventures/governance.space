"use client";

import React from "react";
import { TableCell, TableRow } from "~/components/ui/table";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import {
  DirectorySearchParams,
  TableDirectory,
} from "~/components/layout/Directory";
import { capitalize } from "~/lib/utils";
import { Badge } from "~/components/ui/badge";
import { CircleCheck, CircleMinusIcon, CircleXIcon } from "lucide-react";
import CopyToClipboard from "../CopyToClipboard";
import { useTranslation } from "~/hooks/use-translation/use-translation";

export interface LiveEvent {
  name: string;
  avatar: string;
  drepId: string;
  vote: "Yes" | "No" | "Abstain";
  votingPower: number;
  voterRole: string;
  type: string;
  submissionEpoch: number;
  transactionId: string;
  registrationDate: number;
}

export type LiveEventsDirectoryProps = {
  liveEvents: Array<LiveEvent>;
  params: DirectorySearchParams;
};

export const LiveEventsDirectory = ({ liveEvents, params }: LiveEventsDirectoryProps) => {
  const getVoteBadge = (vote: LiveEvent["vote"]) => {
    switch (vote) {
      case "Yes":
        return (
          <Badge className="bg-green-500/10 text-green-500 dark:bg-green-500/20 dark:text-green-400 p-2 hover:bg-green-500/20 dark:hover:bg-green-500/30">
            <CircleCheck className="w-4 h-4 mr-1"></CircleCheck>
            {vote}
          </Badge>
        );
      case "No":
        return (
          <Badge className="bg-red-500/10 text-red-500 dark:bg-red-500/20 dark:text-red-400 p-2 hover:bg-red-500/20 dark:hover:bg-red-500/30">
            <CircleXIcon className="w-4 h-4 mr-1"></CircleXIcon>
            {vote}
          </Badge>
        );
      case "Abstain":
        return (
          <Badge className="bg-gray-500/10 text-gray-500 dark:bg-gray-500/20 dark:text-gray-400 p-2 hover:bg-gray-500/20 dark:hover:bg-gray-500/30">
            <CircleMinusIcon className="w-4 h-4 mr-1"></CircleMinusIcon>
            {vote}
          </Badge>
        );
      default:
        return null;
    }
  };

  const {
    dictionary: { pageLiveEvents },
  } = useTranslation();

  return (
    <TableDirectory
      showParams={false}
      searchPlaceholder="Search by name or ID"
      headers={[
        pageLiveEvents.drepName,
        pageLiveEvents.vote,
        pageLiveEvents.votingPower,
        "Voter Role",
        "Type",
        pageLiveEvents.submissionEpoch,
        pageLiveEvents.transaction,
        "Registration Date",
      ]}
      params={params}
      rows={liveEvents.map((liveEvent, index) => {
        const registrationDate = new Date(liveEvent.registrationDate);
        return (
          <TableRow key={index}>
            <TableCell className="flex items-center gap-2 max-w-[200px]">
              <Avatar className="h-8 w-8">
                {/* <AvatarImage src={liveEvent.avatar ?? ""} /> */}
                <AvatarFallback>
                  {liveEvent.name?.substring(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="truncate">
                <div className="font-medium">DRep {index}</div>
                <div className="text-sm text-muted-foreground overflow-hidden text-ellipsis">
                  {liveEvent.drepId}
                </div>
              </div>
            </TableCell>
            <TableCell className="text-center">{getVoteBadge(liveEvent.vote)}</TableCell>
            <TableCell className="text-right">
              <Badge className="bg-purple-500/10 text-purple-500 dark:bg-purple-500/20 dark:text-purple-400 rounded-full hover:bg-purple-500/20 dark:hover:bg-purple-500/30">
                <span className="mr-1">₳</span>
                {liveEvent.votingPower.toLocaleString()}
              </Badge>
            </TableCell>
            <TableCell className="text-center text-foreground">{liveEvent.voterRole}</TableCell>
            <TableCell className="text-center">
              <Badge className="bg-blue-500/10 text-blue-500 dark:bg-blue-500/20 dark:text-blue-400 rounded-full hover:bg-blue-500/20 dark:hover:bg-blue-500/30">
                {capitalize(liveEvent.type)}
              </Badge>
            </TableCell>
            <TableCell className="text-center text-foreground">
              {liveEvent.submissionEpoch.toLocaleString()}
            </TableCell>
            <TableCell className="text-center">
              <div className="flex gap-1 items-center">
                <div className="text-ellipsis w-32 overflow-hidden text-foreground">
                  {liveEvent.transactionId}
                </div>
                <CopyToClipboard value={liveEvent.transactionId} />
              </div>
            </TableCell>
            <TableCell className="text-center">
              <div className="flex gap-2 items-center">
                <span className="whitespace-nowrap text-foreground">
                  {registrationDate.toLocaleDateString()}
                </span>
                <span className="whitespace-nowrap text-muted-foreground">
                  {registrationDate.toLocaleTimeString()}
                </span>
              </div>
            </TableCell>
          </TableRow>
        );
      })}
    ></TableDirectory>
  );
};
