import { NextResponse } from "next/server";

type RouteContext = {
  params: Promise<{
    application: string;
  }>;
};

const DEFAULT_DISCORD_BOT_CLIENT_ID = process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID?.trim() || "no client id set";

function parseSafeUrl(value: string | undefined): URL | null {
  if (!value) return null;

  try {
    const url = new URL(value.trim());
    if (url.protocol !== "https:") {
      return null;
    }
    return url;
  } catch {
    return null;
  }
}

function getDiscordBotInviteUrl(): URL {
  const clientId =
    process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID?.trim() || DEFAULT_DISCORD_BOT_CLIENT_ID;

  const params = new URLSearchParams({
    client_id: clientId,
    scope: "bot applications.commands",
    permissions: process.env.NEXT_PUBLIC_DISCORD_BOT_PERMISSIONS?.trim() || "8",
  });

  return new URL(`https://discord.com/oauth2/authorize?${params.toString()}`);
}

function getDiscordServerInviteUrl(): URL | null {
  return (
    parseSafeUrl(process.env.DISCORD_SERVER_INVITE_URL) ||
    parseSafeUrl(process.env.NEXT_PUBLIC_DISCORD_SERVER_URL)
  );
}

function getInviteTarget(appKey: string, inviteType: string | null): URL | null {
  if (appKey === "discord") {
    if (inviteType === "server") {
      return getDiscordServerInviteUrl();
    }

    return getDiscordBotInviteUrl();
  }

  const typeSuffix = inviteType ? `_${inviteType.toUpperCase()}` : "";
  const envKey = `INVITE_${appKey.toUpperCase()}${typeSuffix}_URL`;
  const fallbackEnvKey = `INVITE_${appKey.toUpperCase()}_URL`;
  return parseSafeUrl(process.env[envKey]) || parseSafeUrl(process.env[fallbackEnvKey]);
}
export async function GET(request: Request, context: RouteContext) {
  const { application } = await context.params;
  const appKey = application.toLowerCase();
  const searchParams = new URL(request.url).searchParams;
  const inviteType = searchParams.get("type")?.toLowerCase() || null;
  const target = getInviteTarget(appKey, inviteType);

  if (!target) {
    return NextResponse.json(
      {
        error: "Invite target not configured",
        application: appKey,
        type: inviteType,
      },
      { status: 404 },
    );
  }

  return NextResponse.redirect(target);
}
