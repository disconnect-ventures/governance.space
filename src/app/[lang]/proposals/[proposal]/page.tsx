import { MetadataRoute } from "next";
import { getDReps, DRepFilterOption } from "~/lib/dreps";
import { getProposals } from "~/lib/proposals";
import { getGovernanceActions, getActionIdUrl } from "~/lib/governance-actions";
import { listBudgetDiscussions } from "~/lib/budgetDiscussions";
import { i18n } from "~/config/i18n";

// Use interfaces with different names to avoid conflicts
interface ProposalData {
  id: number;
  attributes?: { updatedAt: string };
}

interface ActionData {
  txHash: string;
  index: number | string;
}

interface DiscussionData {
  id: number;
  attributes?: { updatedAt: string };
}

interface DRepData {
  view: string;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://governance.space";

  const staticRoutes = [
    "",
    "/about",
    "/analytics",
    "/budget-discussions",
    "/committees",
    "/cookie-policy",
    "/dreps",
    "/governance",
    "/help",
    "/live-events",
    "/privacy-policy",
    "/proposals",
    "/terms",
  ];

  const staticSitemapEntries = staticRoutes.flatMap((route) =>
    i18n.locales.map((locale) => ({
      url: `${baseUrl}/${locale.key}${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.8,
    }))
  );

  const [proposals, governanceActions, budgetDiscussions, dreps] =
    await Promise.all([
      fetchAllProposals(),
      fetchAllGovernanceActions(),
      fetchAllBudgetDiscussions(),
      fetchAllDReps(),
    ]);

  const proposalSitemapEntries = proposals.flatMap((proposal) =>
    i18n.locales.map((locale) => ({
      url: `${baseUrl}/${locale.key}/proposals/${proposal.id}`,
      lastModified: new Date(proposal.attributes?.updatedAt || Date.now()),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }))
  );

  const governanceActionSitemapEntries = governanceActions.flatMap((action) =>
    i18n.locales.map((locale) => ({
      url: `${baseUrl}/${locale.key}/governance/${getActionIdUrl(action.txHash, action.index.toString())}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }))
  );

  const budgetDiscussionSitemapEntries = budgetDiscussions.flatMap(
    (discussion) =>
      i18n.locales.map((locale) => ({
        url: `${baseUrl}/${locale.key}/budget-discussions/${discussion.id}`,
        lastModified: new Date(discussion.attributes?.updatedAt || Date.now()),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      }))
  );

  const drepSitemapEntries = dreps.flatMap((drep) =>
    i18n.locales.map((locale) => ({
      url: `${baseUrl}/${locale.key}/dreps/${drep.view}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }))
  );

  return [
    ...staticSitemapEntries,
    ...proposalSitemapEntries,
    ...governanceActionSitemapEntries,
    ...budgetDiscussionSitemapEntries,
    ...drepSitemapEntries,
  ];
}

async function fetchAllProposals(): Promise<ProposalData[]> {
  const pageSize = 100;
  let page = 0;
  let allProposals: ProposalData[] = [];
  let hasMore = true;

  while (hasMore) {
    const response = await getProposals(page, pageSize, "", "desc", []);
    const { data, meta } = response;

    if (!data || data.length === 0) {
      break;
    }

    allProposals = [...allProposals, ...(data as ProposalData[])];
    hasMore = meta?.pagination ? page < meta.pagination.pageCount - 1 : false;
    page++;
  }

  return allProposals;
}

async function fetchAllGovernanceActions(): Promise<ActionData[]> {
  const pageSize = 100;
  let page = 0;
  let allActions: ActionData[] = [];
  let hasMore = true;

  while (hasMore) {
    const response = await getGovernanceActions(
      page,
      pageSize,
      "",
      "NewestCreated",
      []
    );
    const { elements, total } = response;

    if (!elements || elements.length === 0) {
      break;
    }

    allActions = [...allActions, ...(elements as ActionData[])];
    const fetchedCount = (page + 1) * pageSize;
    hasMore = typeof total === "number" ? fetchedCount < total : false;
    page++;
  }

  return allActions;
}

async function fetchAllBudgetDiscussions(): Promise<DiscussionData[]> {
  const pageSize = 100;
  let page = 0;
  let allDiscussions: DiscussionData[] = [];
  let hasMore = true;

  while (hasMore) {
    const response = await listBudgetDiscussions({
      page,
      pageSize,
      search: "",
      sortDirection: "desc",
    });

    if (!response || !response.data || response.data.length === 0) {
      break;
    }

    const { data, meta } = response;
    allDiscussions = [...allDiscussions, ...(data as DiscussionData[])];
    hasMore = meta?.pagination ? page < meta.pagination.pageCount - 1 : false;
    page++;
  }

  return allDiscussions;
}

async function fetchAllDReps(): Promise<DRepData[]> {
  const pageSize = 100;
  let page = 0;
  let allDReps: DRepData[] = [];
  let hasMore = true;

  while (hasMore) {
    const response = await getDReps(
      page,
      pageSize,
      "",
      "RegistrationDate",
      [] as DRepFilterOption[]
    );
    const { elements, total } = response;

    if (!elements || elements.length === 0) {
      break;
    }

    allDReps = [...allDReps, ...(elements as DRepData[])];
    const fetchedCount = (page + 1) * pageSize;
    hasMore = typeof total === "number" ? fetchedCount < total : false;
    page++;
  }

  return allDReps;
}
