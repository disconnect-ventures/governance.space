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
import { getGovernanceActionMetadata } from "~/lib/metadata";
import { getDictionary } from "~/config/dictionaries";
import { Breadcrumbs } from "~/components/layout/Breadcrumbs";

export async function generateMetadata({
  params: paramsPromise,
}: GovernanceActionDetailsProps): Promise<Metadata> {
  const params = await paramsPromise;
  const dictionary = await getDictionary(params.lang);
  const governanceActionById = await getGovernanceActionById(params.action);
  const actionName = governanceActionById?.proposal.title;
  const actionId = params.action;
  const title = actionName ?? actionId;

  return {
    title: `${title} - ${dictionary.metatags.title}`,
    description: dictionary.metatags.description,
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
  const locale = params.lang;
  const dictionary = await getDictionary(locale);
  const proposal = await getGovernanceActionById(params.action);
  const action = proposal?.proposal;
  if (!action) {
    return notFound();
  }

  const metadata = await getGovernanceActionMetadata(
    action.metadataHash,
    action.url
  );
  const references = metadata?.metadata?.references ?? [];

  const breadcrumbsTitle = action.title ?? metadata?.metadata?.title;

  return (
    <>
      <Breadcrumbs
        translations={dictionary.breadcrumbs}
        additionalSegment={breadcrumbsTitle}
      />
      <div className="bg-background text-foreground">
        <PageTitle
          icon={
            <div className="p-2 rounded-full bg-muted text-muted-foreground w-12 h-12 flex flex-col justify-center items-center">
              <BookOpenCheckIcon />
            </div>
          }
          translations={dictionary.pageGovernanceActionsDetails}
        />

        <TopBar backHref="/governance" translations={dictionary.general} />

        <Card className="bg-card text-card-foreground rounded-xl overflow-hidden">
          <GovernanceHeader
            action={action}
            metadata={metadata}
            translations={dictionary}
          />
          <Separator className="bg-border my-4" />
          <GovernaceVoting action={action} translations={dictionary} />
          <GovernanceLinks links={references} translations={dictionary} />
          <Separator className="bg-border" />
          <GovernanceDocuments
            documents={DOCUMENTS}
            translations={dictionary.pageGovernanceActionsDetails}
          />
          <Separator className="bg-border" />
          <GovernanceTasks
            tasks={GOVERNANCE_TASKS}
            translations={dictionary.pageGovernanceActionsDetails}
          />
          <Separator className="bg-border" />
          <GovernanceHistory
            entries={HISTORY_ENTRIES}
            translations={dictionary.pageGovernanceActionsDetails}
          />
        </Card>
      </div>
    </>
  );
}
