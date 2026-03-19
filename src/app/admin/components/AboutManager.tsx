"use client";

import { useEffect, useState } from "react";
import {
  getAboutData,
  updateAboutData,
  type AboutData,
} from "@/lib/firestoreService";

export default function AboutManager() {
  const [aboutData, setAboutData] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    intro: "",
    careerSummary: "",
    skills: "" as any,
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    loadAboutData();
  }, []);

  const loadAboutData = async () => {
    setLoading(true);
    const data = await getAboutData();
    if (data) {
      setAboutData(data);
      setFormData({
        intro: data.intro,
        careerSummary: data.careerSummary,
        skills: data.skills.join(", "),
      });
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const skillsArray = formData.skills
        .split(",")
        .map((s: string) => s.trim())
        .filter((s: string) => s);

      await updateAboutData({
        intro: formData.intro,
        careerSummary: formData.careerSummary,
        skills: skillsArray,
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
      await loadAboutData();
    } catch (error) {
      console.error("Error updating about data:", error);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading about data...</div>;
  }

  return (
    <div className="max-w-3xl">
      <h2 className="text-2xl font-bold mb-6">Edit About Me Section</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            Intro / About You
          </label>
          <textarea
            value={formData.intro}
            onChange={(e) => setFormData({ ...formData, intro: e.target.value })}
            placeholder="Describe yourself briefly..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black min-h-24"
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            This appears as the intro on your About page under the portrait.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Career Summary
          </label>
          <textarea
            value={formData.careerSummary}
            onChange={(e) =>
              setFormData({ ...formData, careerSummary: e.target.value })
            }
            placeholder="Tell your career journey, experiences, and achievements..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black min-h-32"
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            This appears in the &quot;My Career So Far&quot; section.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Skills (comma separated)
          </label>
          <textarea
            value={formData.skills}
            onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
            placeholder="UI/UX DESIGN, FULL-STACK DEVELOPMENT, REACT/NEXTJS, WIREFRAMING..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black min-h-20"
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            These will be displayed as skill tags on your About page.
          </p>
        </div>

        <div className="flex gap-2 items-center">
          <button
            type="submit"
            className="px-8 py-2 bg-black text-white rounded-lg hover:opacity-90 font-semibold"
          >
            Save About Section
          </button>
          {saved && (
            <span className="text-green-600 font-medium animate-pulse">
              ✓ Saved successfully
            </span>
          )}
        </div>
      </form>

      <div className="mt-8 p-4 bg-amber-50 rounded-lg">
        <p className="text-sm text-amber-900">
          📝 <strong>Note:</strong> Changes will appear on your About page
          immediately. The portrait photo can be updated separately by uploading
          a new image to /public/anuj.jpg.
        </p>
      </div>
    </div>
  );
}
