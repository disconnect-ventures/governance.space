import { Suspense, useMemo } from "react";
import { Card, CardContent } from "~/components/ui/card";
import { GovernanceAction } from "~/lib/governance-actions";
import { Metadata } from "~/lib/metadata";
import CopyToClipboard from "../CopyToClipboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Markdown } from "../Markdown";
import { Dictionary } from "~/config/dictionaries";
import {
  GovernanceActionStatusBadge,
  GovernanceActionTypeBadge,
} from "./GovernanceActionCard";

type VersionDetailProps = {
  label: string;
  value: string;
  translations: Dictionary["general"];
};

const VersionDetail = ({ label, value, translations }: VersionDetailProps) => (
  <div className="w-64 flex gap-2 items-start flex-col overflow-hidden">
    <p className="text-muted-foreground pr-2">{label}:</p>
    <div className="w-full flex gap-2 items-center">
      <p className="font-bold w-full overflow-hidden text-ellipsis">{value}</p>
      <CopyToClipboard value={value} translations={translations} />
    </div>
  </div>
);

const InfoTab = async (value: string, text: string) => (
  <Suspense fallback={null}>
    <TabsContent
      value={value}
      className="min-h-40vh h-full max-h-[60vh] overflow-y-auto"
    >
      <Markdown content={text} />
    </TabsContent>
  </Suspense>
);

type GovernanceHeaderProps = {
  action: GovernanceAction;
  metadata: Metadata | null;
  translations: Pick<
    Dictionary,
    "general" | "pageGovernanceActions" | "pageGovernanceActionsDetails"
  >;
};

export const GovernanceHeader = ({
  action,
  metadata,
  translations,
}: GovernanceHeaderProps) => {
  const title = useMemo(
    () =>
      action.title || metadata
        ? metadata?.metadata.title
        : translations.general.noTitle,
    [action, metadata, translations.general.noTitle]
  );
  const abstract = useMemo(
    () => action.abstract || metadata?.metadata.abstract,
    [action, metadata]
  );
  const motivation = useMemo(
    () => action.motivation || metadata?.metadata.motivation,
    [action, metadata]
  );
  const rationale = useMemo(
    () => action.rationale || metadata?.metadata.rationale,
    [action, metadata]
  );
  const isExpired = useMemo(
    () => new Date(action.expiryDate) < new Date(),
    [action]
  );
  const actionId = `${action.txHash}#${action.index}`;
  const prevActionId = action.prevGovActionTxHash
    ? `${action.prevGovActionTxHash}#${action.prevGovActionTxHash}`
    : null;

  return (
    <CardContent className="p-6">
      <div className="flex items-center gap-4 mb-4 text-center w-full">
        <GovernanceActionTypeBadge
          translations={translations}
          type={action.type}
        />
        <span className="text-sm text-muted-foreground dark:text-gray-400">
          {translations.pageGovernanceActions.governanceActionType}
        </span>
        <GovernanceActionStatusBadge
          status={isExpired ? "Completed" : "In Progress"}
          translations={translations}
          className="ml-auto"
        />
      </div>

      <h2 className="text-2xl font-bold mb-4 dark:text-gray-100">{title}</h2>

      <div className="flex flex-col sm:flex-row gap-3 justify-between items-start">
        <Tabs defaultValue="abstract" className="w-full">
          <TabsList className="bg-background border-b border-border rounded-none w-full justify-start">
            <TabsTrigger
              value="abstract"
              className="data-[state=active]:shadow-none data-[state=active]:scale-125 dark:text-gray-300 dark:data-[state=active]:text-white"
            >
              {translations.general.abstract}
            </TabsTrigger>
            <TabsTrigger
              value="motivation"
              className="data-[state=active]:shadow-none data-[state=active]:scale-125 dark:text-gray-300 dark:data-[state=active]:text-white"
            >
              {translations.general.motivation}
            </TabsTrigger>
            <TabsTrigger
              value="rationale"
              className="data-[state=active]:shadow-none data-[state=active]:scale-125 dark:text-gray-300 dark:data-[state=active]:text-white"
            >
              {translations.general.rationale}
            </TabsTrigger>
          </TabsList>
          {InfoTab("abstract", abstract ?? "")}
          {InfoTab("motivation", motivation ?? "")}
          {InfoTab("rationale", rationale ?? "")}
        </Tabs>

        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardContent className="w-auto p-4">
            <h3 className="font-semibold mb-4 dark:text-gray-100">
              {translations.pageGovernanceActionsDetails.versionDetails}
            </h3>
            <div className="space-y-3">
              <VersionDetail
                label={translations.general.currentHash}
                value={actionId}
                translations={translations.general}
              />
              {prevActionId !== null && (
                <VersionDetail
                  label={translations.general.previousId}
                  value={prevActionId}
                  translations={translations.general}
                />
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </CardContent>
  );
};
