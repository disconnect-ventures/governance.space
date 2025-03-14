"use client";
import { Badge } from "~/components/ui/badge";
import { DRep } from "~/lib/dreps";
import clsx from "clsx";
import { useTranslation } from "~/hooks/use-translation/use-translation";

type ProfileStatusProps = {
  drep: DRep;
  className?: string;
};

export function ProfileStatus({ drep, className }: ProfileStatusProps) {
  const {
    dictionary: { general },
  } = useTranslation();

  const statusMap = {
    Active: {
      text: general.active,
      className: "bg-green-500/20 text-green-500",
    },
    Retired: {
      text: general.retired,
      className: "bg-yellow-500/20 text-yellow-500",
    },
    Inactive: {
      text: general.inactive,
      className: "bg-red-500/20 text-red-500",
    },
  };

  const status = statusMap[drep.status] || {
    text: drep.status,
    className: "",
  };

  return (
    <Badge
      variant={drep.status === "Active" ? "default" : "secondary"}
      className={clsx("w-fit", status.className, className)}
    >
      {status.text}
    </Badge>
  );
}
