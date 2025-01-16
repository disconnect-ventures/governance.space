import React from "react";

export type PageTitleProps = {
  title: string;
  icon: React.ReactNode;
  children?: React.ReactNode;
};

export function PageTitle({ title, icon, children }: PageTitleProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex flex-wrap items-center gap-4">
        <div className="p-2 rounded-full bg-gray-300 h-12 w-12 flex items-center justify-center">
          {icon}
        </div>
        <h1 className="text-4xl font-bold">{title}</h1>
        {children}
      </div>
    </div>
  );
}
