"use client";

import { useEffect, useState } from "react";
import {
  getCurrentState,
  updateCurrentState,
  type CurrentState,
} from "@/lib/firestoreService";

export default function CurrentStateManager() {
  const [currentState, setCurrentState] = useState<CurrentState | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "",
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    loadCurrentState();
  }, []);

  const loadCurrentState = async () => {
    setLoading(true);
    const data = await getCurrentState();
    if (data) {
      setCurrentState(data);
      setFormData({
        title: data.title,
        description: data.description,
        status: data.status,
      });
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateCurrentState(formData);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
      await loadCurrentState();
    } catch (error) {
      console.error("Error updating current state:", error);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading current status...</div>;
  }

  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-bold mb-6">What Are You Working On?</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g., Building AI-powered Dashboard"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="Describe what you're currently working on..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black min-h-32"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Status</label>
          <input
            type="text"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            placeholder="e.g., In Active Development"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
        </div>

        <div className="flex gap-2 items-center">
          <button
            type="submit"
            className="px-8 py-2 bg-black text-white rounded-lg hover:opacity-90 font-semibold"
          >
            Save Status
          </button>
          {saved && (
            <span className="text-green-600 font-medium animate-pulse">
              ✓ Saved successfully
            </span>
          )}
        </div>
      </form>

      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-900">
          💡 <strong>Tip:</strong> This status appears on your homepage under the
          "Live" section, showing visitors what you&apos;re currently building.
        </p>
      </div>
    </div>
  );
}
