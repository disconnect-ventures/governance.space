import React from "react";
import { TableCell, TableRow } from "~/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { TableDirectory } from "~/components/layout/Directory";
import {
  GithubIcon,
  GlobeIcon,
  LinkedinIcon,
  SquareCheckIcon,
  TwitterIcon,
  XSquareIcon,
} from "lucide-react";
import { Badge } from "~/components/ui/badge";
import Link from "next/link";
import clsx from "clsx";

export interface CommitteeMember {
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
  joined: string;
  links: {
    website: string;
    twitter: string;
    github: string;
    linkedIn: string;
  };
}

export type CommitteeMembersDirectoryProps = {
  committeeMembers: Array<CommitteeMember>;
};

export const CommitteeMembersDirectory = ({
  committeeMembers,
}: CommitteeMembersDirectoryProps) => {
  const colorMap = {
    blue: "bg-blue-300 text-blue-600 hover:bg-blue-300 hover:text-blue-600",
    yellow:
      "bg-yellow-300 text-yellow-600 hover:bg-yellow-300 hover:text-yellow-600",
    green:
      "bg-green-300 text-green-600 hover:bg-green-300 hover:text-green-600",
    red: "bg-red-300 text-red-600 hover:bg-red-300 hover:text-red-600",
  };

  return (
    <TableDirectory
      searchPlaceholder="Search members..."
      headers={[
        "Groups",
        "Committee",
        "Member",
        "Role",
        "Country",
        "DRep",
        "SPO",
        "Joined",
        "Links",
      ]}
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
                <div className="font-medium whitespace-nowrap">
                  {committee.name}
                </div>
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
                <AvatarImage src={committee.avatar ?? ""} />
                <AvatarFallback>
                  {committee.member.name?.substring(0, 2)}
                </AvatarFallback>
              </Avatar>

              <div>
                <div className="font-medium">{committee.member.name}</div>
                <div className="text-sm text-gray-500">
                  {committee.member.email}
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
          <TableCell>{committee.joined}</TableCell>
          <TableCell>
            <div className="flex items-center gap-2 text-gray-500">
              <Link href={committee.links.website} target="_blank">
                <GlobeIcon className="h-4 w-4" />
              </Link>
              <Link href={committee.links.linkedIn} target="_blank">
                <LinkedinIcon className="h-4 w-4" />
              </Link>
              <Link href={committee.links.twitter} target="_blank">
                <TwitterIcon className="h-4 w-4" />
              </Link>

              <Link href={committee.links.github} target="_blank">
                <GithubIcon className="h-4 w-4" />
              </Link>
            </div>
          </TableCell>
        </TableRow>
      ))}
    ></TableDirectory>
  );
};
