import React from "react";
import { TableCell, TableRow } from "~/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { TableDirectory } from "~/components/layout/Directory";
import {
  GithubIcon,
  GlobeIcon,
  LinkedinIcon,
  ThumbsDownIcon,
  ThumbsUpIcon,
  TwitterIcon,
} from "lucide-react";
import { Badge } from "~/components/ui/badge";
import Link from "next/link";

export interface CommitteeMember {
  avatar: string;
  name: string;
  committee: string;
  member: {
    name: string;
    email: string;
  };
  role: string;
  country: string;
  dRep: boolean;
  sPO: boolean;
  joined: string;
  links: {
    thumbsUp: boolean;
    thumbsDown: boolean;
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
  return (
    <TableDirectory
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
            <Badge className="w-full rounded-full px-4 whitespace-nowrap">
              <span className="mx-auto">{committee.committee}</span>
            </Badge>
          </TableCell>
          <TableCell>
            <div className="flex gap-2 items-center">
              <Avatar className="h-8 w-8">
                {/* <AvatarImage src={committee.avatar ?? ""} /> */}
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
            {<ThumbsUpIcon className="h-5 w-5 text-green-500" />}
          </TableCell>
          <TableCell>
            {<ThumbsDownIcon className="h-5 w-5 text-red-500" />}
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
