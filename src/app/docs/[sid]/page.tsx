"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Skeleton from "@/components/ui/skeleton";
import {
  getBlogDocBySid,
  type BlogDoc,
  type BlogDocBlock,
} from "@/lib/firestoreService";
import { pythonAgentDemoDoc, pythonAgentDemoSid } from "@/lib/docsDemo";

function renderBlock(block: BlogDocBlock, index: number) {
  if (block.type === "heading") {
    return (
      <h2 key={index} className="mt-8 text-2xl font-semibold text-gray-900">
        {block.content}
      </h2>
    );
  }

  if (block.type === "code") {
    return (
      <pre
        key={index}
        className="mt-4 overflow-x-auto rounded-xl border border-gray-200 bg-[#0f172a] p-4 text-sm text-slate-100"
      >
        <code>{block.content}</code>
      </pre>
    );
  }

  if (block.type === "list") {
    return (
      <ul key={index} className="mt-4 list-disc space-y-2 pl-6 text-gray-700">
        {(block.items || []).map((item, itemIndex) => (
          <li key={`${index}-${itemIndex}`}>{item}</li>
        ))}
      </ul>
    );
  }

  return (
    <p key={index} className="mt-4 leading-7 text-gray-700">
      {block.content}
    </p>
  );
}

export default function DocsSidPage() {
  const params = useParams<{ sid: string }>();
  const sid = params?.sid;

  const [doc, setDoc] = useState<BlogDoc | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sid) return;

    const loadDoc = async () => {
      try {
        const data = await getBlogDocBySid(sid);
        setDoc(data);
      } catch (error) {
        console.error("Error loading doc:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDoc();
  }, [sid]);

  const displayDoc = useMemo(() => {
    if (doc) return doc;
    if (sid === pythonAgentDemoSid) return pythonAgentDemoDoc;
    return null;
  }, [doc, sid]);

  if (loading) {
    return (
      <div className="min-h-screen px-6 py-12 md:px-16">
        <div className="mx-auto max-w-4xl space-y-6">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-14 w-2/3" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    );
  }

  if (!displayDoc) {
    return (
      <main className="min-h-screen px-6 py-12 md:px-16">
        <div className="mx-auto max-w-3xl rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-bold text-gray-900">Documentation not found</h1>
          <p className="mt-3 text-gray-600">
            No doc exists for sid: <span className="font-mono">{sid}</span>
          </p>
          <Link
            href="/docs"
            className="mt-5 inline-flex rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white"
          >
            Back to docs
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#faf8f4] px-6 py-10 md:px-16">
      <article className="mx-auto max-w-4xl rounded-2xl border border-black/10 bg-white p-8 shadow-sm md:p-10">
        <Link href="/docs" className="text-sm font-semibold text-gray-500 hover:text-gray-900">
          ← Back to docs
        </Link>

        <header className="mt-4 border-b border-gray-200 pb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">{displayDoc.appName}</p>
          <h1 className="mt-2 text-4xl font-bold text-gray-900">{displayDoc.title}</h1>
          <p className="mt-3 text-base text-gray-700">{displayDoc.summary}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {displayDoc.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-gray-300 px-2 py-1 text-xs text-gray-700">
                {tag}
              </span>
            ))}
          </div>
        </header>

        <section className="pt-3">
          {displayDoc.blocks.map((block, index) => renderBlock(block, index))}
        </section>
      </article>
    </main>
  );
}
