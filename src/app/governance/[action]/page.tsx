import { GovernanceHeader } from "~/components/features/governance/GovernanceHeader";
import { GovernaceVoting } from "~/components/features/governance/GovernanceVoting";
import { TopBar } from "~/components/layout/TopBar";
import { Separator } from "~/components/ui/separator";
import { Card } from "~/components/ui/card";
import { GovernanceTasks } from "~/components/features/governance/GovernanceTasks";
import { GovernanceLinks } from "~/components/features/governance/GovernanceLinks";
import { GovernanceHistory } from "~/components/features/governance/GovernanceHistory";
import { GovernanceDocuments } from "~/components/features/governance/GovernanceDocuments";

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
    <div className="">
      <h1 className="text-2xl font-bold">Governance Action Detail</h1>

      <TopBar backHref="/proposals" />

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
