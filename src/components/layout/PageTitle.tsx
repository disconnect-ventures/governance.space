import React from "react";
import { Badge } from "../ui/badge";
import { InfoIcon } from "lucide-react";

export type PageTitleProps = {
  title: string;
  badge?: string;
  icon: React.ReactNode;
  children?: React.ReactNode;
  info?: string;
};

export function PageTitle({
  title,
  icon,
  children,
  badge,
  info,
}: PageTitleProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex flex-wrap items-center gap-4 w-full">
        <div className="p-2 rounded-full bg-gray-300 h-12 w-12 flex items-center justify-center">
          {icon}
        </div>
        <h1 className="text-4xl font-bold">{title}</h1>

        {badge && (
          <Badge
            variant="secondary"
            className="bg-gray-100 border-foreground p-2 rounded-full"
          >
            259 registered DReps
          </Badge>
        )}
        {info && (
          <div className="p-3 bg-gray-200 rounded text-gray-600 w-full">
            <p>
              <span className="inline-flex items-center mr-2">
                <InfoIcon className="w-4 h-4 relative" />
              </span>
              {info}
            </p>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
