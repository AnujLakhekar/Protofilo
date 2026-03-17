import React from "react";
import AboutNavbar, { NavItem } from "./Navbar";

const navItems: NavItem[] = [
    { label: "Home", href: "/" },
    { label: "GitHub", href: "https://github.com/anujlakhekar" },
    { label: "LinkedIn", href: "https://linkedin.com/in/anujlakhekar" },
    { label: "About", href: "#about" },
];

const skills = [
    "UI/UX DESIGN",
    "FULL-STACK DEVELOPMENT",
    "REACT/NEXTJS",
    "WIREFRAMING",
    "PROBLEM SOLVING",
    "RESEARCHER",
    "GAME DEVELOPMENT",
    "LEADERSHIP",
    "BLENDER",
    "PHOTOSHOP",
    "FL STUDIO",
];

const AboutPanel = () => {
    return (
        <main className="about-page">
            <div className="about-frame">
                <AboutNavbar
                    name="Anuj Lakhekar - About"
                    markText="A"
                    links={navItems}
                    workHref="/work"
                    workLabel="View Work"
                />

                <section id="about" className="hero-section">
                    <div className="portrait-wrap animate-rise delay-1">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="rounded-logo.png"
                            alt="Portrait"
                            className="portrait"
                        />
                    </div>

                    <div className="hero-copy animate-rise delay-2">
                        <h1>Hi there!</h1>
                        <p>
                            Fuelled by a passion for developing projects, I have a
                            deep desire to excel and continuously improve in my work. Learn
                            more about my journey below.
                        </p>
                    </div>
                </section>

                <section id="work" className=" career-section">
                    <div className=" career-copy animate-rise delay-3">
                        <h2>My Career So Far</h2>
                        <p>
                            Always up for a challenge, I have worked for schologama team and was
                            a member of one of the TechSpot as cohead.
                            From there, I worked my way up to web developer and
                            Team Lead where I oversaw the development of multiple web
                            apps. Currently, I am working with game devlopement and Learning ai and other things like blender , photoshop and fl studio to inscrease my skillset and to be able to work on more projects.
                        </p>
                    </div>

                    <div className="skill-grid lg:pt-20 animate-rise delay-4">
                        {skills.map((skill) => (
                            <span key={skill} className="skill-chip">
                                {skill}
                            </span>
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
};

export default AboutPanel;
