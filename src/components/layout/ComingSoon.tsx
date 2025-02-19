import React from "react";

type ComingSoonProps = {
  label?: string;
  children: React.ReactNode;
};

const ComingSoon: React.FC<ComingSoonProps> = ({
  children,
  label = "Coming Soon!",
}) => {
  return (
    <div className="relative p-4">
      <div className={"blur-[3px] pointer-events-none"}>{children}</div>
      <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-5 text-gray-600 text-xl font-bold">
        {label}
      </div>
    </div>
  );
};

export default ComingSoon;
