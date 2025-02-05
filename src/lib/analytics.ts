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
  supply: number;
  treasury: number;
  circulation: number;
  rewards: number;
  reserves: number;
  deposits: number;
  total: number;
  alwaysAbstain: number;
  noConfidence: number;
  dreps: number;
  dashboard: {
    epoch: number;
    metrics: {
      totalDReps: {
        value: number;
        change: string;
      };
      totalDelegators: {
        value: number;
        change: string;
      };
      newDReps: {
        value: number;
        change: string;
      };
      newDelegators: {
        value: number;
        change: string;
      };
      delegationRate: {
        value: string;
        change: string;
      };
      activeDelegated: {
        value: string;
        change: string;
      };
      abstainNoConfidence: {
        value: string;
        change: string;
      };
    };
    votingPowerByRegion: {
      Asia: string;
      Europe: string;
      Unknown: string;
      Africa: string;
    };
  };
}
