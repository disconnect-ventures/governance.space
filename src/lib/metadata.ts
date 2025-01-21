import { getMockGovernanceActionMetadata } from "./mock";

interface Reference {
  "@type": string;
  label: string;
  uri: string;
}

export interface GovernanceActionMetadata {
  abstract: string;
  motivation: string;
  rationale: string;
  references: Reference[];
  title: string;
}

export interface Metadata {
  valid: boolean;
  metadata: GovernanceActionMetadata;
}

export async function getGovernanceActionMetadata(
  // eslint-disable-next-line
  hash: string,
  // eslint-disable-next-line
  standard: string,
  // eslint-disable-next-line
  url: string
): Promise<Metadata> {
  return getMockGovernanceActionMetadata();
}
