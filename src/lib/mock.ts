import { DRep } from "./dreps";
import MockDRepsResult from "~/lib/fixtures/dreps.json";
import MockProposalsResult from "~/lib/fixtures/proposals.json";
import MockGovernanceActionsResult from "~/lib/fixtures/governance-actions.json";
import { GovernanceAction } from "./governance-actions";
import { Proposal } from "./proposals";

export function getMockDReps(): Array<DRep> {
  return MockDRepsResult.elements;
}

export function getMockGovernanceActions(): Array<GovernanceAction> {
  return MockGovernanceActionsResult.elements;
}

export function getMockProposals(): Array<Proposal> {
  return MockProposalsResult.data;
}
