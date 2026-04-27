import { useFadeIn } from "../hooks/useFadeIn";
import { PROJECTS } from "../data";
import ProjectCarousel from "./ProjectCarousel";

export default function Projects() {
  const ref = useFadeIn();
  return (
    <section className="section fade-reveal" id="projects" ref={ref}>
      <div className="container">
        <div className="section-header">
          <p className="section-eyebrow">Works</p>
          <h2 className="section-title">Recent Projects</h2>
        </div>
        <div className="projects-grid">
          {PROJECTS.map(p => (
            <div key={p.title} className="glass-card project-card">
              <ProjectCarousel images={p.images} />
              <div className="project-content">
                <span className="project-badge">{p.badge}</span>
                <h3 className="project-title">{p.title}</h3>
                <p className="project-desc">{p.desc}</p>
                <div className="project-tech">
                  {p.tech.map(t => <span key={t}>{t}</span>)}
                </div>
                <div className="project-links">
                  <a href={p.live} target="_blank" rel="noreferrer" className="project-link">View Demo</a>
                  <a href={p.github} target="_blank" rel="noreferrer" className="project-link">Code</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
