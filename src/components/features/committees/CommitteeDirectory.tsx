"use client";
import React from "react";
import { TableCell, TableRow } from "~/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
  DirectorySearchParams,
  TableDirectory,
} from "~/components/layout/Directory";
import {
  GlobeIcon,
  LinkedinIcon,
  SquareCheckIcon,
  TwitterIcon,
  XSquareIcon,
} from "lucide-react";
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
    blue: "bg-blue-300 text-blue-600 hover:bg-blue-300 hover:text-blue-600",
    yellow:
      "bg-yellow-300 text-yellow-600 hover:bg-yellow-300 hover:text-yellow-600",
    green:
      "bg-green-300 text-green-600 hover:bg-green-300 hover:text-green-600",
    red: "bg-red-300 text-red-600 hover:bg-red-300 hover:text-red-600",
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
                <AvatarFallback>
                  {committee.name?.substring(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div>
                <Link
                  href={committee.url}
                  target="_blank"
                  className="font-medium whitespace-nowrap hover:underline"
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
                <AvatarFallback>
                  {committee.member.name?.substring(0, 2)}
                </AvatarFallback>
              </Avatar>

              <div>
                <div className="font-medium">{committee.member.name}</div>
                <div className="text-sm text-gray-500">
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
          <TableCell>{committee.role}</TableCell>
          <TableCell className="whitespace-nowrap">
            {committee.country}
          </TableCell>
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
            <div className="flex items-center gap-2 text-gray-500">
              {committee.links.website && (
                <Link href={committee.links.website} target="_blank">
                  <GlobeIcon className="h-4 w-4" />
                </Link>
              )}
              {committee.links.linkedIn && (
                <Link href={committee.links.linkedIn} target="_blank">
                  <LinkedinIcon className="h-4 w-4" />
                </Link>
              )}
              {committee.links.twitter && (
                <Link href={committee.links.twitter} target="_blank">
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
