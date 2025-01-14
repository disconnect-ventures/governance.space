import { getMockGovernanceActions } from "./mock";

export type GovernanceAction = {
  id: string;
  txHash: string;
  index: number;
  type:
    | "NoConfidence"
    | "HardForkInitiation"
    | "NoConfidence"
    | "NewCommittee"
    | "NewConstitution"
    | "ParameterChange"
    | "ParameterChange"
    | "ParameterChange"
    | "TreasuryWithdrawals"
    | "InfoAction"
    | string;
  details: {
    major: number;
    minor: number;
  };
  expiryDate: string;
  expiryEpochNo: number;
  createdDate: string;
  createdEpochNo: number;
  url: string;
  metadataHash: string;
  protocolParams: unknown | null; // TODO
  title: string | null;
  abstract: string | null;
  motivation: string | null;
  rationale: string | null;
  dRepYesVotes: number;
  dRepNoVotes: number;
  dRepAbstainVotes: number;
  poolYesVotes: number;
  poolNoVotes: number;
  poolAbstainVotes: number;
  ccYesVotes: number;
  ccNoVotes: number;
  ccAbstainVotes: number;
  prevGovActionIndex: number | null;
  prevGovActionTxHash: string | null;
};

export type GovernanceActionType = {
  id: number;
  attributes: {
    gov_action_type_name: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
};

export async function getGovernanceActions(): Promise<Array<GovernanceAction>> {
  return getMockGovernanceActions();
}

export async function getNoConfidenceActions() {
  return [];
}

export async function getNewCommitteeActions() {
  return [];
}

export async function getHardForkInitiationActions() {
  return [];
}

export async function getParameterChangeActions() {
  return [];
}

export async function getTreasuryWithdrawalsActions() {
  return [];
}

export async function getInfoActionActions() {
  return [];
}
