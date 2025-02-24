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

export const LiveEventsDirectory = ({
  liveEvents,
  params,
}: LiveEventsDirectoryProps) => {
  const getVoteBadge = (vote: LiveEvent["vote"]) => {
    switch (vote) {
      case "Yes":
        return (
          <Badge className="bg-green-300 text-green-800 p-2 hover:bg-green-300">
            <CircleCheck className="w-4 h-4 mr-1"></CircleCheck>
            {vote}
          </Badge>
        );
      case "No":
        return (
          <Badge className="bg-red-300 text-red-800 p-2 hover:bg-red-300">
            <CircleXIcon className="w-4 h-4 mr-1"></CircleXIcon>
            {vote}
          </Badge>
        );
      case "Abstain":
        return (
          <Badge className="bg-gray-300 text-gray-800 p-2 hover:bg-gray-300">
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
                <div className="text-sm text-gray-500 overflow-hidden text-ellipsis">
                  {liveEvent.drepId}
                </div>
              </div>
            </TableCell>
            <TableCell className="text-center">
              {getVoteBadge(liveEvent.vote)}
            </TableCell>
            <TableCell className="text-right">
              <Badge className="bg-purple-200 text-purple-800 rounded-full hover:bg-purple-200">
                <span className="mr-1">₳</span>
                {liveEvent.votingPower.toLocaleString()}
              </Badge>
            </TableCell>
            <TableCell className="text-center">{liveEvent.voterRole}</TableCell>
            <TableCell className="text-center">
              <Badge className="bg-blue-200 text-blue-800 rounded-full hover:bg-blue-200">
                {capitalize(liveEvent.type)}
              </Badge>
            </TableCell>
            <TableCell className="text-center">
              {liveEvent.submissionEpoch.toLocaleString()}
            </TableCell>
            <TableCell className="text-center">
              <div className="flex gap-1 items-center">
                <div className="text-ellipsis w-32 overflow-hidden">
                  {liveEvent.transactionId}
                </div>
                <CopyToClipboard value={liveEvent.transactionId} />
              </div>
            </TableCell>
            <TableCell className="text-center">
              <div className="flex gap-2 items-center">
                <span className="whitespace-nowrap">
                  {registrationDate.toLocaleDateString()}
                </span>
                <span className="whitespace-nowrap">
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
