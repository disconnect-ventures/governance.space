"use client";
import React from "react";
import { TableCell, TableRow } from "~/components/ui/table";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { Star, MessageSquare, Globe, EyeIcon } from "lucide-react";
import clsx from "clsx";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { DRep } from "~/lib/dreps";
import { useRouter } from "next/navigation";
import { TableDirectory } from "~/components/layout/Directory";

export type DRepsDirectoryProps = {
  dreps: Array<DRep>;
};

export const DRepsDirectory = ({ dreps }: DRepsDirectoryProps) => {
  const router = useRouter();

  return (
    <TableDirectory
      searchPlaceholder={"Search DReps by name or ID"}
      headers={[
        "DRep name",
        "Status",
        "Voting Power",
        "Social",
        "Delegators",
        "Influence Power",
        "Voting",
        "Registration Date",
        "Actions",
      ]}
      rows={dreps.map((drep) => (
        <TableRow
          key={drep.drepId}
          onClick={() => router.push(`/dreps/${drep.drepId}`)}
          className="cursor-pointer"
        >
          <TableCell>
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={drep.imageUrl ?? ""} />
                <AvatarFallback>
                  {drep.givenName?.substring(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{drep.givenName}</div>
                <div className="text-sm text-gray-500">{drep.drepId}</div>
              </div>
            </div>
          </TableCell>
          <TableCell>
            <Badge
              variant={drep.status === "Active" ? "default" : "secondary"}
              className={clsx(
                drep.status === "Active" && "bg-green-100 text-green-800",
                drep.status === "Retired" && "bg-yellow-100 text-yellow-800",
                drep.status === "Inactive" && "bg-red-100 text-red-800",
              )}
            >
              {drep.status}
            </Badge>
          </TableCell>
          <TableCell className="text-blue-600">
            <Badge className="bg-[#FAF5FF] text-[#1E40AF]">
              <span className="mr-1">₳</span>
              {new Intl.NumberFormat("en-US", {
                minimumFractionDigits: 3,
                maximumFractionDigits: 3,
              }).format(drep.votingPower)}
            </Badge>
          </TableCell>
          <TableCell>
            <div className="flex gap-2">
              <MessageSquare className="h-4 w-4 text-gray-400" />
              <Globe className="h-4 w-4 text-gray-400" />
            </div>
          </TableCell>
          <TableCell>{/** drep.delegators */}</TableCell>
          <TableCell>{drep.votingPower}</TableCell>
          <TableCell className="text-blue-600">{/** drep.voting */}</TableCell>
          <TableCell>
            {new Date(drep.latestRegistrationDate)
              .toLocaleDateString("fr-CA")
              .replace(/-/g, "/")}
          </TableCell>
          <TableCell>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-gray-400" />
              <Button variant="secondary" size="sm" className="gap-1">
                <EyeIcon className="h-4 w-4" /> Details
              </Button>
            </div>
          </TableCell>
        </TableRow>
      ))}
    ></TableDirectory>
  );
};
