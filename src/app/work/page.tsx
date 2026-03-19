"use client";

import { useEffect, useState } from "react";
import Navbar, { NavItem } from "../../../components/Navbar";
import { getProjects, type Project } from "@/lib/firestoreService";

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "GitHub", href: "https://github.com/anujlakhekar" },
  { label: "LinkedIn", href: "https://linkedin.com/in/anujlakhekar" },
  { label: "About", href: "/#about" },
];

const WorkPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (error) {
        console.error("Error loading projects:", error);
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <main className="work-page">
      <div className="work-frame">
        <Navbar
          name="Anuj Lakhekar - Work"
          markText="A"
          links={navItems}
          workHref="/#contact"
          workLabel="Contact"
        />

        <section className="work-hero animate-rise delay-1">
          <h1>Works</h1>
          <p>
           This page tells about the projects I&apos;ve been working on. It&apos;s a work in progress, but I&apos;m excited to share the templates and integrations I&apos;m developing to make it easy for other creators to showcase their work too.
          </p>
        </section>

        <section className="project-grid animate-rise delay-2">
          {projects.length > 0 ? (
            projects.map((project) => (
              <article key={project.id} className="project-card">
                <div className="project-card-head">
                  <h2>{project.title}</h2>
                  <span className="status-pill">{project.status}</span>
                </div>
                <p>{project.summary}</p>
                <div className="tag-row">
                  {project.tags?.map((tag) => (
                    <span key={tag} className="skill-chip">
                      {tag}
                    </span>
                  ))}
                </div>
                <button className="card-action" type="button">
                  Open Template
                </button>
              </article>
            ))
          ) : (
            <p className="text-gray-500">No projects yet. Check back soon!</p>
          )}
        </section>
      </div>
    </main>
  );
};

export default WorkPage;