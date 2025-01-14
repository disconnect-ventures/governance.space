import { getMockDReps } from "./mock";

export type DRep = {
  avatarUrl: string;
  name: string;
  id: string;
  status: "Active" | "Inactive" | "Retired";
  votingPower: string;
  social: boolean;
  delegators: number;
  influencePower: string;
  voting: number;
  registrationDate: string;
};

export async function getDReps(): Promise<Array<DRep>> {
  return getMockDReps();
}
