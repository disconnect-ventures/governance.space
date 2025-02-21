"use client";
import React from "react";
import { TableCell, TableRow } from "~/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { DirectorySearchParams, TableDirectory } from "~/components/layout/Directory";
import { GlobeIcon, LinkedinIcon, SquareCheckIcon, TwitterIcon, XSquareIcon } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import Link from "~/components/features/Link";
import clsx from "clsx";
import { useTranslation } from "~/hooks/use-translation/use-translation";

export interface CommitteeMember {
  url: string;
  avatar: string;
  name: string;
  committee: string;
  committeeBadgeColor: string;
  member: {
    name: string;
    email: string;
    avatar: string;
  };
  role: string;
  country: string;
  dRep: boolean;
  sPO: boolean;
  links: {
    website: string;
    twitter: string;
    linkedIn: string;
  };
}

export type CommitteeMembersDirectoryProps = {
  committeeMembers: Array<CommitteeMember>;
  params: DirectorySearchParams;
};

export const CommitteeMembersDirectory = ({
  committeeMembers,
  params,
}: CommitteeMembersDirectoryProps) => {
  const colorMap = {
    blue: "bg-blue-500/10 text-blue-500 dark:bg-blue-500/20 dark:text-blue-400 hover:bg-blue-500/20 dark:hover:bg-blue-500/30",
    yellow:
      "bg-yellow-500/10 text-yellow-500 dark:bg-yellow-500/20 dark:text-yellow-400 hover:bg-yellow-500/20 dark:hover:bg-yellow-500/30",
    green:
      "bg-green-500/10 text-green-500 dark:bg-green-500/20 dark:text-green-400 hover:bg-green-500/20 dark:hover:bg-green-500/30",
    red: "bg-red-500/10 text-red-500 dark:bg-red-500/20 dark:text-red-400 hover:bg-red-500/20 dark:hover:bg-red-500/30",
  };

  const {
    dictionary: { pageCommittees },
  } = useTranslation();

  return (
    <TableDirectory
      showParams={false}
      searchPlaceholder="Search members..."
      headers={[
        pageCommittees.groups,
        pageCommittees.committee,
        pageCommittees.member,
        pageCommittees.role,
        pageCommittees.country,
        pageCommittees.drep,
        pageCommittees.spo,
        pageCommittees.links,
      ]}
      params={params}
      rows={committeeMembers.map((committee, index) => (
        <TableRow key={index}>
          <TableCell>
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={committee.avatar ?? ""} />
                <AvatarFallback className="bg-muted text-muted-foreground">
                  {committee.name?.substring(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div>
                <Link
                  href={committee.url}
                  target="_blank"
                  className="font-medium whitespace-nowrap text-foreground hover:underline"
                >
                  {committee.name}
                </Link>
              </div>
            </div>
          </TableCell>
          <TableCell>
            <Badge
              className={clsx(
                "w-full rounded-full px-4 whitespace-nowrap",
                colorMap[committee.committeeBadgeColor as keyof typeof colorMap]
              )}
            >
              <span className="mx-auto">{committee.committee}</span>
            </Badge>
          </TableCell>
          <TableCell>
            <div className="flex gap-2 items-center">
              <Avatar className="h-8 w-8">
                <AvatarImage src={committee.member.avatar ?? ""} />
                <AvatarFallback className="bg-muted text-muted-foreground">
                  {committee.member.name?.substring(0, 2)}
                </AvatarFallback>
              </Avatar>

              <div>
                <div className="font-medium text-foreground">{committee.member.name}</div>
                <div className="text-sm text-muted-foreground">
                  <a
                    className="hover:underline"
                    href={`mailto:${committee.member.email}`}
                    target="_blank"
                  >
                    {committee.member.email}
                  </a>
                </div>
              </div>
            </div>
          </TableCell>
          <TableCell className="text-foreground">{committee.role}</TableCell>
          <TableCell className="whitespace-nowrap text-foreground">{committee.country}</TableCell>
          <TableCell>
            {committee.dRep ? (
              <SquareCheckIcon className="h-5 w-5 text-green-500" />
            ) : (
              <XSquareIcon className="h-5 w-5 text-red-500" />
            )}
          </TableCell>
          <TableCell>
            {committee.sPO ? (
              <SquareCheckIcon className="h-5 w-5 text-green-500" />
            ) : (
              <XSquareIcon className="h-5 w-5 text-red-500" />
            )}
          </TableCell>
          <TableCell>
            <div className="flex items-center gap-2 text-muted-foreground">
              {committee.links.website && (
                <Link
                  href={committee.links.website}
                  target="_blank"
                  className="hover:text-foreground"
                >
                  <GlobeIcon className="h-4 w-4" />
                </Link>
              )}
              {committee.links.linkedIn && (
                <Link
                  href={committee.links.linkedIn}
                  target="_blank"
                  className="hover:text-foreground"
                >
                  <LinkedinIcon className="h-4 w-4" />
                </Link>
              )}
              {committee.links.twitter && (
                <Link
                  href={committee.links.twitter}
                  target="_blank"
                  className="hover:text-foreground"
                >
                  <TwitterIcon className="h-4 w-4" />
                </Link>
              )}
            </div>
          </TableCell>
        </TableRow>
      ))}
    ></TableDirectory>
  );
};
