import { Badge } from "~/components/ui/badge";
import { DRep } from "~/lib/dreps";
import clsx from "clsx";
import { Dictionary } from "~/config/dictionaries";

type ProfileStatusProps = {
  drep: DRep;
  className?: string;
  translations: Dictionary["general"];
};

export function ProfileStatus({
  drep,
  className,
  translations,
}: ProfileStatusProps) {
  const statusMap = {
    Active: {
      text: translations.active,
      className: "bg-green-500/20 text-green-500",
    },
    Retired: {
      text: translations.retired,
      className: "bg-yellow-500/20 text-yellow-500",
    },
    Inactive: {
      text: translations.inactive,
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
