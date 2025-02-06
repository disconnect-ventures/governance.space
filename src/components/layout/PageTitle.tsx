import React from "react";
import { Badge } from "../ui/badge";

export type PageTitleProps = {
  title: string;
  badge?: string;
  icon: React.ReactNode;
  children?: React.ReactNode;
};

export function PageTitle({ title, icon, children, badge }: PageTitleProps) {
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
        {children}
      </div>
    </div>
  );
}
