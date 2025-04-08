"use client";
import React from "react";
import { TableCell, TableRow } from "~/components/ui/table";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { EyeIcon, UserIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { DRep } from "~/lib/dreps";
import { useRouter } from "next/navigation";
import {
  DirectorySearchParams,
  TableDirectory,
} from "~/components/layout/Directory";
import { formatVotingPower, localizePath, truncateMiddle } from "~/lib/utils";
import { useLocale } from "~/hooks/use-locale";
import { ProfileStatus } from "../profile/ProfileStatus";
import { Dictionary } from "~/config/dictionaries";

type DRepsDirectoryProps = {
  dreps: Array<DRep>;
  params: DirectorySearchParams;
  translations: Pick<Dictionary, "general" | "pageDreps" | "accessibility">;
};

export const DRepsDirectory = ({
  dreps,
  params,
  translations,
}: DRepsDirectoryProps) => {
  const router = useRouter();
  const { locale } = useLocale();
  return (
    <TableDirectory
      sortOptions={[
        { value: "Random", label: translations.general.random },
        {
          value: "RegistrationDate",
          label: translations.general.registrationDate,
        },
        { value: "VotingPower", label: translations.general.votingPower },
        { value: "Status", label: translations.general.status },
      ]}
      filterPopoverTitle="DRep Status"
      filterOptions={[
        { value: "Active", label: translations.general.active },
        { value: "Inactive", label: translations.general.inactive },
        { value: "Retired", label: translations.general.retired },
      ]}
      searchPlaceholder={translations.pageDreps.search}
      headers={[
        translations.pageDreps.drepName,
        translations.pageDreps.status,
        translations.pageDreps.votingPower,
        translations.pageDreps.registrationDate,
        translations.pageDreps.actions,
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
                  {drep.givenName ? (
                    drep.givenName.substring(0, 2)
                  ) : (
                    <UserIcon className="h-4" />
                  )}
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
          <TableCell>
            <ProfileStatus drep={drep} translations={translations.general} />
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
            {new Date(drep.latestRegistrationDate).toLocaleDateString(
              translations.general.locale
            )}
          </TableCell>
          <TableCell>
            <div className="flex items-center gap-2">
              {/* <Star className="h-4 w-4 text-gray-400" /> */}
              <Button variant="secondary" size="sm" className="gap-1">
                <EyeIcon className="h-4 w-4" /> {translations.general.details}
              </Button>
            </div>
          </TableCell>
        </TableRow>
      ))}
      translations={translations}
    ></TableDirectory>
  );
};
