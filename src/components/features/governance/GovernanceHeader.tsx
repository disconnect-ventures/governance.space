import { Suspense, useMemo } from "react";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent } from "~/components/ui/card";
import { GovernanceAction } from "~/lib/governance-actions";
import { Metadata } from "~/lib/metadata";
import CopyToClipboard from "../CopyToClipboard";
import { formatCamelCase } from "~/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import Latex from "react-latex-next";
import "katex/dist/katex.min.css";
import markdownToHtml from "~/lib/markdown";

type VersionDetailProps = {
  label: string;
  value: string;
};

const VersionDetail = ({ label, value }: VersionDetailProps) => (
  <div className="w-64 flex gap-2 items-start flex-col overflow-hidden">
    <p className="text-muted-foreground pr-2">{label}</p>
    <div className="w-full flex gap-2 items-center">
      <p className="font-bold w-full overflow-hidden text-ellipsis">{value}</p>
      <CopyToClipboard value={value} />
    </div>
  </div>
);

const InfoTab = async (value: string, text: string) => (
  <Suspense fallback={null}>
    <TabsContent
      value={value}
      className="min-h-40vh h-full max-h-[60vh] overflow-y-auto"
    >
      <Latex>{await markdownToHtml(text)}</Latex>
    </TabsContent>
  </Suspense>
);

export const GovernanceHeader = ({
  action,
  metadata,
}: {
  action: GovernanceAction;
  metadata: Metadata | null;
}) => {
  const title = useMemo(
    () => (action.title || metadata ? metadata?.metadata.title : "No title"),
    [action, metadata]
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

  return (
    <CardContent className="p-6">
      <div className="flex items-center gap-4 mb-4 text-center w-full">
        <Badge variant="secondary" className="text-sm bg-[#C5D0EC] color-black">
          {/* TODO: Add translations */}
          {formatCamelCase(action.type)}
        </Badge>
        <span className="text-sm text-muted-foreground">
          Governance Action Type
        </span>
        <Badge className="text-sm ml-auto bg-green-100 text-green-800">
          {isExpired ? "Completed" : "In Progress"}
        </Badge>
      </div>

      <h2 className="text-2xl font-bold mb-4">{title}</h2>

      <div className="flex flex-col sm:flex-row gap-3 justify-between items-start">
        <Tabs defaultValue="abstract" className="w-full">
          <TabsList className="bg-background border-b rounded-none w-full justify-start">
            <TabsTrigger
              value="abstract"
              className="data-[state=active]:shadow-none data-[state=active]:scale-125"
            >
              Abstract
            </TabsTrigger>
            <TabsTrigger
              value="motivation"
              className="data-[state=active]:shadow-none data-[state=active]:scale-125"
            >
              Motivation
            </TabsTrigger>
            <TabsTrigger
              value="rationale"
              className="data-[state=active]:shadow-none data-[state=active]:scale-125"
            >
              Rationale
            </TabsTrigger>
          </TabsList>
          {InfoTab("abstract", abstract ?? "")}
          {InfoTab("motivation", motivation ?? "")}
          {InfoTab("rationale", rationale ?? "")}
        </Tabs>

        <Card>
          <CardContent className="w-auto p-4">
            <h3 className="font-semibold mb-4">Version details</h3>
            <div className="space-y-3">
              <VersionDetail label="Current Hash:" value={action.txHash} />
              {/* <VersionDetail label="Proposed version:" value="11.10" /> */}
              {action.prevGovActionTxHash !== null && (
                <VersionDetail
                  label="Previous Hash:"
                  value={action.prevGovActionTxHash}
                />
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </CardContent>
  );
};
