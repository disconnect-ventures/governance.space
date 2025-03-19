import { fetchApi } from ".";
import { API_BASE_URL } from "./constants";

export interface NetworkMetrics {
  uniqueDelegators: number;
  totalDelegations: number;
  totalGovernanceActions: number;
  totalDRepVotes: number;
  totalRegisteredDReps: number;
  totalActiveDReps: number;
  totalInactiveDReps: number;
  totalActiveCIP119CompliantDReps: number;
  totalRegisteredDirectVoters: number;
  totalDRepDistr: number;
  noOfCommitteeMembers: number;
  quorumNumerator: number;
  quorumDenominator: number;
}

export interface NetworkInfo {
  currentTime: string;
  epochNo: number;
  blockNo: number;
  networkName: string;
}

export interface NetworkStake {
  totalStakeControlledByDReps: number;
  totalStakeControlledBySPOs: number;
  alwaysAbstainVotingPower: number;
  alwaysNoConfidenceVotingPower: number;
}

export async function getNetworkMetrics() {
  const url = new URL("/network/metrics", API_BASE_URL);
  const response = await fetchApi<NetworkMetrics>(url);
  return response;
}

export async function getNetworkInfo() {
  const url = new URL("/network/info", API_BASE_URL);
  const response = await fetchApi<NetworkInfo>(url);
  return response;
}

export async function getNetworkStake() {
  const url = new URL("/network/total-stake", API_BASE_URL);
  const response = await fetchApi<NetworkStake>(url);
  return response;
}
