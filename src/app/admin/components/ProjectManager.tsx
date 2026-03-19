"use client";

import { useEffect, useState } from "react";
import {
  getProjects,
  addProject,
  updateProject,
  deleteProject,
  type Project,
} from "@/lib/firestoreService";

export default function ProjectManager() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<{
    title: string;
    summary: string;
    status: "Planned" | "In Progress" | "Live";
    tags: string;
    demoUrl: string;
    githubUrl: string;
  }>({
    title: "",
    summary: "",
    status: "In Progress",
    tags: "",
    demoUrl: "",
    githubUrl: "",
  });

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    setLoading(true);
    const data = await getProjects();
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
        await updateProject(editingId, {
          ...formData,
          tags: tagsArray,
        });
      } else {
        await addProject({
          ...formData,
          tags: tagsArray,
        });
      }

      setFormData({ title: "", summary: "", status: "In Progress", tags: "", demoUrl: "", githubUrl: "" });
      setEditingId(null);
      await loadProjects();
    } catch (error) {
      console.error("Error saving project:", error);
    }
  };

  const handleEdit = (project: Project) => {
    setFormData({
      title: project.title,
      summary: project.summary,
      status: project.status,
      tags: project.tags.join(", "),
      demoUrl: project.demoUrl || "",
      githubUrl: project.githubUrl || "",
    });
    setEditingId(project.id || null);
  };

  const handleDelete = async (id: string | undefined) => {
    if (!id) return;
    try {
      await deleteProject(id);
      await loadProjects();
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading projects...</div>;
  }

  return (
    <div className="space-y-8">
      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-lg space-y-4">
        <h2 className="text-2xl font-bold mb-4">
          {editingId ? "Edit Project" : "Add New Project"}
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
          <label className="block text-sm font-medium mb-2">Summary</label>
          <textarea
            value={formData.summary}
            onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black min-h-24"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Status</label>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  status: e.target.value as any,
                })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option>Planned</option>
              <option>In Progress</option>
              <option>Live</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Tags (comma separated)</label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              placeholder="Next.js, TypeScript, UI"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Demo Link</label>
            <input
              type="url"
              value={formData.demoUrl}
              onChange={(e) => setFormData({ ...formData, demoUrl: e.target.value })}
              placeholder="https://example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">GitHub Link</label>
            <input
              type="url"
              value={formData.githubUrl}
              onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
              placeholder="https://github.com/..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            className="px-6 py-2 bg-black text-white rounded-lg hover:opacity-90 font-semibold"
          >
            {editingId ? "Update" : "Add"} Project
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setFormData({
                  title: "",
                  summary: "",
                  status: "In Progress",
                  tags: "",
                  demoUrl: "",
                  githubUrl: "",
                });
              }}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 font-semibold"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Projects List */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Projects ({projects.length})</h2>
        <div className="space-y-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-lg">{project.title}</h3>
                  <p className="text-gray-600 text-sm">{project.summary}</p>
                </div>
                <span className="text-xs bg-gray-200 px-2 py-1 rounded">
                  {project.status}
                </span>
              </div>
              <div className="flex gap-2 flex-wrap mb-3">
                {project.tags.map((tag) => (
                  <span key={tag} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
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
