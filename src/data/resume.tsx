import React from "react";
import { Icons } from "@/components/icons";
import { Gamepad, HomeIcon, NotebookIcon } from "lucide-react";
import { ReactLight } from "@/components/ui/svgs/reactLight";
import { NextjsIconDark } from "@/components/ui/svgs/nextjsIconDark";
import { Typescript } from "@/components/ui/svgs/typescript";
import { Nodejs } from "@/components/ui/svgs/nodejs";
import { Python } from "@/components/ui/svgs/python";
import { Golang } from "@/components/ui/svgs/golang";
import { Postgresql } from "@/components/ui/svgs/postgresql";
import { Docker } from "@/components/ui/svgs/docker";
import { Kubernetes } from "@/components/ui/svgs/kubernetes";
import { Java } from "@/components/ui/svgs/java";
import { Csharp } from "@/components/ui/svgs/csharp";

export const DATA = {
  name: "Anuj Lakhekar",
  initials: "AL",
  url: "https://anujlakhekar.is-a.dev/",
  location: "Nagpur, India",
  locationLink: "https://www.google.com/maps/place/nagpur",
  description:
    "I’m a full-stack developer passionate about building fast, scalable web apps with smooth user experiences. I love solving problems and delivering reliable digital solutions.",
  summary:
    "Full-stack developer with a focus on creating high-performance web applications and clean, user-friendly interfaces. I enjoy turning complex ideas into simple, effective digital products.",
  avatarUrl: "/me.png",
  skills: [
    { name: "React", icon: ReactLight },
    { name: "Next.js", icon: NextjsIconDark },
    { name: "Typescript", icon: Typescript },
    { name: "Node.js", icon: Nodejs },
    { name: "Python", icon: Python },
    { name: "Kubernetes", icon: Kubernetes },
    { name: "Java", icon: Java },
    { name: "C#", icon: Csharp },
  ],
  navbar: [{ href: "/", icon: HomeIcon, label: "Home" }],
  contact: {
    email: "anujlakhekar4@gmail.com",
    tel: "9322462126",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/Anujlakhekar",
        icon: Icons.github,
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/anuj-lakhekar-72a43033b/",
        icon: Icons.linkedin,
        navbar: true,
      },
      X: {
        name: "X",
        url: "https://x.com/AnujLakhekar",
        icon: Icons.x,
        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "#",
        icon: Icons.email,
        navbar: false,
      },
    },
  },
  work: [],
  education: [
    {
      school: "JDCOEM",
      href: "https://jdcoem.ac.in/",
      degree: "s1 s2 s3",
      logoUrl: "./jdcoem.png",
      start: "2023",
      end: "2028",
    },
  ],
  projects: [
    {
      title: "Wireboard",
      href: "https://wireboard.vercel.app",
      dates: "Jan 2025 - Feb 2026",
      active: false,
      description:
        "A collaborative board for fast ideation and production-ready documents. Start with your blank board, then plug in tools like Document Creator and AI flows.",
      technologies: [
        "Next.js",
        "Typescript",
        "convex",
        "TailwindCSS",
        "Shadcn UI",
      ],
      links: [
        {
          type: "Website",
          href: "https://wireboard.vercel.app",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "./wire.png",
      video: "./wireboard.mp4",
    },
    {
      title: "Football Game",
      href: "https://foot-and-ball.vercel.app/",
      dates: "current",
      active: true,
      description:
        "An gdscript based game with node based state machine and ai players",
      technologies: ["Godot engine", "Gdscript"],
      links: [
        {
          type: "Game",
          href: "https://foot-and-ball.vercel.app/",
          icon: <Gamepad className="size-4" />,
        },
      ],
      image: "./football.png",
      video: "./foot.mp4",
    },
  ],
  hackathons: [
    {
      title: "YCC Hackathon",
      dates: "Feb 2026 26-27",
      location: "YCC, Nagpur",
      description:
        "Developed a mobile application which delivered bedtime stories to children using augmented reality.",
      image: "./ycc.png",
      mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2019/mlh-trust-badge-2019-white.svg",
      links: [] as any[], // Fixes the "never[]" type issue
    },
    {
      title: "HackWack Hackathon",
      dates: "Feb 2026 16 17",
      location: "YCC, Nagpur",
      description:
        "Developed an google based pc sequrity manager ",
      image: "./sb.png",
      mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2019/mlh-trust-badge-2019-white.svg",
      links: [] as any[], // Fixes the "never[]" type issue
    },
  ],
} as const;