import prisma from "~/../prisma";
import { Prisma } from "~/../generated/prisma";
import { getTokenomics } from "~/lib/koios";

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

  const [koiosTokenomics] = await getTokenomics(epoch);
  if (!koiosTokenomics) {
    return new Response("Error fetching tokenomics.", {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const tokenomicsData: Prisma.TokenomicsSnapshotCreateInput = {
    epoch,
    circulatingSupply: Number(koiosTokenomics.circulation),
    treasury: Number(koiosTokenomics.treasury),
    reserves: Number(koiosTokenomics.reserves),
    rewards: Number(koiosTokenomics.reward),
    depositStake: Number(koiosTokenomics.deposits_stake),
    depositProposal: Number(koiosTokenomics.deposits_proposal),
    depositDrep: Number(koiosTokenomics.deposits_drep),
  };

  await prisma.tokenomicsSnapshot.deleteMany({
    where: {
      epoch,
    },
  });

  const response = await prisma.tokenomicsSnapshot.create({
    data: tokenomicsData,
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
  const data = await prisma.tokenomicsSnapshot.findUnique({
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
