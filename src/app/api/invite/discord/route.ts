import { NextResponse } from "next/server";

export function GET() {
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

  return NextResponse.redirect(inviteUrl);
}
