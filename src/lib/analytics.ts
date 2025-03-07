import { fetchApi } from ".";
import { API_BASE_URL } from "./constants";

export interface MetricsData {
  currentTime: string;
  currentEpoch: number;
  currentBlock: number;
  uniqueDelegators: number;
  totalDelegations: number;
  totalGovernanceActions: number;
  totalDRepVotes: number;
  totalRegisteredDReps: number;
  totalStakeControlledByDReps: number;
  totalStakeControlledBySPOs: number;
  totalActiveDReps: number;
  totalInactiveDReps: number;
  totalActiveCIP119CompliantDReps: number;
  totalRegisteredDirectVoters: number;
  alwaysAbstainVotingPower: number;
  alwaysNoConfidenceVotingPower: number;
  networkName: string;
  totalDRepDistr: number;
  noOfCommitteeMembers: number;
  quorumNumerator: number;
  quorumDenominator: number;

  // supply: number;
  // treasury: number;
  // circulation: number;
  // rewards: number;
  // reserves: number;
  // deposits: number;
  // total: number;
  // alwaysAbstain: number;
  // noConfidence: number;
  // dreps: number;
  // dashboard: {
  //   epoch: number;
  //   metrics: {
  //     totalDReps: {
  //       value: number;
  //       change: string;
  //     };
  //     totalDelegators: {
  //       value: number;
  //       change: string;
  //     };
  //     newDReps: {
  //       value: number;
  //       change: string;
  //     };
  //     newDelegators: {
  //       value: number;
  //       change: string;
  //     };
  //     delegationRate: {
  //       value: string;
  //       change: string;
  //     };
  //     activeDelegated: {
  //       value: string;
  //       change: string;
  //     };
  //     abstainNoConfidence: {
  //       value: string;
  //       change: string;
  //     };
  //   };
  //   votingPowerByRegion: {
  //     Asia: string;
  //     Europe: string;
  //     Unknown: string;
  //     Africa: string;
  //   };
  // };
}

export async function getMetrics() {
  const url = new URL("/network/metrics", API_BASE_URL);

  const response = await fetchApi<MetricsData>(url);

  return response;
}
