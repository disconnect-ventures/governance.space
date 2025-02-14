"use client";

import React from "react";
import { Card, CardContent } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { buttonVariants } from "~/components/ui/button";
import {
  Clock,
  Calendar,
  EyeIcon,
  ClockIcon,
  CircleCheckBig,
  CircleAlert,
} from "lucide-react";
import { GovernanceAction } from "~/lib/governance-actions";
import { GovernanceActionMetadata } from "~/lib/metadata";
import Link from "~/components/features/Link";
import { useTranslation } from "~/hooks/use-translation/use-translation";

const getTypeLabel = (type: GovernanceAction["type"]) => {
  switch (type) {
    case "HardForkInitiation":
      return "Hard Fork";
    default:
      return type;
  }
};

const getStatusBadge = (
  status: "Pending" | "In Progress" | "Completed",
  className?: string
) => {
  const variants = {
    Pending: "bg-yellow-100 text-yellow-800",
    "In Progress": "bg-blue-100 text-blue-800",
    Completed: "bg-green-100 text-green-800",
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

const formatDate = (date: string, epoch: number) => {
  const formattedDate = new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  return `${formattedDate} (Epoch ${epoch})`;
};

export const GovernanceActionCard = ({
  action,
  status,
  metadata,
}: {
  action: GovernanceAction;
  metadata: GovernanceActionMetadata;
  status: "Pending" | "In Progress" | "Completed";
}) => {
  const views = 404; // TODO
  const standard = "CIP-129"; // TODO
  const governanceActionId =
    "gov_action1pvv5wmjqhwa4u85vu9f4ydmzu2mgt8n7et967ph2urhx53r70xusqnmm525"; // TODO
  const { dictionary } = useTranslation();

  return (
    <Card className="mb-4">
      <CardContent className="pt-6">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="outline" className="font-normal bg-blue-200 p-2">
            {getTypeLabel(action.type)}
          </Badge>
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center text-xs text-gray-600">
              <EyeIcon className="h-4" />
              {views}
            </div>
          </div>
          {getStatusBadge(status, "ml-auto")}
        </div>

        <h3 className="text-lg font-semibold mb-2">{metadata.title}</h3>

        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {metadata.abstract}
        </p>

        <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600">
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

        <div className="text-gray-600 space-y-2 mb-4">
          <div className="text-sm">
            <span className="font-semibold">Governance Action ID:</span>
            <div className="font-mono text-xs break-all">{action.txHash}</div>
          </div>
          <div className="text-sm">
            <span className="font-semibold">
              ({standard}) Governance Action ID:
            </span>
            <div className="font-mono text-xs break-all">
              {governanceActionId}
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <Link
            href={`/governance/${action.id}`}
            className={` ${buttonVariants()} `}
          >
            {dictionary.general["view-details-and-vote"]}
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
