export const AUTH_HEADER = "x-authorization";
export const AUTH_KEY = process.env.AUTH_KEY || "changeme :(";

export function isAuthorized(request: Request) {
  const authHeader = request.headers.get(AUTH_HEADER);
  if (!authHeader) {
    return false;
  }

  return authHeader === AUTH_KEY;
}