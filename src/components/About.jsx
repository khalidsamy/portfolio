import { useFadeIn } from "../hooks/useFadeIn";

export default function About() {
  const ref = useFadeIn();
  return (
    <section className="section fade-reveal" id="about" ref={ref}>
      <div className="container">
        <div className="about-grid">
          <div className="about-photo-wrap">
            <div className="hexagon-frame">
              <div className="hexagon-inner">
                <img src="/khalidSamy.jpg" alt="Khalid Samy" onError={e => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }} />
                <div className="photo-initials" style={{ display: 'none' }}>KS</div>
              </div>
            </div>
          </div>
          <div className="about-text">
            <div className="section-header">
              <p className="section-eyebrow">Expertise</p>
              <h2 className="section-title">About Me</h2>
            </div>
            <p style={{ fontSize: '18px', color: 'var(--text)', marginBottom: '20px', fontWeight: 500 }}>
              Passionate about bridging the gap between design and technology.
            </p>
            <p style={{ color: 'var(--text-muted)', marginBottom: '28px' }}>
              I am a React Front-End Developer with a background in Business Informatics. I completed a 6-month internship at the Digital Egypt Pioneers Initiative (DEPI), where I led the frontend development of a Top 10 national graduation project.
              I thrive on creating clean, performant code and intuitive user experiences.
            </p>
            <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
              <div>
                <p style={{ color: 'var(--accent)', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase' }}>Education</p>
                <p style={{ fontWeight: 600 }}>Business Informatics</p>
              </div>
              <div>
                <p style={{ color: 'var(--accent)', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase' }}>Location</p>
                <p style={{ fontWeight: 600 }}>Giza, Egypt</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
