import React from "react";

export type NavItem = {
  label: string;
  href: string;
};

type AboutNavbarProps = {
  name: string;
  markText?: string;
  links: NavItem[];
  workHref?: string;
  workLabel?: string;
};

const AboutNavbar = ({
  name,
  markText = "S",
  links,
  workHref = "#work",
  workLabel = "View Work",
}: AboutNavbarProps) => {
  return (
    <header className="about-nav animate-fade-in">
      <a className="brand" href="#">
        <span className="brand-mark" aria-hidden>
          {markText}
        </span>
        <span className="brand-name">{name}</span>
      </a>

      <nav className="nav-links" aria-label="Primary">
        {links.map((item) => (
          <a key={item.label} href={item.href}>
            {item.label}
          </a>
        ))}
        <a className="work-btn" href={workHref}>
          {workLabel}
        </a>
      </nav>
    </header>
  );
};

export default AboutNavbar;
