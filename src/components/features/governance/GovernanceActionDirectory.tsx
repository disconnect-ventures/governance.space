"use client";
// https://www.figma.com/design/bfEklPIeZVRf0P6xC6f1e7/Governance-Space?node-id=34-1870&t=GGJEhGlKd8rVords-4
import React, { useState } from "react";
import { Card, CardContent } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { ArrowUpDown, Filter } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination";
import { GovernanceAction } from "~/lib/governance-actions";
import { GovernanceActionCard } from "./GovernanceActionCard";
import { getMockGovernanceActionMetadata } from "~/lib/mock";

type GovernanceActionDirectoryProps = {
  governanceActions: Array<GovernanceAction>;
};

export function GovernanceActionDirectory({
  governanceActions,
}: GovernanceActionDirectoryProps) {
  const [currentPage, setCurrentPage] = useState(1); // TODO: This pagination should be done through query params and avoid making this a client component
  const itemsPerPage = 10;
  const totalPages = Math.ceil(governanceActions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentActions = governanceActions.slice(startIndex, endIndex);

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
    <Card className="w-full mx-auto shadow-none border-none bg-gray-100">
      <CardContent className="p-0">
        <div className="flex flex-col sm:flex-row sm:items-center gap-x-4 gap-y-2 mb-6">
          <div className="flex-1">
            <Input
              placeholder="Search Actions by name or ID"
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 ">
          {currentActions.map((action, index) => {
            const metadata = getMockGovernanceActionMetadata(); // TODO
            const status = "In Progress"; // TODO
            return (
              <GovernanceActionCard
                key={index}
                action={action}
                status={status}
                metadata={metadata.metadata}
              />
            );
          })}
        </div>

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
}
