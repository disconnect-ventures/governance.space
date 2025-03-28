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
import { Checkbox } from "../ui/checkbox";
import { useLocale } from "~/hooks/use-locale";
import { localizePath } from "~/lib/utils";
import { useTranslation } from "~/hooks/use-translation/use-translation";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export type DirectoryParamOption = {
  value: string;
  label: string;
};

export type DirectoryProps = {
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
}: DirectoryProps) {
  const { page = 0, pageSize = 15, totalResults = 0 } = params;
  const [search, setSearch] = useState(params.search ?? "");
  const isTyping = useRef(false);
  const searchUpdateTimeout = useRef<NodeJS.Timeout | null>(null);

  const router = useRouter();
  const { locale } = useLocale();
  const { dictionary } = useTranslation();

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
                    {dictionary.general.sort}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 flex flex-col gap-2 ml-4 mx-4 md:mx-8">
                  <span className="font-semibold">
                    {sortPopoverTitle || dictionary.general.sort}
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
                    <Filter className="h-4 w-4" /> {dictionary.general.filter}
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
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href={getNewUrl({ page: Math.max(page - 1, 0).toString() })}
                  className={page === 0 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>

              {getPageNumbers().map((pageNumber, index) => (
                <PaginationItem key={index}>
                  {pageNumber === "..." ? (
                    <PaginationEllipsis />
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
