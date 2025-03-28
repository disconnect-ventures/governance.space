"use client";

import React, { useMemo } from "react";
import { Card, CardContent } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { buttonVariants } from "~/components/ui/button";
import {
  Clock,
  Calendar,
  Clock as ClockIcon,
  CircleCheckBig,
  CircleAlert,
} from "lucide-react";
import { getActionIdUrl, GovernanceAction } from "~/lib/governance-actions";
import { Metadata } from "~/lib/metadata";
import Link from "~/components/features/Link";
import { useTranslation } from "~/hooks/use-translation/use-translation";
import { formatCamelCase, formatDate } from "~/lib/utils";
import { twMerge } from "tailwind-merge";

const getTypeLabel = (type: GovernanceAction["type"]) => {
  return formatCamelCase(type);
};

const getStatusBadge = (
  status: "Pending" | "In Progress" | "Completed",
  className?: string
) => {
  const variants = {
    Pending:
      "bg-yellow-500/10 text-yellow-400 dark:bg-yellow-500/20 dark:text-yellow-300",
    "In Progress":
      "bg-blue-500/10 text-blue-400 dark:bg-blue-500/20 dark:text-blue-300",
    Completed:
      "bg-green-500/10 text-green-400 dark:bg-green-500/20 dark:text-green-300",
  };

  const icons = {
    Pending: CircleAlert,
    "In Progress": ClockIcon,
    Completed: CircleCheckBig,
  };
  const Icon = icons[status];

  return (
    <Badge
      variant="secondary"
      className={`rounded-full space-x-2 p-2 px-4 ${variants[status]} hover:${variants[status]} ${className}`}
    >
      <Icon className="h-4 w-4" />
      <span>{status}</span>
    </Badge>
  );
};

export const GovernanceActionCard = ({
  action,
  status,
  metadata,
  className,
}: {
  action: GovernanceAction;
  metadata: Metadata | null;
  status: "In Progress" | "Completed";
  className?: string;
}) => {
  const { dictionary } = useTranslation();
  // const views = 404; // TODO
  const title = useMemo(
    () => (action.title || metadata ? metadata?.metadata?.title : "No title"),
    [action, metadata]
  );
  const abstract = useMemo(
    () => action.abstract || metadata?.metadata?.abstract,
    [action, metadata]
  );

  return (
    <Card className={twMerge("mb-4", className)}>
      <CardContent className="pt-6">
        <div className="flex items-center gap-2 mb-2">
          <Badge
            variant="outline"
            className="font-normal bg-blue-200 dark:bg-blue-900/50 p-2 dark:text-blue-300"
          >
            {getTypeLabel(action.type)}
          </Badge>
          {getStatusBadge(status, "ml-auto")}
        </div>

        <h3 className="text-lg font-semibold mb-2 dark:text-gray-100">
          {title}
        </h3>

        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
          {abstract}
        </p>

        <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>
              Submitted:{" "}
              <span className="font-semibold">
                {formatDate(action.createdDate, action.createdEpochNo)}
              </span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>
              Expires:{" "}
              <span className="font-semibold">
                {formatDate(action.expiryDate, action.expiryEpochNo)}
              </span>
            </span>
          </div>
        </div>

        <div className="text-gray-600 dark:text-gray-400 space-y-2 mb-4">
          <div className="text-sm">
            <span className="font-semibold">Legacy Governance Action ID:</span>
            <div className="font-mono text-xs break-all">{action.txHash}</div>
          </div>
        </div>

        <Link
          href={`/governance/${getActionIdUrl(action.txHash, action.index.toString())}`}
          className={`${buttonVariants()} w-full`}
        >
          {dictionary.general.viewDetailsAndVote}
        </Link>
      </CardContent>
    </Card>
  );
};
