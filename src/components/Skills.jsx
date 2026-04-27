import { useFadeIn } from "../hooks/useFadeIn";
import { SKILLS } from "../data";

export default function Skills() {
  const ref = useFadeIn();
  return (
    <section className="section fade-reveal" id="skills" ref={ref}>
      <div className="container">
        <div className="section-header">
          <p className="section-eyebrow">Abilities</p>
          <h2 className="section-title">Core Stack</h2>
        </div>
        <div className="skills-grid">
          {Object.entries(SKILLS).map(([cat, tags]) => (
            <div key={cat} className="glass-card skill-card">
              <h3>{cat}</h3>
              <div className="skill-tags">
                {tags.map(t => <span key={t} className="skill-tag">{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
