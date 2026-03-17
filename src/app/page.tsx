"use client";
import Image from "next/image";
import AboutNavbar, { NavItem } from "../../components/Navbar";
import Link from "next/link";

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "GitHub", href: "https://github.com/anujlakhekar" },
  { label: "LinkedIn", href: "https://linkedin.com/in/anujlakhekar" },
  { label: "About", href: "#about" },
];

export default function Home() {
  return (
    <div>
      <main className="bg-white text-black">
        {/* HERO SECTION (SIDE IMAGE) */}
        <section className="min-h-screen grid md:grid-cols-2 items-center px-6 md:px-16 gap-10">
          {/* LEFT TEXT */}
          <div>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              Building <span className="text-indigo-500">Modern</span> Web
              Experiences
            </h1>

            <p className="mt-6 text-gray-600 text-lg max-w-xl">
              I'm Anuj — a developer focused on crafting fast, beautiful and
              scalable web applications with modern technologies.
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
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative w-full h-[400px] md:h-[600px]">
            <Image
              src="/bg.jpg"
              alt="preview"
              fill
              className="object-cover rounded-2xl user-select-none  pointer-events-none"
              priority={true}
              onSeekingCapture={(e) => {
                e.currentTarget.style.filter = "blur(20px)";
              }}
            />
          </div>
        </section>

        {/* SKILLS */}
        <section className="px-6 md:px-16 py-20">
          <h2 className="text-3xl font-bold mb-6">What I Work With</h2>

          <div className="flex flex-wrap gap-3">
            {[
              "React",
              "Next.js",
              "Firebase",
              "MongoDB",
              "Express",
              "UI/UX",
              "Animations",
              "APIs",
            ].map((skill) => (
              <span
                key={skill}
                className="px-4 py-2 border border-gray-300 rounded-full text-sm hover:bg-black hover:text-white transition"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* PROJECTS */}
        <section className="px-6 md:px-16 py-20">
          <h2 className="text-3xl font-bold mb-10">Featured Projects</h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 border rounded-xl hover:shadow-lg transition">
              <h3 className="text-xl font-semibold">Chat App</h3>
              <p className="text-gray-600 mt-2">
                Realtime chat using Firebase with modern UI.
              </p>
            </div>

            <div className="p-6 border rounded-xl hover:shadow-lg transition">
              <h3 className="text-xl font-semibold">Resume Builder</h3>
              <p className="text-gray-600 mt-2">
                Create and export professional resumes instantly.
              </p>
            </div>

            <div className="p-6 border rounded-xl hover:shadow-lg transition">
              <h3 className="text-xl font-semibold">Todo App</h3>
              <p className="text-gray-600 mt-2">
                Minimal task manager with smooth animations.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 md:px-16 py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">
            Let’s Build Something Awesome
          </h2>

          <button className="mt-6 bg-black text-white px-8 py-3 rounded-full hover:opacity-80 transition">
            Get In Touch
          </button>
        </section>
      </main>
    </div>
  );
}
