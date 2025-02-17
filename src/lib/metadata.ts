import { METADATA_BASE_URL } from "./constants";

export enum MetadataStandard {
  CIP108 = "CIP108",
  CIP119 = "CIP119",
}

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
  hash: string,
  standard: string,
  objectUrl: string
): Promise<Metadata | null> {
  try {
    const url = new URL("/validate", METADATA_BASE_URL);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        url: objectUrl,
        hash,
        standard,
      }),
    });
    if (!response.ok) {
      return null;
    }
    const data = (await response.json()) as Metadata;
    return data;
  } catch {
    return null;
  }
}
