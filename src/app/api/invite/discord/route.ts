import { NextResponse } from "next/server";

function getDiscordBotInviteUrl(): URL {
  const clientId =
    process.env.DISCORD_CLIENT_ID?.trim() || "1487323599642562590";

  const params = new URLSearchParams({
    client_id: clientId,
    scope: "bot applications.commands",
    permissions: process.env.DISCORD_BOT_PERMISSIONS?.trim() || "8",
  });

  const inviteUrl = new URL(
    `https://discord.com/oauth2/authorize?${params.toString()}`,
  );

  return inviteUrl;
}

function getDiscordServerInviteUrl(): URL | null {
  const value =
    process.env.DISCORD_SERVER_INVITE_URL ||
    process.env.NEXT_PUBLIC_DISCORD_SERVER_URL;

  if (!value) return null;

  try {
    const parsed = new URL(value.trim());
    return parsed.protocol === "https:" ? parsed : null;
  } catch {
    return null;
  }
}

export function GET(request: Request) {
  const type = new URL(request.url).searchParams.get("type")?.toLowerCase();
  const target =
    type === "server" ? getDiscordServerInviteUrl() : getDiscordBotInviteUrl();

  if (!target) {
    return NextResponse.json(
      {
        error: "Discord server invite URL is not configured",
      },
      { status: 404 },
    );
  }

  return NextResponse.redirect(target);
}
