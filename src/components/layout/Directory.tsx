"use client";
import React, { useCallback, useMemo } from "react";
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
import { usePathname, useSearchParams } from "next/navigation";

export type DirectoryProps = {
  container?: (children: React.ReactNode) => React.ReactNode;
  rows: React.ReactNode[];
  totalResults: number;
  searchPlaceholder: string;
  page: number;
  pageSize: number;
};

export function Directory({
  rows,
  container,
  totalResults,
  page,
  pageSize,
  searchPlaceholder,
}: DirectoryProps) {
  const totalPages = useMemo(
    () => Math.ceil(totalResults / pageSize),
    [totalResults, pageSize]
  );
  const pathname = usePathname();
  const params = useSearchParams();
  const query: Map<string, string | string[]> = useMemo(
    () => new Map(params),
    [params]
  );

  // TODO: simplify logic here
  const getPageNumbers = useCallback(() => {
    const pages = [];
    const buffer = 2;
    for (let i = 0; i < totalPages; i++) {
      if (i === 0 || Math.abs(page - i) < buffer) {
        pages.push(i);
      } else {
        pages.push("...");
      }
    }
    return [
      ...new Set(pages),
      ...(totalPages - page > buffer && page > buffer ? ["..."] : []),
      ...(totalPages - page > buffer ? [totalPages - 1] : []),
    ];
  }, [totalPages, page]);

  const getNewUrl = (newParams: Map<string, string | string[]>) => {
    const newQuery = new Map(query);
    newParams.entries().forEach(([key, value]) => newQuery.set(key, value));
    const newParamString = [...newQuery.entries()]
      .map(([key, value]) =>
        Array.isArray(value)
          ? value.map((v) => `${key}=${v}`).join("&")
          : `${key}=${value}`
      )
      .join("&");
    return pathname + `?${newParamString}`;
  };

  return (
    <Card className="w-full mx-auto shadow-none border-none bg-gray-100">
      <CardContent className="p-0">
        <div className="flex flex-col sm:flex-row sm:items-center gap-x-4 gap-y-2 mb-6">
          <div className="flex-1">
            <Input
              placeholder={searchPlaceholder}
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
          container(rows)
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 ">{rows}</div>
        )}

        <div className="mt-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href={getNewUrl(
                    new Map([["page", Math.max(page - 1, 0).toString()]])
                  )}
                  className={page === 0 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>

              {getPageNumbers().map((pageNumber, index) => (
                <PaginationItem key={index}>
                  {pageNumber === "..." ? (
                    <PaginationEllipsis />
                  ) : (
                    <PaginationLink
                      href={getNewUrl(
                        new Map([["page", pageNumber.toString()]])
                      )}
                      isActive={page === pageNumber}
                    >
                      {pageNumber}
                    </PaginationLink>
                  )}
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  href={getNewUrl(
                    new Map([
                      ["page", Math.min(page + 1, totalPages - 1).toString()],
                    ])
                  )}
                  className={
                    page === totalPages - 1
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

export function TableDirectory({
  headers,
  rows,
  pageSize,
  page,
  searchPlaceholder,
  totalResults,
}: TableDirectoryProps) {
  return (
    <Directory
      pageSize={pageSize}
      page={page}
      searchPlaceholder={searchPlaceholder}
      container={(children) => (
        <Table className="bg-background">
          <TableHeader>
            <TableRow>
              {headers.map((header, index) => (
                <TableHead
                  key={index}
                  className="whitespace-nowrap text-center"
                >
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>{children}</TableBody>
        </Table>
      )}
      rows={rows}
      totalResults={totalResults}
    ></Directory>
  );
}
