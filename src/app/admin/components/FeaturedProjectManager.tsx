"use client";

import { useEffect, useState } from "react";
import {
  getFeaturedProjects,
  addFeaturedProject,
  updateFeaturedProject,
  deleteFeaturedProject,
  type FeaturedProject,
} from "@/lib/firestoreService";

export default function FeaturedProjectManager() {
  const [projects, setProjects] = useState<FeaturedProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    tags: "" as any,
  });

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    setLoading(true);
    const data = await getFeaturedProjects();
    setProjects(data);
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    try {
      const tagsArray = formData.tags
        .split(",")
        .map((t: string) => t.trim())
        .filter((t: string) => t);

      if (editingId) {
        await updateFeaturedProject(editingId, {
          ...formData,
          tags: tagsArray,
        });
      } else {
        await addFeaturedProject({
          ...formData,
          tags: tagsArray,
        });
      }

      setFormData({ title: "", desc: "", tags: "" });
      setEditingId(null);
      await loadProjects();
    } catch (error) {
      console.error("Error saving featured project:", error);
    }
  };

  const handleEdit = (project: FeaturedProject) => {
    setFormData({
      title: project.title,
      desc: project.desc,
      tags: project.tags.join(", "),
    });
    setEditingId(project.id || null);
  };

  const handleDelete = async (id: string | undefined) => {
    if (!id) return;
    try {
      await deleteFeaturedProject(id);
      await loadProjects();
    } catch (error) {
      console.error("Error deleting featured project:", error);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading featured projects...</div>;
  }

  return (
    <div className="space-y-8">
      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-lg space-y-4">
        <h2 className="text-2xl font-bold mb-4">
          {editingId ? "Edit Featured Project" : "Add Featured Project"}
        </h2>

        <div>
          <label className="block text-sm font-medium mb-2">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            value={formData.desc}
            onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black min-h-24"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Tags (comma separated)</label>
          <input
            type="text"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            placeholder="Firebase, React, Realtime"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            className="px-6 py-2 bg-black text-white rounded-lg hover:opacity-90 font-semibold"
          >
            {editingId ? "Update" : "Add"} Featured Project
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setFormData({ title: "", desc: "", tags: "" });
              }}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 font-semibold"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Featured Projects List */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Featured Projects ({projects.length})</h2>
        <div className="space-y-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{project.title}</h3>
                  <p className="text-gray-600 text-sm">{project.desc}</p>
                </div>
              </div>
              <div className="flex gap-2 flex-wrap mb-3">
                {project.tags.map((tag) => (
                  <span key={tag} className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(project)}
                  className="text-sm px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="text-sm px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
