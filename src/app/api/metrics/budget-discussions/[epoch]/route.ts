import prisma from "~/../prisma";
import { Prisma } from "~/../generated/prisma";
import {
  BudgetDiscussion,
  listAllBudgetDiscussions,
} from "~/lib/budgetDiscussions";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ epoch: string }> }
) {
  const { epoch: epochStr } = await params;
  const epoch = Number(epochStr);
  if (isNaN(epoch)) {
    return new Response("Invalid epoch", {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  let budgetDiscussions: BudgetDiscussion[] = [];
  try {
    budgetDiscussions = await listAllBudgetDiscussions({});
  } catch {
    return new Response("Error fetching budget discussions", {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  let coreBudgetTotal = 0;
  let coreTotal = 0;
  let researchBudgetTotal = 0;
  let researchTotal = 0;
  let governanceSupportBudgetTotal = 0;
  let governanceSupportTotal = 0;
  let marketingInnovationBudgetTotal = 0;
  let marketingInnovationTotal = 0;
  let noneBudgetTotal = 0;
  let noneTotal = 0;

  for (const discussion of budgetDiscussions) {
    const costing = discussion.attributes.bd_costing?.data;
    const psapb = discussion.attributes.bd_psapb?.data;

    if (!costing || !psapb) continue;

    const adaAmount = parseFloat(costing.attributes.ada_amount);
    const typeName = psapb.attributes.type_name?.data?.attributes?.type_name;

    if (isNaN(adaAmount)) continue;
    switch (typeName) {
      case "Core":
        coreBudgetTotal += adaAmount;
        coreTotal++;
        break;
      case "Research":
        researchBudgetTotal += adaAmount;
        researchTotal++;
        break;
      case "Governance Support":
        governanceSupportBudgetTotal += adaAmount;
        governanceSupportTotal++;
        break;
      case "Marketing & Innovation":
        marketingInnovationBudgetTotal += adaAmount;
        marketingInnovationTotal++;
        break;
      case "None of these":
        noneBudgetTotal += adaAmount;
        noneTotal++;
        break;
      default:
        noneBudgetTotal += adaAmount;
        noneTotal++;
    }
  }

  const budgetTotal =
    coreBudgetTotal +
    researchBudgetTotal +
    governanceSupportBudgetTotal +
    marketingInnovationBudgetTotal +
    noneBudgetTotal;

  const budgetDiscussionStatsSnapshot: Prisma.BudgetDiscussionStatsSnapshotCreateInput =
    {
      epoch,
      coreBudgetTotal,
      coreTotal,
      researchBudgetTotal,
      researchTotal,
      governanceSupportBudgetTotal,
      governanceSupportTotal,
      marketingInnovationBudgetTotal,
      marketingInnovationTotal,
      noneBudgetTotal,
      noneTotal,
      budgetTotal,
    };

  await prisma.budgetDiscussionStatsSnapshot.deleteMany({
    where: {
      epoch,
    },
  });

  const response = await prisma.budgetDiscussionStatsSnapshot.create({
    data: budgetDiscussionStatsSnapshot,
  });

  return new Response(JSON.stringify(response), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ epoch: string }> }
) {
  const { epoch } = await params;
  const data = await prisma.budgetDiscussionStatsSnapshot.findUnique({
    where: {
      epoch: Number(epoch),
    },
  });

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
