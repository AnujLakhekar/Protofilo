"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { FaDiscord } from "react-icons/fa6";

const APP_NAMES: Record<string, string> = {
  discord: "Discord",
};

export default function InviteApplicationPage() {
  const params = useParams<{ application: string }>();
  const searchParams = useSearchParams();
  const appKey = (params.application || "").toLowerCase();
  const appName =
    APP_NAMES[appKey] || appKey.charAt(0).toUpperCase() + appKey.slice(1);

  const selectedType = searchParams.get("type")?.toLowerCase();
  const isValidType = selectedType === "bot" || selectedType === "server";
  const invitePath = isValidType
    ? `/api/invite/${appKey}?type=${selectedType}`
    : "";

  useEffect(() => {
    if (!appKey || !invitePath) return;

    const timer = window.setTimeout(() => {
      window.location.href = invitePath;
    }, 900);

    return () => window.clearTimeout(timer);
  }, [appKey, invitePath]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-white px-6 py-12 text-black md:px-16 md:py-16">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-28 top-0 h-72 w-72 rounded-full bg-indigo-200/60 blur-3xl" />
        <div className="absolute right-0 top-24 h-80 w-80 rounded-full bg-sky-200/50 blur-3xl" />
      </div>

      <section className="relative mx-auto w-full max-w-5xl">
        <div className="grid gap-8 rounded-3xl border border-black/10 bg-white/85 p-6  backdrop-blur-sm md:grid-cols-[1.2fr_0.8fr] md:p-10">
          <div>
            <h1 className="text-3xl font-extrabold leading-tight md:text-5xl">
              Redirecting you to
              <span className="ml-2 text-indigo-500">{appName}</span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-gray-600 md:text-lg">
              You are being redirected to the {appName} invite page.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              {appKey === "discord" ? (
                <>
                  <a
                    href={`/api/invite/${appKey}?type=bot`}
                    className="inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:opacity-85"
                  >
                    Bot
                  </a>

                  <a
                    href={`/api/invite/${appKey}?type=server`}
                    className="inline-flex items-center gap-2 rounded-full border border-black px-6 py-3 text-sm font-semibold text-black transition hover:bg-black hover:text-white"
                  >
                    Server Invite
                  </a>
                </>
              ) : (
                <a
                  href={`/api/invite/${appKey}`}
                  className="inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:opacity-85"
                >
                  Continue
                </a>
              )}

              <Link
                href="/"
                className="inline-flex items-center rounded-full border border-black px-6 py-3 text-sm font-semibold transition hover:bg-black hover:text-white"
              >
                Cancel
              </Link>
            </div>
          </div>

          <aside className="rounded-2xl border border-indigo-200 bg-indigo-50 p-6">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-black text-white">
              <FaDiscord className="h-6 w-6" aria-hidden />
            </div>
            <h2 className="text-xl font-bold">Please wait...</h2>
            <p className="mt-2 text-sm text-gray-700">
              For Discord, choose Bot Invite or Server Invite.
            </p>
          </aside>
        </div>
      </section>
    </main>
  );
}
