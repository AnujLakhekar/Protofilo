import { NextResponse } from "next/server";

export async function GET() {
    const exp = await fetch("https://raw.githubusercontent.com/AnujLakhekar/experience/refs/heads/main/experience.json");
    const data = await exp.json();
    return NextResponse.json({
        message: data
    });
}
