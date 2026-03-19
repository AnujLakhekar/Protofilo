"use client";

import { useState, useEffect } from "react";
import ProjectManager from "./components/ProjectManager";
import FeaturedProjectManager from "./components/FeaturedProjectManager";
import CurrentStateManager from "./components/CurrentStateManager";
import AboutManager from "./components/AboutManager";

type TabType = "projects" | "featured" | "current" | "about";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>("projects");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your portfolio content and updates</p>
        </header>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-8 border-b border-gray-300">
          <button
            onClick={() => setActiveTab("projects")}
            className={`px-6 py-3 font-semibold transition-all ${
              activeTab === "projects"
                ? "border-b-2 border-black text-black"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            All Projects
          </button>
          <button
            onClick={() => setActiveTab("featured")}
            className={`px-6 py-3 font-semibold transition-all ${
              activeTab === "featured"
                ? "border-b-2 border-black text-black"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Featured Projects
          </button>
          <button
            onClick={() => setActiveTab("current")}
            className={`px-6 py-3 font-semibold transition-all ${
              activeTab === "current"
                ? "border-b-2 border-black text-black"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Current Status
          </button>
          <button
            onClick={() => setActiveTab("about")}
            className={`px-6 py-3 font-semibold transition-all ${
              activeTab === "about"
                ? "border-b-2 border-black text-black"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            About Me
          </button>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-md p-8">
          {activeTab === "projects" && <ProjectManager />}
          {activeTab === "featured" && <FeaturedProjectManager />}
          {activeTab === "current" && <CurrentStateManager />}
          {activeTab === "about" && <AboutManager />}
        </div>
      </div>
    </div>
  );
}
