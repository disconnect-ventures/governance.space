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
import { formatCamelCase, formatDate } from "~/lib/utils";
import { twMerge } from "tailwind-merge";
import { Dictionary } from "~/config/dictionaries";

const getTypeLabel = (
  _type: GovernanceAction["type"],
  actionTypeLabel: string,
  className?: string
) => {
  return (
    <Badge
      variant="outline"
      className={`font-normal bg-blue-200 dark:bg-blue-900/50 p-2 dark:text-blue-300 ${className}`}
    >
      {actionTypeLabel}
    </Badge>
  );
};

const getStatusBadge = (
  status: "Pending" | "In Progress" | "Completed",
  statusLabel: string,
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
      <span>{statusLabel}</span>
    </Badge>
  );
};

type GovernanceActionCardProps = {
  action: GovernanceAction;
  status: "In Progress" | "Completed";
  metadata: Metadata | null;
  className?: string;
  translations: Pick<Dictionary, "general" | "pageGovernanceActions">;
};

export const GovernanceActionCard = ({
  action,
  status,
  metadata,
  className,
  translations,
}: GovernanceActionCardProps) => {
  const title = useMemo(
    () =>
      action.title || metadata
        ? metadata?.metadata?.title
        : translations.general.noTitle,
    [action, metadata, translations.general.noTitle]
  );
  const abstract = useMemo(
    () => action.abstract || metadata?.metadata?.abstract,
    [action, metadata]
  );

  const actionTypeLabel =
    translations.pageGovernanceActions[
      (action.type.charAt(0).toLowerCase() +
        action.type.slice(1)) as keyof typeof translations.pageGovernanceActions
    ] || formatCamelCase(action.type);

  const statusLabel =
    status === "Completed"
      ? translations.general.completed
      : translations.general.inProgress;

  return (
    <Card className={twMerge("mb-4", className)}>
      <CardContent className="pt-6">
        <div className="flex items-center gap-2 mb-2">
          {getTypeLabel(action.type, actionTypeLabel)}
          {getStatusBadge(status, statusLabel, "ml-auto")}
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
              {translations.pageGovernanceActions.submitted}:{" "}
              <span className="font-semibold">
                {formatDate(action.createdDate, action.createdEpochNo)}
              </span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>
              {translations.general.expires}:{" "}
              <span className="font-semibold">
                {formatDate(action.expiryDate, action.expiryEpochNo)}
              </span>
            </span>
          </div>
        </div>

        <div className="text-gray-600 dark:text-gray-400 space-y-2 mb-4">
          <div className="text-sm">
            <span className="font-semibold">
              {translations.pageGovernanceActions.legacyGovernanceActionID}
              :{" "}
            </span>
            <div className="font-mono text-xs break-all">{action.txHash}</div>
          </div>
        </div>

        <Link
          href={`/governance/${getActionIdUrl(action.txHash, action.index.toString())}`}
          className={`${buttonVariants()} w-full`}
        >
          {translations.general.viewDetailsAndVote}
        </Link>
      </CardContent>
    </Card>
  );
};
