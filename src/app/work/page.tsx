"use client";

import { useEffect, useState } from "react";
import Navbar, { NavItem } from "../../../components/Navbar";
import { getProjects, type Project } from "@/lib/firestoreService";
import Link from "next/link";
import { SiWebpack } from "react-icons/si";
import { FaGithub } from "react-icons/fa6";
import Skeleton from "@/components/ui/skeleton";

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
    return (
      <div className="min-h-screen px-6 py-12 md:px-16">
        <div className="mx-auto max-w-6xl space-y-6">
          <Skeleton className="h-12 w-1/3" />
          <Skeleton className="h-16 w-full" />
          <div className="grid gap-6 md:grid-cols-2">
            <Skeleton className="h-52 w-full" />
            <Skeleton className="h-52 w-full" />
            <Skeleton className="h-52 w-full" />
            <Skeleton className="h-52 w-full" />
          </div>
        </div>
      </div>
    );
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
            This page tells about the projects I&apos;ve been working on.
            It&apos;s a work in progress, but I&apos;m excited to share the
            templates and integrations I&apos;m developing to make it easy for
            other creators to showcase their work too.
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
                <div className="flex gap-3">
                  {project.demoUrl && (
                    <button className="card-action" type="button">
                      <Link
                        className="flex gap-3 justify-center items-center"
                        href={project.demoUrl || project.githubUrl || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        open with <SiWebpack size={24} />
                      </Link>
                    </button>
                  )}
                  {project.githubUrl && (
                    <button className="card-action" type="button">
                      <Link
                        className="flex gap-3 justify-center items-center"
                        href={project.githubUrl || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        open with <FaGithub size={24} />
                      </Link>
                    </button>
                  )}
                </div>
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
