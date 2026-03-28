"use client";

import { useState, useEffect } from "react";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  type User,
} from "firebase/auth";
import ProjectManager from "./components/ProjectManager";
import FeaturedProjectManager from "./components/FeaturedProjectManager";
import CurrentStateManager from "./components/CurrentStateManager";
import AboutManager from "./components/AboutManager";
import { auth } from "@/lib/firebase";

type TabType = "projects" | "featured" | "current" | "about";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>("projects");
  const [authLoading, setAuthLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  const allowedEmails = (process.env.NEXT_PUBLIC_ADMIN_EMAILS || "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);

  const isAllowedAdmin =
    !!user?.email && allowedEmails.includes(user.email.toLowerCase());

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    await signInWithPopup(auth, new GoogleAuthProvider());
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-gray-50 to-gray-100">
        <p className="text-gray-600">Checking admin access...</p>
      </div>
    );
  }

  if (allowedEmails.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-gray-50 to-gray-100 px-6">
        <div className="w-full max-w-lg rounded-lg border border-gray-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900">Admin Access Not Configured</h1>
          <p className="mt-3 text-sm text-gray-600">
            Set NEXT_PUBLIC_ADMIN_EMAILS in your environment file to enable admin access.
          </p>
        </div>
      </div>
    );
  }

  if (!user || !isAllowedAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-gray-50 to-gray-100 px-6">
        <div className="w-full max-w-lg rounded-lg border border-gray-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900">Admin Access Required</h1>
          <p className="mt-3 text-sm text-gray-600">
            Sign in with an authorized admin account to manage portfolio data.
          </p>

          {!user ? (
            <button
              onClick={handleLogin}
              className="mt-6 inline-flex items-center rounded-lg bg-black px-5 py-2.5 text-sm font-semibold text-white"
            >
              Sign in with Google
            </button>
          ) : (
            <>
              <p className="mt-4 text-xs text-red-600">{user.email} is not allowlisted.</p>
              <button
                onClick={handleLogout}
                className="mt-4 inline-flex items-center rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700"
              >
                Sign out
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your portfolio content and updates</p>
          <p className="mt-2 text-xs text-gray-500">Signed in as {user.email}</p>
          <button
            onClick={handleLogout}
            className="mt-3 inline-flex items-center rounded-md border border-gray-300 px-3 py-1.5 text-xs font-semibold text-gray-700"
          >
            Sign out
          </button>
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
