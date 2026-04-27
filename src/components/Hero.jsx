import { useTyping } from "../hooks/useTyping";
import { ROLES } from "../data";

export default function Hero() {
  const role = useTyping(ROLES);
  return (
    <section className="hero" id="hero">
      <div className="hero-aurora" />
      <div className="container">
        <div className="hero-content">
          <div className="hero-eyebrow" style={{ animation: "fadeUp 0.8s ease both" }}>Open for Opportunities</div>
          <h1 className="hero-title" style={{ animation: "fadeUp 0.8s ease 0.1s both" }}>
            Khalid<br /><span>Samy</span>
          </h1>
          <div className="hero-role" style={{ animation: "fadeUp 0.8s ease 0.2s both" }}>
            {role}<span className="cursor-pipe" />
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '17px', maxWidth: '580px', marginBottom: '36px', animation: "fadeUp 0.8s ease 0.3s both" }}>
            Building high-performance, accessible, and interactive web experiences. 
            Focused on crafting modern digital interfaces that leave a lasting impression.
          </p>
          <div className="hero-cta" style={{ animation: "fadeUp 0.8s ease 0.4s both" }}>
            <button className="btn btn-primary" onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
              View Projects
            </button>
            <a href="https://docs.google.com/document/d/1-01C9fMUgtoeiM1zTWIu2OFfqq-kqNxV/edit?usp=sharing&ouid=112544007440382184203&rtpof=true&sd=true" target="_blank" rel="noreferrer" className="btn btn-outline">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
              View CV
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
