import { DRep } from "./dreps";
import MockDRepsResult from "~/lib/fixtures/dreps.json";
import MockProposalsResult from "~/lib/fixtures/proposals.json";
import MockGovernanceActionsResult from "~/lib/fixtures/governance-actions.json";
import MockCommentsResult from "~/lib/fixtures/comments.json";
import { GovernanceAction } from "./governance-actions";
import { Proposal } from "~/lib/proposals";
import { Comment } from "~/lib/comments";

export function getMockDReps(): Array<DRep> {
  return MockDRepsResult.elements;
}

export function getMockGovernanceActions(): Array<GovernanceAction> {
  return MockGovernanceActionsResult.elements;
}

export function getMockProposals(): Array<Proposal> {
  return MockProposalsResult.data;
}

export function getMockComments(): Array<Comment> {
  return MockCommentsResult.data;
}
