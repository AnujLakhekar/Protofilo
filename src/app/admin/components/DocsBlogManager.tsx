"use client";

import { useEffect, useMemo, useState } from "react";
import Skeleton from "@/components/ui/skeleton";
import {
  addBlogDoc,
  deleteBlogDoc,
  getBlogDocs,
  updateBlogDoc,
  type BlogDoc,
  type BlogDocBlock,
} from "@/lib/firestoreService";
import { pythonAgentDemoDoc } from "@/lib/docsDemo";

type BlogFormState = {
  sid: string;
  appName: string;
  title: string;
  summary: string;
  tags: string;
  blocks: BlogDocBlock[];
};

const blankState: BlogFormState = {
  sid: "",
  appName: "",
  title: "",
  summary: "",
  tags: "",
  blocks: [],
};

const createBlock = (type: BlogDocBlock["type"]): BlogDocBlock => {
  if (type === "list") {
    return { type: "list", items: [""] };
  }

  if (type === "code") {
    return { type: "code", content: "", language: "text" };
  }

  return { type, content: "" };
};

const sanitizeSid = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

export default function DocsBlogManager() {
  const [docs, setDocs] = useState<BlogDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingSid, setEditingSid] = useState<string | null>(null);
  const [error, setError] = useState<string>("");
  const [saved, setSaved] = useState(false);
  const [formData, setFormData] = useState<BlogFormState>(blankState);

  useEffect(() => {
    loadDocs();
  }, []);

  const prettyDemoBlocks = useMemo(() => pythonAgentDemoDoc.blocks, []);

  const loadDocs = async () => {
    setLoading(true);
    const data = await getBlogDocs();
    setDocs(data);
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const sid = sanitizeSid(formData.sid);
    if (!sid || !formData.title.trim() || !formData.appName.trim()) {
      setError("sid, app name, and title are required.");
      return;
    }

    const blocks = formData.blocks
      .map((block) => {
        if (block.type === "list") {
          return {
            ...block,
            items: (block.items || []).map((item) => item.trim()).filter(Boolean),
          };
        }

        if (block.type === "code") {
          return {
            ...block,
            content: (block.content || "").trim(),
            language: (block.language || "text").trim() || "text",
          };
        }

        return {
          ...block,
          content: (block.content || "").trim(),
        };
      })
      .filter((block) => {
        if (block.type === "list") return (block.items || []).length > 0;
        return !!block.content;
      });

    if (blocks.length === 0) {
      setError("Add at least one non-empty content block.");
      return;
    }

    const payload = {
      sid,
      appName: formData.appName.trim(),
      title: formData.title.trim(),
      summary: formData.summary.trim(),
      tags: formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      blocks,
    };

    try {
      if (editingSid) {
        await updateBlogDoc(editingSid, {
          appName: payload.appName,
          title: payload.title,
          summary: payload.summary,
          tags: payload.tags,
          blocks: payload.blocks,
        });
      } else {
        await addBlogDoc(payload);
      }

      setSaved(true);
      setTimeout(() => setSaved(false), 1800);
      setEditingSid(null);
      setFormData(blankState);
      await loadDocs();
    } catch (submitError) {
      console.error("Error saving blog doc:", submitError);
      setError("Unable to save. Check admin email access and sid uniqueness.");
    }
  };

  const handleEdit = (item: BlogDoc) => {
    setEditingSid(item.sid);
    setError("");
    setFormData({
      sid: item.sid,
      appName: item.appName,
      title: item.title,
      summary: item.summary,
      tags: item.tags.join(", "),
      blocks: item.blocks,
    });
  };

  const updateBlock = (index: number, patch: Partial<BlogDocBlock>) => {
    setFormData((prev) => ({
      ...prev,
      blocks: prev.blocks.map((block, i) => (i === index ? { ...block, ...patch } : block)),
    }));
  };

  const addBlock = (type: BlogDocBlock["type"]) => {
    setFormData((prev) => ({
      ...prev,
      blocks: [...prev.blocks, createBlock(type)],
    }));
  };

  const removeBlock = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      blocks: prev.blocks.filter((_, i) => i !== index),
    }));
  };

  const moveBlock = (index: number, direction: "up" | "down") => {
    setFormData((prev) => {
      const targetIndex = direction === "up" ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= prev.blocks.length) return prev;

      const next = [...prev.blocks];
      const current = next[index];
      next[index] = next[targetIndex];
      next[targetIndex] = current;

      return { ...prev, blocks: next };
    });
  };

  const handleDelete = async (sid: string) => {
    try {
      await deleteBlogDoc(sid);
      await loadDocs();
    } catch (deleteError) {
      console.error("Error deleting doc:", deleteError);
      setError("Unable to delete this document.");
    }
  };

  if (loading) {
    return (
      <div className="space-y-4 py-4">
        <Skeleton className="h-10 w-72" />
        <Skeleton className="h-14 w-full" />
        <Skeleton className="h-28 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-4 rounded-lg bg-gray-50 p-6">
        <h2 className="text-2xl font-bold">
          {editingSid ? "Edit Documentation Blog" : "Add Documentation Blog"}
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium">sid (dynamic route key)</label>
            <input
              type="text"
              value={formData.sid}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  sid: sanitizeSid(e.target.value),
                }))
              }
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="python-agent-quickstart"
              disabled={!!editingSid}
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">App Name</label>
            <input
              type="text"
              value={formData.appName}
              onChange={(e) => setFormData((prev) => ({ ...prev, appName: e.target.value }))}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Python Agent"
              required
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Summary</label>
          <textarea
            value={formData.summary}
            onChange={(e) => setFormData((prev) => ({ ...prev, summary: e.target.value }))}
            className="min-h-20 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Tags (comma separated)</label>
          <input
            type="text"
            value={formData.tags}
            onChange={(e) => setFormData((prev) => ({ ...prev, tags: e.target.value }))}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="python, docs, setup"
          />
        </div>

        <div>
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <label className="block text-sm font-medium">Content Blocks</label>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    sid: prev.sid || pythonAgentDemoDoc.sid,
                    appName: prev.appName || pythonAgentDemoDoc.appName,
                    title: prev.title || pythonAgentDemoDoc.title,
                    summary: prev.summary || pythonAgentDemoDoc.summary,
                    tags: prev.tags || pythonAgentDemoDoc.tags.join(", "),
                    blocks: prettyDemoBlocks,
                  }))
                }
                className="rounded border border-gray-300 px-3 py-1 text-xs font-semibold"
              >
                Load demo blocks
              </button>
              <button
                type="button"
                onClick={() => addBlock("heading")}
                className="rounded border border-gray-300 px-3 py-1 text-xs font-semibold"
              >
                + Heading
              </button>
              <button
                type="button"
                onClick={() => addBlock("paragraph")}
                className="rounded border border-gray-300 px-3 py-1 text-xs font-semibold"
              >
                + Paragraph
              </button>
              <button
                type="button"
                onClick={() => addBlock("code")}
                className="rounded border border-gray-300 px-3 py-1 text-xs font-semibold"
              >
                + Code
              </button>
              <button
                type="button"
                onClick={() => addBlock("list")}
                className="rounded border border-gray-300 px-3 py-1 text-xs font-semibold"
              >
                + List
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {formData.blocks.map((block, index) => (
              <div key={`${block.type}-${index}`} className="rounded-lg border border-gray-300 bg-white p-4">
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Block {index + 1}
                  </p>
                  <div className="flex flex-wrap items-center gap-2">
                    <select
                      value={block.type}
                      onChange={(e) => {
                        const nextType = e.target.value as BlogDocBlock["type"];
                        updateBlock(index, createBlock(nextType));
                      }}
                      className="rounded border border-gray-300 px-2 py-1 text-xs"
                    >
                      <option value="heading">Heading</option>
                      <option value="paragraph">Paragraph</option>
                      <option value="code">Code</option>
                      <option value="list">List</option>
                    </select>
                    <button
                      type="button"
                      onClick={() => moveBlock(index, "up")}
                      className="rounded border border-gray-300 px-2 py-1 text-xs"
                      disabled={index === 0}
                    >
                      Up
                    </button>
                    <button
                      type="button"
                      onClick={() => moveBlock(index, "down")}
                      className="rounded border border-gray-300 px-2 py-1 text-xs"
                      disabled={index === formData.blocks.length - 1}
                    >
                      Down
                    </button>
                    <button
                      type="button"
                      onClick={() => removeBlock(index)}
                      className="rounded border border-red-300 px-2 py-1 text-xs text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {block.type === "list" ? (
                  <textarea
                    value={(block.items || []).join("\n")}
                    onChange={(e) =>
                      updateBlock(index, {
                        items: e.target.value.split("\n"),
                      })
                    }
                    className="min-h-24 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="One item per line"
                  />
                ) : (
                  <textarea
                    value={block.content || ""}
                    onChange={(e) => updateBlock(index, { content: e.target.value })}
                    className="min-h-24 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder={block.type === "heading" ? "Heading text" : "Write content"}
                  />
                )}

                {block.type === "code" && (
                  <div className="mt-3">
                    <label className="mb-1 block text-xs font-medium text-gray-600">Code language</label>
                    <input
                      type="text"
                      value={block.language || "text"}
                      onChange={(e) => updateBlock(index, { language: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                      placeholder="powershell"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          {formData.blocks.length === 0 && (
            <p className="mt-2 rounded-lg border border-dashed border-gray-300 p-3 text-sm text-gray-500">
              No blocks yet. Add a heading, paragraph, code block, or list.
            </p>
          )}
        </div>

        {error && <p className="text-sm font-medium text-red-600">{error}</p>}

        <div className="flex items-center gap-2">
          <button
            type="submit"
            className="rounded-lg bg-black px-6 py-2 font-semibold text-white hover:opacity-90"
          >
            {editingSid ? "Update" : "Add"} Blog Doc
          </button>
          {editingSid && (
            <button
              type="button"
              onClick={() => {
                setEditingSid(null);
                setFormData(blankState);
                setError("");
              }}
              className="rounded-lg border border-gray-300 px-6 py-2 font-semibold hover:bg-gray-100"
            >
              Cancel
            </button>
          )}
          {saved && <span className="text-sm font-medium text-green-600">Saved</span>}
        </div>
      </form>

      <div>
        <h2 className="mb-4 text-2xl font-bold">Documentation Blogs ({docs.length})</h2>
        <div className="space-y-3">
          {docs.map((item) => (
            <div key={item.sid} className="rounded-lg border border-gray-200 p-4 hover:shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="space-y-1">
                  <p className="text-xs font-mono text-gray-500">/docs/{item.sid}</p>
                  <h3 className="text-lg font-bold">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.summary}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="rounded bg-blue-100 px-3 py-1 text-sm text-blue-700 hover:bg-blue-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.sid)}
                    className="rounded bg-red-100 px-3 py-1 text-sm text-red-700 hover:bg-red-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
          {docs.length === 0 && (
            <p className="rounded-lg border border-dashed border-gray-300 p-4 text-sm text-gray-500">
              No documentation blogs in Firestore yet. Create your first one with a sid.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
