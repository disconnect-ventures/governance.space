import { getMockDReps } from "./mock";

export type DRep = {
  isScriptBased: boolean;
  drepId: string;
  view: string;
  status: "Active" | "Inactive" | "Retired" | string;
  url: string;
  metadataHash: string;
  deposit: number;
  votingPower: number;
  type: string; // TODO: Add explicit values
  latestTxHash: string;
  latestRegistrationDate: string;
  metadataError: null | string;
  paymentAddress: string | null;
  givenName: string | null;
  objectives: string | null;
  motivations: string | null;
  qualifications: string | null;
  imageUrl: string | null;
  imageHash: string | null;
};

export async function getDReps(): Promise<Array<DRep>> {
  return getMockDReps();
}

export async function getDRepById(id: string): Promise<DRep | null> {
  const dreps = await getDReps();
  return dreps.find((d) => d.drepId === id) ?? null;
}
