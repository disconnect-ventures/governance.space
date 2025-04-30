import {
  GithubIcon,
  GlobeIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
  YoutubeIcon,
} from "lucide-react";
import { METADATA_BASE_URL } from "./constants";

export enum MetadataStandard {
  CIP108 = "CIP108",
  CIP119 = "CIP119",
}

export interface Reference {
  "@type": string;
  label: string;
  uri: string;
}

type ImageObject = {
  "@type": "ImageObject";
  contentUrl: string;
  sha256: string;
};

export interface BaseMetadata {
  references?: Reference[];
}

export interface GovernanceActionMetadataPayload extends BaseMetadata {
  abstract: string;
  motivation: string;
  rationale: string;
  title: string;
}

export interface DRepMetadataPayload extends BaseMetadata {
  bio: string;
  email: string;
  givenName: string;
  image: ImageObject;
  motivations: string;
  objectives: string;
  paymentAddress: string;
  qualifications: string;
}

export interface Metadata<T> {
  valid: boolean;
  metadata?: T & BaseMetadata;
}

export async function getMetadata<T>(
  hash: string,
  standard: string,
  objectUrl: string
): Promise<Metadata<T> | null> {
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
    const data = (await response.json()) as Metadata<T>;
    return data;
  } catch {
    return null;
  }
}

export async function getDrepMetadata(hash: string, url: string) {
  return getMetadata<DRepMetadataPayload>(hash, MetadataStandard.CIP119, url);
}

export async function getGovernanceActionMetadata(hash: string, url: string) {
  return getMetadata<GovernanceActionMetadataPayload>(
    hash,
    MetadataStandard.CIP108,
    url
  );
}

export const getContactLinkIcon = (reference: Reference) => {
  const uri = reference.uri.toLowerCase();

  if (uri.match(/(twitter\.com|x\.com)/)) {
    return TwitterIcon;
  } else if (uri.match(/linkedin\.com/)) {
    return LinkedinIcon;
  } else if (uri.match(/(youtube\.com|youtu\.be)/)) {
    return YoutubeIcon;
  } else if (uri.match(/instagram\.com/)) {
    return InstagramIcon;
  } else if (uri.match(/t\.me/)) {
    // return TelegramIcon;
  } else if (uri.match(/github\.com/)) {
    return GithubIcon;
  } else if (uri.match(/(http|https):\/\//)) {
    return GlobeIcon;
  }

  return GlobeIcon;
};

export const isSocialMediaLink = (uri: string) => {
  const lowerUri = uri.toLowerCase();
  return [
    "twitter.com",
    "x.com",
    "linkedin.com",
    "youtube.com",
    "youtu.be",
    "instagram.com",
    "t.me",
  ].some((domain) => lowerUri.includes(domain));
};

export const formatReferenceUri = (uri: string): string => {
  try {
    return uri.replace(/(https?:\/\/)?(www\.)?/, "").replace(/\/$/, "");
  } catch {
    return uri;
  }
};
