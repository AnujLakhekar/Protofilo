import { NextResponse } from "next/server";

export function GET() {
  const inviteUrl = new URL(process.env.NEXT_PUBLIC_DISCORD_SERVER_URL!);
  return NextResponse.redirect(inviteUrl);
}
