import { sendWebhookMessage } from "~/lib/discord";

export async function POST(request: Request) {
  const { pathname, error } = await request.json();

  try {
    const response = await sendWebhookMessage(`Error in ${pathname}: ${error}`);
    if (!response) {
      return new Response("Failed to log error.", { status: 500 });
    }

    return new Response("Logged error sucessfully.", { status: 200 });
  } catch {
    return new Response("Failed to log error.", { status: 500 });
  }
}
