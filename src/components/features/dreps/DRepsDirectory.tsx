"use client";
import React from "react";
import { TableCell, TableRow } from "~/components/ui/table";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { EyeIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { DRep } from "~/lib/dreps";
import { useRouter } from "next/navigation";
import {
  DirectorySearchParams,
  TableDirectory,
} from "~/components/layout/Directory";
import { formatVotingPower, localizePath, truncateMiddle } from "~/lib/utils";
import { useLocale } from "~/hooks/use-locale";
import { useTranslation } from "~/hooks/use-translation/use-translation";
import { getDrepStatusBadge } from "../profile/ProfileCard";

export type DRepsDirectoryProps = {
  dreps: Array<DRep>;
  params: DirectorySearchParams;
};

export const DRepsDirectory = ({ dreps, params }: DRepsDirectoryProps) => {
  const router = useRouter();
  const { locale } = useLocale();
  const {
    dictionary: { pageDReps, general },
  } = useTranslation();

  return (
    <TableDirectory
      sortOptions={[
        { value: "Random", label: "Random" },
        {
          value: "RegistrationDate",
          label: "Registration Date (Newest to Oldest)",
        },
        { value: "VotingPower", label: "Voting Power (Higher to Lower)" },
        { value: "Status", label: "Status" },
      ]}
      filterPopoverTitle="DRep Status"
      filterOptions={[
        { value: "Active", label: "Active" },
        { value: "Inactive", label: "Inactive" },
        { value: "Retired", label: "Retired" },
      ]}
      searchPlaceholder={pageDReps.search}
      headers={[
        pageDReps.drepName,
        pageDReps.status,
        pageDReps.votingPower,
        pageDReps.registrationDate,
        pageDReps.actions,
      ]}
      params={params}
      rows={dreps.map((drep) => (
        <TableRow
          key={drep.view}
          onClick={() =>
            router.push(localizePath(locale, `/dreps/${drep.view}`))
          }
          className="cursor-pointer hover:bg-muted/50"
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
                <div className="font-medium text-foreground">
                  {drep.givenName}
                </div>
                <div className="text-sm text-muted-foreground">
                  {truncateMiddle(drep.view, 21)}
                </div>
              </div>
            </div>
          </TableCell>
          <TableCell>{getDrepStatusBadge(drep)}</TableCell>
          <TableCell>
            <Badge className="bg-primary/20 text-primary hover:bg-primary/30">
              <span className="mr-1">₳</span>
              {formatVotingPower(drep.votingPower ?? 0)}
            </Badge>
          </TableCell>
          {/* <TableCell>
            <div className="flex gap-2">
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
              <Globe className="h-4 w-4 text-muted-foreground" />
            </div>
          </TableCell> */}
          {/* <TableCell>* drep.delegators</TableCell> */}
          {/* <TableCell>{drep.votingPower}</TableCell> */}
          <TableCell>
            {new Date(drep.latestRegistrationDate).toLocaleDateString("en-US")}
          </TableCell>
          <TableCell>
            <div className="flex items-center gap-2">
              {/* <Star className="h-4 w-4 text-gray-400" /> */}
              <Button variant="secondary" size="sm" className="gap-1">
                <EyeIcon className="h-4 w-4" /> {general.details}
              </Button>
            </div>
          </TableCell>
        </TableRow>
      ))}
    ></TableDirectory>
  );
};
