export const baseApiUrl = "https://be.gov.tools";

export async function fetchApi<T>(
  url: string | URL | globalThis.Request,
  options?: RequestInit
) {
  const response = await fetch(url, options);
  const data = (await response.json()) as T;
  return data;
}
