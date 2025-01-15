"use client";
import React, { useState } from "react";
import { Card, CardContent } from "~/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import {
  ArrowUpDown,
  Filter,
  Star,
  MessageSquare,
  Globe,
  Users,
  EyeIcon,
} from "lucide-react";
import clsx from "clsx";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination";
import { DRep } from "~/lib/dreps";

export type DRepsDirectoryProps = {
  dreps: Array<DRep>;
};

export const DRepsDirectory = ({ dreps }: DRepsDirectoryProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(dreps.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentDreps = dreps.slice(startIndex, endIndex);

  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pages.push(i);
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        pages.push("...");
      }
    }
    return [...new Set(pages)];
  };

  // Handle page change
  const handlePageClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    page: number
  ) => {
    e.preventDefault();
    setCurrentPage(page);
  };

  return (
    <Card className="w-full max-w-7xl mx-auto shadow-none border-none bg-gray-100">
      <CardContent className="p-0">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="p-2 rounded-full bg-gray-300">
              <Users className="h-6 w-6" />
            </div>
            <h1 className="text-4xl font-bold">DReps Directory</h1>
            <Badge
              variant="secondary"
              className="bg-gray-100 border-primary p-2 rounded-full"
            >
              259 registered DReps
            </Badge>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1">
            <Input
              placeholder="Search DReps by name or ID"
              className="w-full bg-background"
            />
          </div>
          <Button variant="outline" className="gap-2">
            <ArrowUpDown className="h-4 w-4" /> Sort
          </Button>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" /> Filter
          </Button>
        </div>

        <Table className="bg-background">
          <TableHeader>
            <TableRow>
              <TableHead>DRep name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Voting Power</TableHead>
              <TableHead>Social</TableHead>
              <TableHead>Delegators</TableHead>
              <TableHead>Influence Power</TableHead>
              <TableHead>Voting</TableHead>
              <TableHead>Registration Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentDreps?.map((drep) => (
              <TableRow key={drep.drepId}>
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
                      drep.status === "Retired" &&
                        "bg-yellow-100 text-yellow-800",
                      drep.status === "Inactive" && "bg-red-100 text-red-800"
                    )}
                  >
                    {drep.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-blue-600">
                  {drep.votingPower}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <MessageSquare className="h-4 w-4 text-gray-400" />
                    <Globe className="h-4 w-4 text-gray-400" />
                  </div>
                </TableCell>
                <TableCell>{/** drep.delegators */}</TableCell>
                <TableCell>{drep.votingPower}</TableCell>
                <TableCell className="text-blue-600">
                  {/** drep.voting */}
                </TableCell>
                <TableCell>{drep.latestRegistrationDate}</TableCell>
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
          </TableBody>
        </Table>
        <div className="mt-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href={`#page=${Math.max(currentPage - 1, 1)}`}
                  onClick={(e) =>
                    handlePageClick(e, Math.max(currentPage - 1, 1))
                  }
                  className={
                    currentPage === 1 ? "pointer-events-none opacity-50" : ""
                  }
                />
              </PaginationItem>

              {getPageNumbers().map((pageNumber, index) => (
                <PaginationItem key={index}>
                  {pageNumber === "..." ? (
                    <PaginationEllipsis />
                  ) : (
                    <PaginationLink
                      href={`#page=${pageNumber}`}
                      onClick={(e) => handlePageClick(e, Number(pageNumber))}
                      isActive={currentPage === pageNumber}
                    >
                      {pageNumber}
                    </PaginationLink>
                  )}
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  href={`#page=${Math.min(currentPage + 1, totalPages)}`}
                  onClick={(e) =>
                    handlePageClick(e, Math.min(currentPage + 1, totalPages))
                  }
                  className={
                    currentPage === totalPages
                      ? "pointer-events-none opacity-50"
                      : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </CardContent>
    </Card>
  );
};
