export const baseApiUrl = "https://be.gov.tools";

export type ApiResponse<Element> = {
  elements: Array<Element>;
  page: number;
  pageSize: number;
  total: number;
};

export const CACHE_CONFIG = {
  tags: {
    dreps: "dreps",
    governanceAction: "governanceAction",
    proposal: "proposal",
  },
  revalidate: 360,
} as const;

export async function fetchApi<T>(
  url: string | URL | globalThis.Request,
  options?: RequestInit
) {
  const response = await fetch(url, {
    ...options,
    next: {
      revalidate: CACHE_CONFIG.revalidate,
      ...options?.next,
    },
  });
  const data = (await response.json()) as T;
  return data;
}
