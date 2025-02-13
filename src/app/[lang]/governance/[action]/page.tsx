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
  getGovernanceActions,
  GovernanceActionFilterOption,
} from "~/lib/governance-actions";

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
    action: p.id,
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

const SUPPORTING_LINKS = [
  {
    title: "CIP-0122",
    url: "https://github.com/cardano-foundation/CIPs/tree/master/CIP-0122",
  },
  {
    title: "CIP-1547",
    url: "https://github.com/cardano-foundation/CIPs/tree/master/CIP-1547",
  },
  {
    title: "CIP-1694",
    url: "https://github.com/cardano-foundation/CIPs/tree/master/CIP-1694",
  },
  {
    title: "CIP-0654",
    url: "https://github.com/cardano-foundation/CIPs/tree/master/CIP-0654",
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

type GovernanceActionDetailsProps = {
  params: Promise<{
    action: string;
  }>;
};

export default async function GovernanceActionDetailsPage({}: GovernanceActionDetailsProps) {
  return (
    <div>
      <PageTitle
        title="Governace Action Details"
        icon={
          <div className="p-2 rounded-full bg-gray-300 w-12 h-12 flex flex-col justify-center items-center">
            <BookOpenCheckIcon />
          </div>
        }
        info="Anyone that has ADA in a wallet can propose a Governace Action. To submit a Governance Action, the submitter pays a refundable deposit of 100,000 Ada. The deposit will be returned automatically back to the submitter's wallet upon completion of the Voting period."
      />

      <TopBar backHref="/governance" />

      <Card>
        <GovernanceHeader />
        <Separator />
        <GovernaceVoting />
        <Separator />
        <GovernanceDocuments documents={DOCUMENTS} />
        <Separator />
        <GovernanceHistory entries={HISTORY_ENTRIES} />
        <Separator />
        <GovernanceTasks tasks={GOVERNANCE_TASKS} />
        <Separator />
        <GovernanceLinks links={SUPPORTING_LINKS} />
      </Card>
    </div>
  );
}
