"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import Skeleton from "@/components/ui/skeleton";
import { getBlogDocs, type BlogDoc } from "@/lib/firestoreService";
import { pythonAgentDemoDoc, pythonAgentDemoSid } from "@/lib/docsDemo";

export default function DocsPage() {
  const [docs, setDocs] = useState<BlogDoc[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDocs = async () => {
      try {
        const data = await getBlogDocs();
        setDocs(data);
      } catch (error) {
        console.error("Error loading docs:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDocs();
  }, []);

  const list = useMemo(() => {
    const hasDemo = docs.some((item) => item.sid === pythonAgentDemoSid);
    return hasDemo ? docs : [pythonAgentDemoDoc, ...docs];
  }, [docs]);

  if (loading) {
    return (
      <div className="min-h-screen px-6 py-12 md:px-16">
        <div className="mx-auto max-w-5xl space-y-6">
          <Skeleton className="h-10 w-80" />
          <Skeleton className="h-16 w-full" />
          <div className="grid gap-6 md:grid-cols-2">
            <Skeleton className="h-56 w-full" />
            <Skeleton className="h-56 w-full" />
            <Skeleton className="h-56 w-full" />
            <Skeleton className="h-56 w-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-linear-to-br from-[#f3f6ff] via-[#fbf7f2] to-[#eefaf6] px-6 py-12 md:px-16">
      <section className="mx-auto max-w-5xl space-y-8">
        <div className="rounded-2xl border border-black/10 bg-white/70 p-6 shadow-sm backdrop-blur-sm">
          <h1 className="mt-2 text-4xl font-bold text-gray-900">Docs</h1>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {list.map((doc) => (
            <article
              key={doc.sid}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="mb-3 flex flex-wrap gap-2">
                {doc.tags?.map((tag) => (
                  <span key={tag} className="rounded-full border border-gray-300 px-2 py-1 text-xs text-gray-700">
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">{doc.title}</h2>
              <p className="mt-3 text-sm text-gray-600">{doc.summary}</p>
              <Link
                href={`/docs/${doc.sid}`}
                className="mt-5 inline-flex items-center rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white"
              >
                Read documentation
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
