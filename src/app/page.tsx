"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getFeaturedProjects, getCurrentState, type FeaturedProject, type CurrentState } from "@/lib/firestoreService";

const skills = [
  "React",
  "Next.js",
  "TypeScript",
  "Firebase",
  "MongoDB",
  "Express",
  "UI/UX",
  "Animations",
  "REST APIs",
];

const workflow = [
  {
    title: "Discover",
    desc: "Understand goals, user pain points, and the fastest MVP path.",
  },
  {
    title: "Build",
    desc: "Ship clean, scalable components with performance in mind.",
  },
  {
    title: "Polish",
    desc: "Refine UX details, test edge cases, and improve reliability.",
  },
];

const stats = [
  { label: "Projects Built", value: "15+" },
  { label: "Core Stack", value: "MERN + Next" },
  { label: "Focus", value: "Product UX" },
  { label: "Current", value: "Web + Game Dev" },
];

const defaultFeaturedProjects = [
  {
    title: "Chat App",
    description: "Realtime chat experience with auth, online presence, and responsive UI.",
    tags: ["Firebase", "React", "Realtime"],
  },
  {
    title: "Resume Builder",
    description: "Create polished resumes with editable sections and quick export flow.",
    tags: ["Next.js", "UX", "PDF"],
  },
  {
    title: "Todo App",
    description: "Minimal task manager focused on speed, clarity, and smooth interactions.",
    tags: ["TypeScript", "Animations", "UI"],
  },
];

export default function Home() {
  const [featuredProjects, setFeaturedProjects] = useState<FeaturedProject[]>([]);
  const [currentState, setCurrentState] = useState<CurrentState | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [projects, state] = await Promise.all([
          getFeaturedProjects(),
          getCurrentState(),
        ]);
        setFeaturedProjects(projects);
        setCurrentState(state);
      } catch (error) {
        console.error("Error loading home data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const projectsToShow = featuredProjects.length > 0 ? featuredProjects : defaultFeaturedProjects.map((p, i) => ({
    id: `default-${i}`,
    title: p.title,
    desc: p.description,
    tags: p.tags,
    createdAt: Date.now(),
    status: "Live" as const,
  }));

  return (
    <div>
      <main className="home-page bg-white text-black pt-16 md:pt-20 animate-fade-in">
        {/* HERO SECTION (SIDE IMAGE) */}
        <section className="min-h-[78vh] grid md:grid-cols-2 items-center px-6 md:px-16 gap-10 md:gap-14 animate-rise delay-1">
          {/* LEFT TEXT */}
          <div>
            <span className="inline-flex items-center rounded-full border border-black/15 bg-black/5 px-4 py-1 text-xs font-semibold tracking-wide mb-5 uppercase">
              Open to internships and freelance
            </span>

            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              Building <span className="text-indigo-500">Modern</span>{" "}
              Experiences
            </h1>

            <p className="mt-6 text-gray-600 text-lg max-w-xl leading-relaxed">
              I&apos;m Anuj - a developer focused on crafting fast, beautiful
              and scalable web applications with modern technologies.
            </p>

            <div className="mt-8 flex gap-4">
              <Link href={"/work"}>
                <button className="bg-black text-white px-6 py-3 rounded-full hover:opacity-80 transition">
                  View Work
                </button>
              </Link>

              <Link href={"/about"}>
                <button className="border border-black px-6 py-3 rounded-full hover:bg-black hover:text-white transition">
                  About Me
                </button>
              </Link>
            </div>

            <p className="mt-5 text-sm text-gray-500 max-w-lg">
              I enjoy turning ideas into polished products with thoughtful
              design, clean code, and real-world usability.
            </p>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative w-full h-80 md:h-130">
            <Image
              src="/bg.jpg"
              alt="preview"
              fill
              className="object-cover rounded-2xl pointer-events-none"
              priority={true}
            />

            <div className="absolute bottom-4 left-0 rounded-xl border border-green-600 bg-green-300/65 px-4 py-3">
              <div className="text-[13px] text-red-600 right-2 absolute top-2">Live</div>
              <p className="text-xs text-green-900">Now building </p>
              <p className="text-sm text-green-950 font-semibold">
                {currentState?.title || "Portfolio + Product Experiments"}
              </p>
            </div>
          </div>
        </section>

        {/* QUICK STATS */}
        <section className="px-6 md:px-16 pb-6 md:pb-10 animate-rise delay-2">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {stats.map((item, index) => (
              <div
                key={item.label}
                className="rounded-xl border border-black/10 bg-black/2 p-4 animate-rise"
                style={{ animationDelay: `${0.12 + index * 0.05}s` }}
              >
                <p className="text-xs text-gray-500 uppercase tracking-wide">
                  {item.label}
                </p>
                <p className="mt-1 text-base font-semibold">{item.value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SKILLS */}
        <section className="px-6 md:px-16 py-14 animate-rise delay-3">
          <h2 className="text-3xl font-bold mb-3">What I Work With</h2>
          <p className="text-gray-600 max-w-2xl mb-6">
            A practical stack for shipping full web products from UI to backend.
          </p>

          <div className="flex flex-wrap gap-3">
            {skills.map((skill) => (
              <span
                key={skill}
                className="px-4 py-2 border border-gray-300 rounded-full text-sm hover:bg-black hover:text-white transition"
              >
                {skill}
              </span>
            ))}
          </div>

          <div className="mt-8 grid md:grid-cols-3 gap-4">
            {workflow.map((step, index) => (
              <div
                key={step.title}
                className="rounded-xl border border-black/10 p-5 animate-rise"
                style={{ animationDelay: `${0.18 + index * 0.08}s` }}
              >
                <h3 className="font-semibold text-lg">{step.title}</h3>
                <p className="text-sm text-gray-600 mt-2">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* PROJECTS */}
        <section className="px-6 md:px-16 py-14 animate-rise delay-4">
          <div className="flex items-end justify-between gap-4 mb-8">
            <h2 className="text-3xl font-bold">Featured Projects</h2>
            <Link href="/work" className="text-sm underline underline-offset-4">
              See all work
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {projectsToShow.slice(0, 3).map((project, index) => (
              <article
                key={project.id || project.title}
                className="p-6 border border-black/10 rounded-xl hover:shadow-lg transition animate-rise"
                style={{ animationDelay: `${0.2 + index * 0.1}s` }}
              >
                <h3 className="text-xl font-semibold">{project.title}</h3>
                <p className="text-gray-600 mt-2">{project.desc}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-black/5 px-3 py-1 text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 md:px-16 py-16 md:py-20 text-center animate-rise">
          <h2 className="text-3xl md:text-4xl font-bold">
            Let’s Build Something Awesome
          </h2>

          <p className="mt-3 text-gray-600 max-w-xl mx-auto">
            If you have an idea, project, or team that needs a developer who can
            blend design and engineering, let&apos;s connect.
          </p>

          <div className="mt-6 flex items-center justify-center gap-3">
            <Link href="https://linkedin.com/in/anujlakhekar" target="_blank">
              <button className="bg-black text-white px-8 py-3 rounded-full hover:opacity-80 transition">
                Get In Touch
              </button>
            </Link>
            <Link href="/about">
              <button className="border border-black px-6 py-3 rounded-full hover:bg-black hover:text-white transition">
                Know More
              </button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
