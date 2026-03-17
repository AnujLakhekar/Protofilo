import Navbar, { NavItem } from "../../../components/Navbar";

type Project = {
  title: string;
  summary: string;
  status: "Planned" | "In Progress" | "Ready for Data";
  tags: string[];
};

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "GitHub", href: "https://github.com/anujlakhekar" },
  { label: "LinkedIn", href: "https://linkedin.com/in/anujlakhekar" },
  { label: "About", href: "/#about" },
];

const projects: Project[] = [
  {
    title: "Portfolio CMS Template",
    summary:
      "Admin-focused layout for posting new projects with media, links, and feature flags.",
    status: "Ready for Data",
    tags: ["Next.js", "TypeScript", "Dashboard UI"],
  },
  {
    title: "Project Showcase Board",
    summary:
      "Public-facing gallery template with cards, filtering, and project detail slots.",
    status: "In Progress",
    tags: ["Grid System", "Tag Filters", "Case Study"],
  },
  {
    title: "Asset Upload Flow",
    summary:
      "Dropzone and progress state placeholders for future image/video upload integration.",
    status: "Planned",
    tags: ["Upload Queue", "Validation", "Storage"],
  },
  {
    title: "Analytics Snapshot",
    summary:
      "Prebuilt KPI card region ready to be wired with database metrics and usage stats.",
    status: "Planned",
    tags: ["Metrics", "Charts", "Reporting"],
  },
];

const WorkPage = () => {
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
           This page tells about the projects I've been working on. It's a work in progress, but I'm excited to share the templates and integrations I'm developing to make it easy for other creators to showcase their work too.
          </p>
        </section>

        <section className="project-grid animate-rise delay-2">
          {projects.map((project) => (
            <article key={project.title} className="project-card">
              <div className="project-card-head">
                <h2>{project.title}</h2>
                <span className="status-pill">{project.status}</span>
              </div>
              <p>{project.summary}</p>
              <div className="tag-row">
                {project.tags.map((tag) => (
                  <span key={tag} className="skill-chip">
                    {tag}
                  </span>
                ))}
              </div>
              <button className="card-action" type="button">
                Open Template
              </button>
            </article>
          ))}
        </section>

        <section className="integration-grid animate-rise delay-3">
          <article className="integration-card">
            <h3>Upload Integration Placeholder</h3>
            <p>
              Add API route and cloud storage wiring here for image/video
              uploads.
            </p>
            <ul>
              <li>File picker slot</li>
              <li>Progress + retry states</li>
              <li>Metadata capture fields</li>
            </ul>
          </article>

          <article className="integration-card">
            <h3>Database Integration Placeholder</h3>
            <p>
              Connect your database and replace static arrays with dynamic query
              results.
            </p>
            <ul>
              <li>Project table schema</li>
              <li>Admin CRUD endpoints</li>
              <li>Publish and draft workflow</li>
            </ul>
          </article>
        </section>
      </div>
    </main>
  );
};

export default WorkPage;