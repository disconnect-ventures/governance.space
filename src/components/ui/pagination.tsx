import * as React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "~/lib/utils";
import { ButtonProps, buttonVariants } from "~/components/ui/button";
import Link from "~/components/features/Link";
import { Dictionary } from "~/config/dictionaries";

type PaginationProps = {
  translations: Dictionary["accessibility"];
} & React.ComponentProps<"nav">;

const Pagination = ({ translations, className, ...props }: PaginationProps) => (
  <nav
    role="navigation"
    aria-label={translations.pagination}
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
);
Pagination.displayName = "Pagination";

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-row items-center gap-1", className)}
    {...props}
  />
));
PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
));
PaginationItem.displayName = "PaginationItem";

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<ButtonProps, "size"> &
  React.ComponentProps<typeof Link>;

const PaginationLink = ({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) => (
  <Link
    aria-current={isActive ? "page" : undefined}
    className={cn(
      buttonVariants({
        variant: isActive ? "outline" : "ghost",
        size,
      }),
      className
    )}
    {...props}
  />
);
PaginationLink.displayName = "PaginationLink";

type PaginationPreviousProps = {
  translations: Pick<Dictionary, "general" | "accessibility">;
} & React.ComponentProps<typeof PaginationLink>;

const PaginationPrevious = ({
  translations,
  className,
  ...props
}: PaginationPreviousProps) => (
  <PaginationLink
    aria-label={translations.accessibility.goToPreviousPage}
    size="default"
    className={cn("gap-1 pl-2.5", className)}
    {...props}
  >
    <ChevronLeft className="h-4 w-4" />
    <span>{translations.general.previous}</span>
  </PaginationLink>
);
PaginationPrevious.displayName = "PaginationPrevious";

type PaginationNextProps = {
  translations: Pick<Dictionary, "general" | "accessibility">;
} & React.ComponentProps<typeof PaginationLink>;

const PaginationNext = ({
  translations,
  className,
  ...props
}: PaginationNextProps) => (
  <PaginationLink
    aria-label={translations.accessibility.goToNextPage}
    size="default"
    className={cn("gap-1 pr-2.5", className)}
    {...props}
  >
    <span>{translations.general.next}</span>
    <ChevronRight className="h-4 w-4" />
  </PaginationLink>
);
PaginationNext.displayName = "PaginationNext";

type PaginationEllipsisProps = {
  translations: Dictionary["accessibility"];
} & React.ComponentProps<"span">;

const PaginationEllipsis = ({
  translations,
  className,
  ...props
}: PaginationEllipsisProps) => (
  <span
    aria-hidden
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">{translations.morePages}</span>
  </span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};
