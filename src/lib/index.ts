export type ApiResponse<Element> = {
  elements: Array<Element>;
  page: number;
  pageSize: number;
  total: number;
};

export type PdfApiResponse<Element> = {
  data: Element;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
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
  // TODO: handle not ok
  const data = (await response.json()) as T;
  return data;
}
