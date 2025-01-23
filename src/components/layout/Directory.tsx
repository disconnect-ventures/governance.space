"use client";
import React, { useCallback, useMemo, useState } from "react";
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
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

type DirectoryProps = {
  container?: (children: React.ReactNode) => React.ReactNode;
  rows: React.ReactNode[];
};

export function Directory({ rows, container }: DirectoryProps) {
  const [currentPage, setCurrentPage] = useState(1); // TODO: This pagination should be done through query params and avoid making this a client component
  const itemsPerPage = useMemo(() => 10, []);
  const totalPages = useMemo(
    () => Math.ceil(rows.length / itemsPerPage),
    [rows, itemsPerPage]
  );
  const startIndex = useMemo(
    () => (currentPage - 1) * itemsPerPage,
    [currentPage, itemsPerPage]
  );
  const endIndex = useMemo(
    () => startIndex + itemsPerPage,
    [startIndex, itemsPerPage]
  );
  const currentActions = useMemo(
    () => rows.slice(startIndex, endIndex),
    [rows, startIndex, endIndex]
  );

  const getPageNumbers = useCallback(() => {
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
  }, [totalPages, currentPage]);

  const handlePageClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, page: number) => {
      e.preventDefault();
      setCurrentPage(page);
    },
    []
  );

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
          <div className="flex gap-2">
            <Button variant="outline" className="w-full">
              <ArrowUpDown className="h-4 w-4" /> Sort
            </Button>
            <Button variant="outline" className="w-full">
              <Filter className="h-4 w-4" /> Filter
            </Button>
          </div>
        </div>

        {container ? (
          container(currentActions)
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 ">
            {currentActions}
          </div>
        )}

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

type TableDirectoryProps = DirectoryProps & {
  headers: string[];
};

export function TableDirectory({ headers, rows }: TableDirectoryProps) {
  return (
    <Directory
      container={(children) => (
        <Table className="bg-background">
          <TableHeader>
            <TableRow>
              {headers.map((header, index) => (
                <TableHead key={index} className="whitespace-nowrap text-center">{header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>{children}</TableBody>
        </Table>
      )}
      rows={rows}
    ></Directory>
  );
}
