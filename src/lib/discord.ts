import { DISCORD_WEBHOOK_URL } from "./constants";

export const sendWebhookMessage = async (message: string): Promise<boolean> => {
  if (!DISCORD_WEBHOOK_URL) {
    console.error("Discord webhook URL is not set.");
    return false;
  }

  try {
    const res = await fetch(DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: message,
      }),
    });

    if (!res.ok) {
      console.error(`Failed to send message to Discord: ${res.statusText}`);
      return false;
    }

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
