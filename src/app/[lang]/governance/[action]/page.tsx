import { GovernanceHeader } from "~/components/features/governance/GovernanceHeader";
import { GovernaceVoting } from "~/components/features/governance/GovernanceVoting";
import { TopBar } from "~/components/layout/TopBar";
import { Separator } from "~/components/ui/separator";
import { Card } from "~/components/ui/card";
import { GovernanceTasks } from "~/components/features/governance/GovernanceTasks";
import { GovernanceLinks } from "~/components/features/governance/GovernanceLinks";
import { GovernanceHistory } from "~/components/features/governance/GovernanceHistory";
import { GovernanceDocuments } from "~/components/features/governance/GovernanceDocuments";
import { PageTitle } from "~/components/layout/PageTitle";
import { BookOpenCheckIcon } from "lucide-react";
import { Metadata } from "next";
import {
  getActionIdUrl,
  getGovernanceActionById,
  getGovernanceActions,
  GovernanceActionFilterOption,
} from "~/lib/governance-actions";
import { PageProps } from "../../layout";
import { notFound } from "next/navigation";
import { getGovernanceActionMetadata, MetadataStandard } from "~/lib/metadata";

export async function generateMetadata({
  params,
}: GovernanceActionDetailsProps): Promise<Metadata> {
  const actionId = (await params).action;
  return {
    title: `Governance Space - Governance Action ${actionId}`,
    description: "All-in-One Governance Platform",
  };
}

export async function generateStaticParams() {
  let page = 0;
  const pageSize = 50;
  const search = "";
  const sort = "NewestCreated";
  const filters: GovernanceActionFilterOption[] = [];

  const firstPage = await getGovernanceActions(
    page++,
    pageSize,
    search,
    sort,
    filters
  );
  const totalPages = Math.ceil(firstPage.total / pageSize);

  const nextPages = (
    await Promise.all(
      Array.from({ length: totalPages - 1 }).map(async () => {
        try {
          const data = await getGovernanceActions(
            page++,
            pageSize,
            search,
            sort,
            filters
          );
          return data.elements;
        } catch {
          return [];
        }
      })
    )
  ).flat();

  return [...firstPage.elements, ...nextPages].map((p) => ({
    action: getActionIdUrl(p.txHash, p.index.toString()),
  }));
}

const DOCUMENTS = [
  {
    fileName: "Política_v1.pdf",
    fileType: "PDF Document",
    href: "/documents/policy.pdf",
  },
  {
    fileName: "Procedimentos.docx",
    fileType: "Word Document",
    href: "/documents/procedures.docx",
  },
];

const GOVERNANCE_TASKS = [
  {
    description: "Levantamento de requisitos",
    completed: true,
  },
  {
    description: "Análise de impacto",
    completed: true,
  },
  {
    description: "Implementação das mudanças",
    completed: false,
  },
];

const HISTORY_ENTRIES = [
  {
    action: "Atualização do status para em progresso",
    author: "Maria Silva",
    date: "2024-01-19",
  },
  {
    action: "Criação da ação de governança",
    author: "Otávio Lima",
    date: "2024-01-14",
  },
];

type GovernanceActionDetailsProps = PageProps<{ action: string }>;

export default async function GovernanceActionDetailsPage({
  params: paramsPromise,
}: GovernanceActionDetailsProps) {
  const params = await paramsPromise;
  const proposal = await getGovernanceActionById(params.action);
  const action = proposal?.proposal;
  if (!action) {
    return notFound();
  }

  const metadata = await getGovernanceActionMetadata(
    action.metadataHash,
    MetadataStandard.CIP108,
    action.url
  );
  const references = metadata?.metadata.references ?? [];

  return (
    <div>
      <PageTitle
        title="Governace Action Details"
        icon={
          <div className="p-2 rounded-full bg-gray-300 w-12 h-12 flex flex-col justify-center items-center">
            <BookOpenCheckIcon />
          </div>
        }
        translationPage="pageGovernanceActionsDetails"
      />

      <TopBar backHref="/governance" />

      <Card>
        <GovernanceHeader action={action} metadata={metadata} />
        <Separator />
        <GovernaceVoting />
        <Separator />
        <GovernanceDocuments documents={DOCUMENTS} />
        <Separator />
        <GovernanceHistory entries={HISTORY_ENTRIES} />
        <Separator />
        <GovernanceTasks tasks={GOVERNANCE_TASKS} />
        <Separator />
        <GovernanceLinks links={references} />
      </Card>
    </div>
  );
}
