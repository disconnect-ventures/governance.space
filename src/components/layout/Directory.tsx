"use client";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Card, CardContent } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { ArrowUpDown, EyeIcon, Filter, UserIcon } from "lucide-react";
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
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { usePathname, useRouter } from "next/navigation";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { useLocale } from "~/hooks/use-locale";
import { localizePath } from "~/lib/utils";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import { Dictionary } from "~/config/dictionaries";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { Avatar } from "../ui/avatar";
import { Skeleton } from "../ui/skeleton";

export type DirectoryParamOption = {
  value: string;
  label: string;
};

type DirectoryProps = {
  container?: (children: React.ReactNode) => React.ReactNode;
  rows: React.ReactNode[];
  searchPlaceholder: string;
  params: DirectorySearchParams;
  showParams?: boolean;
  sortPopoverTitle?: string;
  filterPopoverTitle?: string;
  sortOptions?: Array<DirectoryParamOption>;
  filterOptions?: Array<DirectoryParamOption>;
  className?: string;
  translations: Pick<Dictionary, "general" | "accessibility">;
};

export type DirectorySearchParams<S = string, F = string[]> = {
  page?: number;
  pageSize?: number;
  totalResults?: number;
  search?: string;
  sort?: S;
  filters?: F;
};

const SEARCH_DEBOUNCE_MS = 200;
const ELLIPSIS = "...";

export function Directory({
  rows,
  container,
  params,
  searchPlaceholder,
  sortPopoverTitle,
  filterPopoverTitle,
  sortOptions,
  filterOptions,
  showParams = true,
  className,
  translations,
}: DirectoryProps) {
  const { page = 0, pageSize = 15, totalResults = 0 } = params;
  const [search, setSearch] = useState(params.search ?? "");
  const isTyping = useRef(false);
  const searchUpdateTimeout = useRef<NodeJS.Timeout | null>(null);

  const router = useRouter();
  const { locale } = useLocale();
  const totalPages = useMemo(
    () => Math.ceil(totalResults / pageSize),
    [totalResults, pageSize]
  );
  const pathname = usePathname();
  const query = useMemo(
    () =>
      new URLSearchParams(
        Object.entries(params)
          .map(([key, value]) => [
            key,
            Array.isArray(value) ? value.join(",") : value.toString(),
          ])
          .filter(([, value]) => Boolean(value))
      ),
    [params]
  );

  const getPageNumbers = useCallback(() => {
    const adjacentPages = 1;
    const pageNumbers = [];

    pageNumbers.push(0);

    if (page - adjacentPages > 1) {
      pageNumbers.push(ELLIPSIS);
    }

    const firstAdjacentPage = Math.max(1, page - adjacentPages);
    const lastAdjacentPage = Math.min(totalPages - 2, page + adjacentPages);

    for (
      let pageIndex = firstAdjacentPage;
      pageIndex <= lastAdjacentPage;
      pageIndex++
    ) {
      pageNumbers.push(pageIndex);
    }

    if (page + adjacentPages < totalPages - 2) {
      pageNumbers.push(ELLIPSIS);
    }

    if (totalPages > 1) {
      pageNumbers.push(totalPages - 1);
    }

    return pageNumbers;
  }, [totalPages, page]);

  const getNewUrl = useCallback(
    (newParams: Record<string, string>) => {
      const newQuery = new URLSearchParams(query);
      for (const [key, value] of Object.entries(newParams)) {
        if (!!value) {
          newQuery.set(key, value);
        } else {
          newQuery.delete(key);
        }
      }
      return localizePath(locale, `${pathname}?${newQuery.toString()}`);
    },
    [query, pathname, locale]
  );

  const setSortParam = useCallback(
    (sortValue: string) => {
      const newUrl = getNewUrl({ sort: sortValue, page: "0" });
      router.push(newUrl);
    },
    [router, getNewUrl]
  );

  const setFilterParam = useCallback(
    (filterValue: string, checked: boolean) => {
      const currentFilters = new Set(query.get("filters")?.split(","));
      if (checked) {
        currentFilters.add(filterValue);
      } else {
        currentFilters.delete(filterValue);
      }

      const newUrl = getNewUrl({
        page: "0",
        filters: Array.from(currentFilters.values()).join(","),
      });
      router.push(newUrl);
    },
    [router, getNewUrl, query]
  );

  const clearSearchDebounceTimeout = useCallback(() => {
    if (searchUpdateTimeout.current) {
      clearTimeout(searchUpdateTimeout.current);
    }
  }, []);

  const setSearchParam = useCallback(
    (newSearch: string) => {
      const newUrl = getNewUrl({ search: newSearch, page: "0" });
      clearSearchDebounceTimeout();
      searchUpdateTimeout.current = null;
      router.push(newUrl);
    },
    [router, getNewUrl, searchUpdateTimeout, clearSearchDebounceTimeout]
  );

  const triggerSearchUpdate = useCallback(
    (search: string) => {
      clearSearchDebounceTimeout();
      searchUpdateTimeout.current = setTimeout(
        () => setSearchParam(search),
        SEARCH_DEBOUNCE_MS
      );
    },
    [searchUpdateTimeout, setSearchParam, clearSearchDebounceTimeout]
  );

  useEffect(() => {
    if (
      !isTyping.current &&
      !searchUpdateTimeout.current &&
      query.get("search") !== search
    ) {
      setSearch(query.get("search") ?? "");
    }
  }, [search, query]);

  useEffect(() => {
    return () => {
      clearSearchDebounceTimeout();
    };
  }, [clearSearchDebounceTimeout]);

  return (
    <Card
      className={twMerge(
        "w-full mx-auto shadow-none border-none bg-card",
        className
      )}
    >
      <CardContent className="p-0">
        {showParams && (
          <div className="flex flex-col sm:flex-row sm:items-center gap-x-4 gap-y-2 mb-6">
            <div className="flex-1">
              <Input
                placeholder={searchPlaceholder}
                className="w-full bg-background"
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  triggerSearchUpdate(event.target.value);
                }}
                onKeyDown={(event) => {
                  isTyping.current = true;
                  if (event.key === "Enter") {
                    setSearchParam(event.currentTarget.value);
                  }
                }}
                onBlur={() => (isTyping.current = false)}
              />
            </div>
            <div className="flex gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full">
                    <ArrowUpDown className="h-4 w-4" />{" "}
                    {translations.general.sort}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 flex flex-col gap-2 ml-4 mx-4 md:mx-8">
                  <span className="font-semibold">
                    {sortPopoverTitle || translations.general.sort}
                  </span>
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
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full">
                    <Filter className="h-4 w-4" /> {translations.general.filter}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 flex flex-col gap-2 mx-4 md:mx-8">
                  <span className="font-semibold">
                    {filterPopoverTitle || "Filter"}
                  </span>
                  {filterOptions?.map(({ label, value }) => (
                    <div key={value} className="flex items-center space-x-2">
                      <Checkbox
                        id={value}
                        value={value}
                        defaultChecked={query
                          .get("filters")
                          ?.split(",")
                          .includes(value)}
                        onCheckedChange={(checked) =>
                          setFilterParam(
                            value,
                            checked === "indeterminate" ? false : checked
                          )
                        }
                      />
                      <Label htmlFor={value}>{label}</Label>
                    </div>
                  ))}
                </PopoverContent>
              </Popover>
            </div>
          </div>
        )}
        {container ? (
          container(rows)
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 ">{rows}</div>
        )}

        <div className="mt-4">
          <Pagination translations={translations.accessibility}>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href={getNewUrl({ page: Math.max(page - 1, 0).toString() })}
                  className={page === 0 ? "pointer-events-none opacity-50" : ""}
                  translations={translations}
                />
              </PaginationItem>

              {getPageNumbers().map((pageNumber, index) => (
                <PaginationItem key={index}>
                  {pageNumber === ELLIPSIS ? (
                    <PaginationEllipsis
                      translations={translations.accessibility}
                    />
                  ) : (
                    <PaginationLink
                      href={getNewUrl({
                        page: pageNumber.toString(),
                      })}
                      isActive={page === pageNumber}
                    >
                      {pageNumber}
                    </PaginationLink>
                  )}
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  href={getNewUrl({
                    page: Math.min(
                      page + 1,
                      Math.max(totalPages - 1, 0)
                    ).toString(),
                  })}
                  className={
                    page === Math.max(totalPages - 1, 0)
                      ? "pointer-events-none opacity-50"
                      : ""
                  }
                  translations={translations}
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
  headerAlign?: "start" | "center" | "end";
};

export function TableDirectory({
  headers,
  headerAlign = "start",
  ...props
}: TableDirectoryProps) {
  return (
    <Directory
      container={(children) => (
        <Table className="bg-background">
          <TableHeader>
            <TableRow>
              {headers.map((header, index) => (
                <TableHead
                  key={index}
                  className={clsx(
                    "whitespace-nowrap",
                    headerAlign === "start"
                      ? "text-start"
                      : headerAlign === "center"
                        ? "text-center"
                        : "text-end"
                  )}
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

export const TableDirectorySkeleton = ({
  translations,
}: {
  translations: Dictionary;
}) => {
  const ROW_COUNT = 20;

  return (
    <Table className="bg-background">
      <TableHeader>
        <TableRow>
          <TableHead>{translations.pageDreps.drepName}</TableHead>
          <TableHead>{translations.general.status}</TableHead>
          <TableHead>{translations.pageDreps.votingPower}</TableHead>
          <TableHead>{translations.pageDreps.social}</TableHead>
          <TableHead>{translations.pageDreps.registrationDate}</TableHead>
          <TableHead>{translations.pageDreps.actions}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: ROW_COUNT }).map((_, i) => (
          <TableRow key={i}>
            <TableCell>
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    <UserIcon className="h-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-16" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-6 w-20 rounded-full" />
            </TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Skeleton className="h-5 w-5 rounded-md" />
                <Skeleton className="h-5 w-5 rounded-md" />
              </div>
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-24" />
            </TableCell>
            <TableCell>
              <Button variant="secondary" size="sm" disabled className="gap-1">
                <EyeIcon className="h-4 w-4" />{" "}
                <Skeleton className="h-4 w-12" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
