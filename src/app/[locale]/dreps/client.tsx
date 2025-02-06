"use client";

import { UsersIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  DRepsDirectory,
  DRepsDirectoryProps,
} from "~/components/features/dreps/DRepsDirectory";
import { PageTitle } from "~/components/layout/PageTitle";

interface DRepsDirectoryClientProps {
  dreps: DRepsDirectoryProps["dreps"];
}

export function DRepsDirectoryClient({ dreps }: DRepsDirectoryClientProps) {
  const t = useTranslations("PageDReps");

  return (
    <div className="space-y-4">
      <PageTitle
        title="DReps Directory"
        icon={<UsersIcon />}
        badge="259 registered DReps"
        info={t("long-description")}
      />
      <DRepsDirectory dreps={dreps} />
    </div>
  );
}
