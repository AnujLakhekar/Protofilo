"use client";

import React, {useEffect, useRef} from "react";
import {Code, Github, Instagram, Linkedin, Mail} from "lucide-react";
import ExperienceBlockComponent from "../../components/ExperienceBlock";
import Projects from "../../components/projects";
import Coonnect from "../../components/Coonnect";


export default function Home() {
    const [currentPage, setCurrentPage] = React.useState("About");
    const pages = ["About", "Projects", "Experience", "Connect"];
    const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

    // IntersectionObserver for scrollspy
    useEffect(() => {
        const observer = new window.IntersectionObserver(
            (entries) => {
                const visible = entries.filter((entry) => entry.isIntersecting);
                if (visible.length > 0) {
                    // Find the section closest to the top
                    const topSection = visible.reduce((prev, curr) =>
                        prev.boundingClientRect.top < curr.boundingClientRect.top ? prev : curr
                    );
                    setCurrentPage(
                        (topSection.target as HTMLDivElement).id.replace(/^(.)/, (c) => c.toUpperCase())
                    );
                }
            },
            {
                threshold: 0.5,
            }
        );
        sectionRefs.current.forEach((ref) => {
            if (ref) observer.observe(ref);
        });
        return () => {
            sectionRefs.current.forEach((ref) => {
                if (ref) observer.unobserve(ref);
            });
        };
    }, []);

    const socialLinks = [
        {icon: <Github/>, url: "https://github.com/AnujLakhekar"},
        {icon: <Linkedin/>, url: "https://linkedin.com/in/anuj-lakhekar"},
        {icon: <Instagram/>, url: "https://instagram.com/anujlakhekar"},
        {icon: <Code/>, url: "https://leetcode.com/anujlakhekar/"},
        {icon: <Mail/>, url: "mailto:anuj.lakhekar@gmail.com"},
    ];

    const Experience = [
        {
            timeline: "2022 - Present",
            company: "Klaviyo",
            role: "Senior Frontend Engineer",
            description:
                "Working on the component library team to maintain and evolve our design system, with a focus on accessibility across components, tooling, and patterns.",
            languages: ["React", "TypeScript", "Tailwind CSS"],
        },
    ];

    return (
        <div className="flex flex-col md:flex-row justify-center min-h-screen md:gap-[15rem] p-6 bg-background text-slate-300 font-sans">

            {/* LEFT SIDEBAR */}
            <div
                id="fixedpanel"
                className="flex flex-row md:flex-col justify-between md:fixed md:left-20 md:top-0 md:h-screen py-6 md:py-12 w-full md:w-auto bg-background z-10"
            >
                <div>
                    <h1 className="text-3xl md:text-5xl font-bold text-slate-200">Anuj Lakhekar</h1>
                    <h2 className="mt-2 md:mt-3 text-lg md:text-xl font-medium text-slate-200">Software Engineer</h2>
                    <p className="mt-2 md:mt-4 max-w-xs text-slate-400">I build accessible, pixel-perfect digital experiences for the web.</p>

                    <div className="mt-8 md:mt-16 block md:hidden">
                        <div className="flex flex-col gap-4">
                            {pages.map((page) => (
                                <a
                                    href={`#${page.toLowerCase()}`}
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`flex items-center gap-2 md:gap-4 cursor-pointer group ${currentPage === page ? "text-yellow-600" : "text-slate-500"}`}
                                >
                                    <hr
                                        className={`border-t-2 transition-all duration-300 group-hover:w-8 md:group-hover:w-16 group-hover:border-slate-200 ${currentPage === page ? "w-8 md:w-16 border-slate-200" : "w-4 md:w-8 border-slate-500"}`}
                                    />
                                    <span className="text-xs font-bold tracking-widest uppercase group-hover:text-yellow-500">{page}</span>
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="mt-16 hidden md:block">
                        <div className="flex flex-col gap-4">
                            {pages.map((page) => (
                                <a
                                    href={`#${page.toLowerCase()}`}
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`flex items-center gap-4 cursor-pointer group ${currentPage === page ? "text-yellow-600" : "text-slate-500"}`}
                                >
                                    <hr
                                        className={`border-t-2 transition-all duration-300 group-hover:w-16 group-hover:border-slate-200 ${currentPage === page ? "w-16 border-slate-200" : "w-8 border-slate-500"}`}
                                    />
                                    <span className="text-xs font-bold tracking-widest uppercase group-hover:text-yellow-500">{page}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-8 m-2 flex flex-col sm:flex-row bg-white/10 border-2 border-white/15 justify-center p-2 rounded-lg items-center gap-6">
                    {socialLinks.map((link, index) => {
                        const isExternalLink =
                            link.url.startsWith("http://") ||
                            link.url.startsWith("https://");
                        return (
                            <a
                                key={index}
                                href={link.url}
                                target={isExternalLink ? "_blank" : undefined}
                                rel={isExternalLink ? "noopener noreferrer" : undefined}
                                className="text-slate-400 hover:text-slate-200"
                            >
                                {link.icon}
                            </a>
                        );
                    })}
                </div>
            </div>

            {/* RIGHT CONTENT */}
            <div className="w-full max-w-3xl md:ml-[28rem] h-auto md:h-screen overflow-y-auto scroll-smooth rightpannel snap-y snap-mandatory mt-8 md:mt-0">

                <div
                    id="about"
                    ref={el => { sectionRefs.current[0] = el; }}
                    className="snap-start min-h-screen flex flex-col justify-center px-8"
                >
                    <p className="mb-4">
                        I&apos;m a frontend engineer with a specialty in web accessibility,
                        focused on building pixel-perfect, intuitive user interfaces. I
                        enjoy working at the intersection of design and engineering,
                        where great user experience meets robust, clean, and scalable code.
                    </p>

                    <p className="mb-4">
                        Currently, I&apos;m a senior frontend engineer at Klaviyo, where I
                        work on the component library team to help maintain and evolve
                        our design system. In this role, I lead accessibility efforts
                        across components, tooling, and patterns, partnering closely with
                        designers and engineers to ensure accessibility is part of our
                        core architecture.
                    </p>

                    <p>
                        Previously, I&apos;ve worked across a wide range of environments,
                        from product studios to startups and large tech companies,
                        including Apple, Starry Internet, and Upstatement. Alongside my
                        professional work, I also created an online video course a few
                        years ago which walks through building a real-world, API-driven
                        application from scratch.
                    </p>
                </div>

                <div
                    id="projects"
                    ref={el => { sectionRefs.current[1] = el; }}
                    className="snap-start min-h-screen flex flex-col justify-center px-8"
                >
                    <h2 className="text-2xl font-bold text-slate-200 mb-4">
                        Projects
                    </h2>
                    <Projects/>
                </div>

                <div
                    id="experience"
                    ref={el => { sectionRefs.current[2] = el; }}
                    className="snap-start min-h-screen flex flex-col justify-center px-8"
                >
                    <h2 className="text-2xl font-bold text-slate-200 mb-4">
                        Experience
                    </h2>
                    <div className={"p-2 flex justify-center items-center rounded-lg"}>
                        <ExperienceBlockComponent experiences={Experience}/>
                    </div>
                </div>

                <div
                    id="connect"
                    ref={el => { sectionRefs.current[3] = el; }}
                    className="snap-start min-h-screen flex flex-col justify-center px-8"
                >
                    <h2 className="text-2xl font-bold text-slate-200 mb-4">
                        Connect me just 3 steps away
                    </h2>

                    <div className={"mt-18 "}>
                        <Coonnect/>
                    </div>

                </div>

            </div>
        </div>
    );
}

/* Add responsive stacking for left/right panels on mobile */
/* On mobile, left sidebar and right content should stack vertically, not side by side. */
/* The current flex-col md:flex-row achieves this, but let's ensure the left sidebar is not fixed on mobile. */
