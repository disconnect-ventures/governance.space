import { DRep } from "./dreps";
import MockDRepsResult from "~/lib/fixtures/dreps.json";
import MockProposalsResult from "~/lib/fixtures/proposals.json";
import MockGovernanceActionsResult from "~/lib/fixtures/governance-actions.json";
import MockCommentsResult from "~/lib/fixtures/comments.json";
import { GovernanceAction } from "./governance-actions";
import { Proposal } from "~/lib/proposals";
import { Comment } from "~/lib/comments";
import { Metadata } from "./metadata";
import GovernanceActionMetadataResponse from "~/lib/fixtures/governance-action-metadata.json";
import { CommitteeMember } from "~/components/features/committees/CommitteeDirectory";
import MockCommitteeMembers from "~/lib/fixtures/committees.json";
import MockLiveEvents from "~/lib/fixtures/live-events.json";
import { LiveEvent } from "~/components/features/liveEvents/LiveEventsDirectory";
import MockMetricsResult from "./fixtures/metrics.json";
import { MetricsData } from "./analytics";

export function getMockDReps(): Array<DRep> {
  return MockDRepsResult.elements as Array<DRep>;
}

export function getMockGovernanceActions(): Array<GovernanceAction> {
  return MockGovernanceActionsResult.elements as Array<GovernanceAction>;
}

export function getMockProposals(): Array<Proposal> {
  return MockProposalsResult.data;
}

export function getMockComments(): Array<Comment> {
  return MockCommentsResult.data;
}

export function getMockGovernanceActionMetadata(): Metadata {
  return GovernanceActionMetadataResponse;
}

export function getMockCommitteeMembers(): CommitteeMember[] {
  return MockCommitteeMembers;
}

export function getMockLiveEvents(): LiveEvent[] {
  return MockLiveEvents as LiveEvent[];
}

export function getMockMetrics(): MetricsData {
  return MockMetricsResult;
}
