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
import { usePathname, useRouter } from "next/navigation";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";

export type DirectorySortOption = {
  value: string;
  label: string;
};

export type DirectoryProps = {
  container?: (children: React.ReactNode) => React.ReactNode;
  rows: React.ReactNode[];
  searchPlaceholder: string;
  params: DirectorySearchParams;
  sortOptions?: Array<DirectorySortOption>;
};

export type DirectorySearchParams<S = string, F = string[]> = {
  page?: number;
  pageSize?: number;
  totalResults?: number;
  sort?: S;
  filters?: F;
};

export function Directory({
  rows,
  container,
  params,
  searchPlaceholder,
  sortOptions,
}: DirectoryProps) {
  const { page = 0, pageSize = 15, totalResults = 0 } = params;
  const router = useRouter();
  const totalPages = useMemo(
    () => Math.ceil(totalResults / pageSize),
    [totalResults, pageSize]
  );
  const pathname = usePathname();
  const query: Map<string, string | string[]> = useMemo(
    () =>
      new Map(
        Object.entries(params).map(([key, value]) => [
          key,
          Array.isArray(value) ? value : String(value),
        ])
      ),
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

  const getNewUrl = useCallback(
    (newParams: Map<string, string | string[]>) => {
      const newQuery = new Map(query);

      for (const [key, value] of newParams.entries()) {
        newQuery.set(key, value);
      }

      const newParamString = Array.from(newQuery.entries())
        .map(([key, value]) =>
          Array.isArray(value)
            ? value.map((v) => `${key}=${v}`).join("&")
            : `${key}=${value}`
        )
        .join("&");

      return pathname + `?${newParamString}`;
    },
    [query, pathname]
  );

  const setSortParam = useCallback(
    (sortValue: string) => {
      const newUrl = getNewUrl(new Map([["sort", sortValue]]));
      router.push(newUrl);
    },
    [router, getNewUrl]
  );

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
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">
                  <ArrowUpDown className="h-4 w-4" /> Sort
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 flex flex-col gap-2">
                <span className="font-semibold">Sort</span>
                <RadioGroup defaultValue={params.sort}>
                  {sortOptions?.map(({ label, value }) => (
                    <div key={value} className="flex items-center space-x-2">
                      <RadioGroupItem
                        id={value}
                        value={value}
                        onClick={() => setSortParam(value)}
                      />
                      <Label htmlFor={value}>{label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </PopoverContent>
            </Popover>
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

export function TableDirectory({ headers, ...props }: TableDirectoryProps) {
  return (
    <Directory
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
      {...props}
    ></Directory>
  );
}
