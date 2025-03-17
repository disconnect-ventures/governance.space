"use client";
import React from "react";
import { TableCell, TableRow } from "~/components/ui/table";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { EyeIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { DRep } from "~/lib/dreps";
import { useRouter } from "next/navigation";
import { DirectorySearchParams, TableDirectory } from "~/components/layout/Directory";
import { formatVotingPower, localizePath, truncateMiddle } from "~/lib/utils";
import { useLocale } from "~/hooks/use-locale";
import { ProfileStatus } from "../profile/ProfileStatus";

export type DRepsDirectoryProps = {
  dreps: Array<DRep>;
  params: DirectorySearchParams;
  general: {
    random: string;
    registrationDate: string;
    votingPower: string;
    status: string;
    active: string;
    inactive: string;
    retired: string;
    locale: string;
    details: string;
  };
  pageDreps: {
    search: string;
    drepName: string;
    status: string;
    votingPower: string;
    registrationDate: string;
    actions: string;
  };
};

export const DRepsDirectory = ({ dreps, params, general, pageDreps }: DRepsDirectoryProps) => {
  const router = useRouter();
  const { locale } = useLocale();
  return (
    <TableDirectory
      sortOptions={[
        { value: "Random", label: general.random },
        {
          value: "RegistrationDate",
          label: general.registrationDate,
        },
        { value: "VotingPower", label: general.votingPower },
        { value: "Status", label: general.status },
      ]}
      filterPopoverTitle="DRep Status"
      filterOptions={[
        { value: "Active", label: general.active },
        { value: "Inactive", label: general.inactive },
        { value: "Retired", label: general.retired },
      ]}
      searchPlaceholder={pageDreps.search}
      headers={[
        pageDreps.drepName,
        pageDreps.status,
        pageDreps.votingPower,
        pageDreps.registrationDate,
        pageDreps.actions,
      ]}
      params={params}
      rows={dreps.map((drep) => (
        <TableRow
          key={drep.view}
          onClick={() => router.push(localizePath(locale, `/dreps/${drep.view}`))}
          className="cursor-pointer hover:bg-muted/50"
        >
          <TableCell>
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={drep.imageUrl ?? ""} />
                <AvatarFallback>{drep.givenName?.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium text-foreground">{drep.givenName}</div>
                <div className="text-sm text-muted-foreground">{truncateMiddle(drep.view, 21)}</div>
              </div>
            </div>
          </TableCell>
          <TableCell>
            <ProfileStatus drep={drep} general={general} />
          </TableCell>
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
            {new Date(drep.latestRegistrationDate).toLocaleDateString(general.locale)}
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
