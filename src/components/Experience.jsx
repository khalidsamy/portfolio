import { useFadeIn } from "../hooks/useFadeIn";
import { EXPERIENCE } from "../data";

export default function Experience() {
  const ref = useFadeIn();
  return (
    <section className="section fade-reveal" id="experience" ref={ref}>
      <div className="container">
        <div className="experience-layout">
          <div>
            <div className="section-header">
              <p className="section-eyebrow">Timeline</p>
              <h2 className="section-title">Experience</h2>
            </div>
            <div className="exp-timeline">
              {EXPERIENCE.map(exp => (
                <div key={exp.role} className="exp-node">
                  <p className="exp-date">{exp.period}</p>
                  <h3 className="exp-role">{exp.role}</h3>
                  <p className="exp-company">{exp.company}</p>
                  <ul className="exp-desc">
                    {exp.points.map(pt => <li key={pt}>{pt}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="section-header">
              <p className="section-eyebrow">Growth</p>
              <h2 className="section-title">Education</h2>
            </div>
            <div className="glass-card edu-glass">
              <p className="exp-date">Oct 2022 – Jun 2026<span className="edu-expected">(Expected)</span></p>
              <h3 className="exp-role">Bachelor of Business Administration</h3>
              <p className="exp-company">Business Informatics & Digital Transformation</p>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '16px', borderTop: '1px solid var(--card-border)', paddingTop: '16px' }}>
                Helwan National University · Giza, Egypt<br />
                <strong>GPA: 3.6</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
