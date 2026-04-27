import { useState, useEffect, useRef } from "react";

/* ─── GLOBAL STYLES ─────────────────────────────────────────── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Outfit:wght@300;400;500;600&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
html{scroll-behavior:smooth;}
body{
  font-family:'Outfit',sans-serif;
  background:#070713;
  color:#dde6f5;
  line-height:1.65;
  -webkit-font-smoothing:antialiased;
  overflow-x:hidden;
}
a{color:inherit;text-decoration:none;}
::-webkit-scrollbar{width:5px;}
::-webkit-scrollbar-track{background:#070713;}
::-webkit-scrollbar-thumb{background:#1c3a6e;border-radius:4px;}

/* ── animations ── */
@keyframes blink{0%,49%{opacity:1}50%,100%{opacity:0}}
@keyframes fadeUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
@keyframes slideIn{from{opacity:0;transform:translateX(-24px)}to{opacity:1;transform:translateX(0)}}
@keyframes glow{0%,100%{box-shadow:0 0 20px rgba(56,189,248,.15)}50%{box-shadow:0 0 40px rgba(56,189,248,.35)}}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes bgFloat{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(20px,-20px) scale(1.05)}}

.fade-up{opacity:0;transform:translateY(32px);transition:opacity .7s cubic-bezier(.22,1,.36,1),transform .7s cubic-bezier(.22,1,.36,1);}
.fade-up.visible{opacity:1;transform:translateY(0);}

/* ── navbar ── */
#navbar{
  position:fixed;top:0;left:0;right:0;z-index:100;
  transition:background .3s,backdrop-filter .3s,border-color .3s;
  border-bottom:1px solid transparent;
}
#navbar.scrolled{
  background:rgba(7,7,19,.85);
  backdrop-filter:blur(16px);
  border-bottom-color:rgba(255,255,255,.06);
}
.nav-inner{
  max-width:1100px;margin:0 auto;padding:18px 24px;
  display:flex;align-items:center;justify-content:space-between;
}
.nav-logo{font-family:'Syne',sans-serif;font-weight:800;font-size:20px;color:#f1f5f9;letter-spacing:-.5px;}
.nav-logo span{color:#38bdf8;}
.nav-links{display:flex;gap:4px;align-items:center;}
.nav-link{
  padding:6px 14px;border-radius:8px;font-size:14px;font-weight:500;
  color:#94a3b8;cursor:pointer;transition:color .2s,background .2s;
}
.nav-link:hover{color:#e2e8f0;background:rgba(255,255,255,.05);}
.nav-link.active{color:#38bdf8;background:rgba(56,189,248,.1);}

/* ── hero ── */
.hero{
  min-height:100vh;display:flex;align-items:center;position:relative;overflow:hidden;
  padding-top:80px;
}
.hero-bg{
  position:absolute;inset:0;pointer-events:none;
  background:
    radial-gradient(ellipse 80% 60% at 50% -10%, rgba(56,189,248,.12) 0%, transparent 70%),
    radial-gradient(circle 400px at 80% 60%, rgba(129,140,248,.07) 0%, transparent 70%);
}
.dot-pattern{
  position:absolute;inset:0;pointer-events:none;
  background-image:radial-gradient(circle,rgba(56,189,248,.07) 1px,transparent 1px);
  background-size:36px 36px;mask-image:radial-gradient(ellipse 80% 80% at 50% 50%,black,transparent);
}
.hero-content{position:relative;z-index:1;max-width:1100px;margin:0 auto;padding:0 24px;width:100%;}
.hero-eyebrow{
  display:inline-flex;align-items:center;gap:8px;
  padding:6px 14px;border-radius:100px;
  background:rgba(56,189,248,.1);border:1px solid rgba(56,189,248,.25);
  font-size:13px;font-weight:500;color:#7dd3fc;margin-bottom:24px;
}
.hero-dot{width:7px;height:7px;border-radius:50%;background:#38bdf8;animation:glow 2s infinite;}
.hero-name{
  font-family:'Syne',sans-serif;font-weight:800;line-height:1.05;
  font-size:clamp(48px,8vw,88px);color:#f1f5f9;margin-bottom:12px;
  letter-spacing:-2px;
}
.hero-name span{color:#38bdf8;}
.hero-role{
  font-size:clamp(18px,3vw,26px);font-weight:300;color:#94a3b8;
  margin-bottom:28px;height:36px;
}
.cursor{display:inline-block;width:2px;height:1em;background:#38bdf8;margin-left:3px;animation:blink 1s infinite;vertical-align:text-bottom;}
.hero-bio{
  max-width:560px;font-size:16px;color:#8892b0;line-height:1.75;
  margin-bottom:40px;
}
.hero-cta{display:flex;gap:14px;flex-wrap:wrap;align-items:center;}
.btn-primary{
  display:inline-flex;align-items:center;gap:8px;
  padding:14px 32px;background:#38bdf8;color:#030a14;
  border-radius:10px;font-weight:700;font-size:15px;
  transition:background .2s,transform .2s,box-shadow .2s;border:none;cursor:pointer;
}
.btn-primary:hover{background:#7dd3fc;transform:translateY(-2px);box-shadow:0 8px 24px rgba(56,189,248,.3);}
.btn-outline{
  display:inline-flex;align-items:center;gap:8px;
  padding:13px 28px;background:transparent;
  border:1.5px solid rgba(255,255,255,.12);color:#94a3b8;
  border-radius:10px;font-weight:500;font-size:15px;
  transition:border-color .2s,color .2s,transform .2s;cursor:pointer;
}
.btn-outline:hover{border-color:#38bdf8;color:#38bdf8;transform:translateY(-2px);}
.hero-stats{display:flex;gap:40px;margin-top:60px;flex-wrap:wrap;}
.hero-stat-num{font-family:'Syne',sans-serif;font-size:32px;font-weight:800;color:#f1f5f9;letter-spacing:-1px;}
.hero-stat-num span{color:#38bdf8;}
.hero-stat-label{font-size:13px;color:#64748b;margin-top:2px;}

/* ── section common ── */
.section{padding:100px 0;}
.container{max-width:1100px;margin:0 auto;padding:0 24px;}
.section-title{text-align:center;margin-bottom:60px;}
.section-eyebrow{font-size:12px;font-weight:600;letter-spacing:2.5px;text-transform:uppercase;color:#38bdf8;margin-bottom:10px;}
.section-h2{font-family:'Syne',sans-serif;font-size:clamp(28px,4vw,42px);font-weight:800;color:#f1f5f9;margin-bottom:0;letter-spacing:-1px;}
.section-line{width:44px;height:3px;background:#38bdf8;border-radius:2px;margin:16px auto 0;}

/* ── about ── */
.about-grid{display:grid;grid-template-columns:1fr 2fr;gap:64px;align-items:center;}
@media(max-width:768px){.about-grid{grid-template-columns:1fr;}.about-photo-wrap{max-width:240px;margin:0 auto;}}
.about-photo-wrap{position:relative;}
.about-photo-ring{
  width:100%;aspect-ratio:1;border-radius:50%;
  background:conic-gradient(#38bdf8 0deg,#818cf8 120deg,#38bdf8 360deg);
  padding:3px;animation:spin 12s linear infinite;
}
.about-photo-inner{
  width:100%;height:100%;border-radius:50%;overflow:hidden;
  background:#0f0f24;display:flex;align-items:center;justify-content:center;
  border:4px solid #070713;
}
.about-photo-inner img{width:100%;height:100%;object-fit:cover;}
.about-photo-initials{font-family:'Syne',sans-serif;font-size:56px;font-weight:800;color:#38bdf8;}
.about-badge{
  position:absolute;bottom:-12px;right:-12px;
  background:#0f0f24;border:1.5px solid rgba(56,189,248,.3);
  border-radius:12px;padding:10px 16px;
  font-size:13px;font-weight:500;color:#7dd3fc;
  white-space:nowrap;
}
.about-text h3{font-family:'Syne',sans-serif;font-size:24px;font-weight:700;color:#f1f5f9;margin-bottom:16px;}
.about-text p{color:#8892b0;font-size:15.5px;line-height:1.8;margin-bottom:14px;}
.about-info{display:flex;flex-wrap:wrap;gap:12px;margin-top:24px;}
.about-info-chip{
  display:flex;align-items:center;gap:8px;
  padding:8px 14px;background:#0f0f24;border:1px solid rgba(255,255,255,.07);
  border-radius:8px;font-size:13.5px;color:#dde6f5;font-weight:500;
}
.about-info-chip svg{flex-shrink:0;}

/* ── skills ── */
.skills-bg{background:#0a0a1e;}
.skills-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:24px;}
.skill-category{
  background:#0f0f24;border:1px solid rgba(255,255,255,.07);
  border-radius:14px;padding:24px;
  transition:border-color .2s;
}
.skill-category:hover{border-color:rgba(56,189,248,.25);}
.skill-cat-title{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#38bdf8;margin-bottom:14px;}
.skill-tags{display:flex;flex-wrap:wrap;gap:8px;}
.skill-tag{
  padding:5px 11px;background:rgba(56,189,248,.08);border:1px solid rgba(56,189,248,.15);
  border-radius:100px;font-size:12.5px;font-weight:500;color:#7dd3fc;
  transition:background .2s,border-color .2s;
}
.skill-tag:hover{background:rgba(56,189,248,.16);border-color:rgba(56,189,248,.35);}

/* ── projects ── */
.projects-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:24px;}
.project-card{
  background:#0f0f24;border:1px solid rgba(255,255,255,.07);
  border-radius:16px;overflow:hidden;
  display:flex;flex-direction:column;
  transition:border-color .3s,transform .3s,box-shadow .3s;
}
.project-card:hover{border-color:rgba(56,189,248,.3);transform:translateY(-6px);box-shadow:0 24px 48px rgba(0,0,0,.5);}
.project-card.featured{grid-column:1/-1;flex-direction:row;}
@media(max-width:860px){.project-card.featured{flex-direction:column!important;}}
.project-featured-accent{
  width:280px;flex-shrink:0;
  background:linear-gradient(135deg,#0f2744 0%,#0a1628 100%);
  display:flex;align-items:center;justify-content:center;padding:40px;
}
@media(max-width:860px){.project-featured-accent{width:100%;min-height:160px;}}
.project-featured-icon{
  width:100px;height:100px;border-radius:50%;
  background:rgba(56,189,248,.12);border:1.5px solid rgba(56,189,248,.3);
  display:flex;align-items:center;justify-content:center;
  font-size:42px;
}
.project-body{padding:28px;flex:1;}
.project-badge{
  display:inline-flex;align-items:center;gap:6px;
  padding:4px 12px;border-radius:100px;
  background:rgba(251,191,36,.12);border:1px solid rgba(251,191,36,.25);
  font-size:11.5px;font-weight:600;color:#fbbf24;margin-bottom:14px;
}
.project-title{font-family:'Syne',sans-serif;font-size:20px;font-weight:700;color:#f1f5f9;margin-bottom:10px;}
.project-desc{font-size:14px;color:#8892b0;line-height:1.75;margin-bottom:18px;flex:1;}
.project-tech{display:flex;flex-wrap:wrap;gap:7px;margin-bottom:20px;}
.project-tag{
  padding:3px 9px;background:#141430;border:1px solid rgba(255,255,255,.08);
  border-radius:100px;font-size:11.5px;font-weight:500;color:#94a3b8;
}
.project-links{display:flex;gap:10px;flex-wrap:wrap;}
.project-link{
  display:inline-flex;align-items:center;gap:6px;
  padding:8px 16px;border-radius:8px;font-size:13px;font-weight:600;
  transition:all .2s;cursor:pointer;text-decoration:none;
}
.project-link.live{background:rgba(56,189,248,.12);border:1px solid rgba(56,189,248,.25);color:#38bdf8;}
.project-link.live:hover{background:rgba(56,189,248,.22);border-color:#38bdf8;}
.project-link.gh{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);color:#94a3b8;}
.project-link.gh:hover{background:rgba(255,255,255,.1);border-color:rgba(255,255,255,.2);color:#e2e8f0;}

/* ── experience ── */
.exp-bg{background:#0a0a1e;}
.exp-grid{display:grid;grid-template-columns:1fr 1fr;gap:24px;}
@media(max-width:768px){.exp-grid{grid-template-columns:1fr;}}
.exp-card{
  background:#0f0f24;border:1px solid rgba(255,255,255,.07);
  border-radius:16px;padding:28px;
  display:flex;flex-direction:column;gap:12px;
  transition:border-color .3s,transform .3s;
}
.exp-card:hover{border-color:rgba(56,189,248,.25);transform:translateY(-4px);}
.exp-period{font-size:12px;font-weight:600;color:#38bdf8;letter-spacing:.5px;}
.exp-role{font-family:'Syne',sans-serif;font-size:17px;font-weight:700;color:#f1f5f9;}
.exp-company{font-size:13.5px;color:#64748b;font-weight:500;margin-bottom:4px;}
.exp-points{list-style:none;display:flex;flex-direction:column;gap:7px;}
.exp-points li{
  font-size:13.5px;color:#8892b0;padding-left:16px;position:relative;line-height:1.6;
}
.exp-points li::before{content:'';position:absolute;left:0;top:8px;width:5px;height:5px;border-radius:50%;background:#38bdf8;}

/* ── education ── */
.edu-card{
  max-width:700px;margin:0 auto;
  background:#0f0f24;border:1px solid rgba(56,189,248,.2);
  border-radius:20px;padding:40px;text-align:center;
  position:relative;overflow:hidden;
}
.edu-card::before{
  content:'';position:absolute;top:0;left:0;right:0;height:3px;
  background:linear-gradient(90deg,#38bdf8,#818cf8);
}
.edu-icon{font-size:40px;margin-bottom:16px;}
.edu-degree{font-family:'Syne',sans-serif;font-size:22px;font-weight:800;color:#f1f5f9;margin-bottom:6px;}
.edu-major{font-size:15px;color:#7dd3fc;font-weight:500;margin-bottom:4px;}
.edu-uni{font-size:14px;color:#64748b;margin-bottom:16px;}
.edu-badges{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;}
.edu-badge{
  padding:7px 18px;border-radius:100px;font-size:13px;font-weight:600;
}
.edu-badge.gpa{background:rgba(52,211,153,.12);border:1px solid rgba(52,211,153,.25);color:#34d399;}
.edu-badge.period{background:rgba(56,189,248,.1);border:1px solid rgba(56,189,248,.2);color:#7dd3fc;}

/* ── contact ── */
.contact-bg{background:#0a0a1e;}
.contact-wrap{max-width:700px;margin:0 auto;text-align:center;}
.contact-subtitle{font-size:16px;color:#8892b0;margin-bottom:48px;line-height:1.75;}
.contact-links{display:grid;grid-template-columns:repeat(2,1fr);gap:14px;margin-bottom:40px;}
@media(max-width:520px){.contact-links{grid-template-columns:1fr;}}
.contact-card{
  display:flex;align-items:center;gap:14px;
  padding:16px 20px;background:#0f0f24;
  border:1px solid rgba(255,255,255,.07);border-radius:14px;
  color:#dde6f5;font-weight:500;font-size:14.5px;text-align:left;
  transition:border-color .2s,transform .2s,background .2s;
}
.contact-card:hover{border-color:#38bdf8;background:rgba(56,189,248,.06);transform:translateY(-3px);}
.contact-card-icon{
  width:40px;height:40px;border-radius:10px;flex-shrink:0;
  background:rgba(56,189,248,.12);border:1px solid rgba(56,189,248,.2);
  display:flex;align-items:center;justify-content:center;
}
.contact-card-label{font-size:11px;color:#64748b;font-weight:400;display:block;margin-bottom:2px;}

/* ── footer ── */
footer{
  text-align:center;padding:28px 24px;
  border-top:1px solid rgba(255,255,255,.06);
  font-size:13.5px;color:#475569;
}
footer span{color:#38bdf8;}

@media(max-width:640px){
  .section{padding:70px 0;}
  .hero{padding-top:100px;}
  .hero-stats{gap:24px;}
  .nav-links .nav-link:not(.nav-cta){display:none;}
}
`;

/* ─── DATA ──────────────────────────────────────────────────── */
const ROLES = ["React Developer", "Front-End Engineer", "UI Builder", "Problem Solver"];

const SKILLS = {
  "Frontend": ["React.js", "JavaScript ES6+", "HTML5", "CSS3"],
  "Styling": ["TailwindCSS", "Bootstrap", "Framer Motion"],
  "Build Tools": ["Vite", "Git", "GitHub", "Vercel"],
  "Back-End": ["Node.js", "Express.js", "MongoDB"],
  "Other": ["SEO & SEM", "AI Prompting", "Power BI"],
};

const PROJECTS = [
  {
    title: "EGY-Guide",
    badge: "🏆 Top 10 — DEPI Graduation",
    desc: "A full-stack digital tourism platform showcasing Egypt's heritage, cultural sites, and local experiences. Features user auth, interactive maps (Leaflet), itinerary planner, reviews system, and admin CMS. Developed in a team of 7.",
    tech: ["React", "Vite", "TailwindCSS", "Node.js", "Express", "MongoDB"],
    live: "https://egy-places.vercel.app",
    github: "https://github.com/HeshamM-088/egy",
    githubBack: "https://github.com/yasmin20s/egi",
    icon: "🗺️",
    featured: true,
  },
  {
    title: "Ahmed Nasser Portfolio",
    badge: "Client Project",
    desc: "Fully responsive personal portfolio for a ML/Back-End developer. Dark/light mode, Framer Motion animations, EmailJS contact form. Zero custom CSS — pure TailwindCSS.",
    tech: ["React", "Vite", "TailwindCSS", "Framer Motion", "EmailJS"],
    live: "https://ahmed-nasser-portfolio.vercel.app",
    github: "https://github.com/khalidsamy/ahmed-nasser-portfolio",
  },
  {
    title: "Personal Portfolio v1",
    badge: "Self",
    desc: "My original developer portfolio built in React showcasing projects and skills. Deployed via Vercel with GitHub CI.",
    tech: ["React.js", "Vercel"],
    live: "https://portfolio-sigma-blond-42.vercel.app",
    github: "https://github.com/khalidsamy",
  },
  {
    title: "Watches Store UI",
    badge: "UI Design",
    desc: "A clean, responsive e-commerce interface for a luxury watches store. Focus on visual hierarchy, product display, and premium feel.",
    tech: ["HTML5", "CSS3"],
    live: "https://watches-store-design.vercel.app",
    github: "https://github.com/khalidsamy/WatchesStoreDesign",
  },
];

const EXPERIENCE = [
  {
    role: "React Front-End Developer — Intern",
    company: "Digital Egypt Pioneers Initiative (DEPI)",
    period: "Jun 2025 – Nov 2025",
    points: [
      "Built interactive interfaces with React.js, TailwindCSS & Bootstrap",
      "Developed reusable components with component-based architecture",
      "Led front-end of EGY-Guide graduation project — Top 10 at DEPI",
      "Deployed projects on Vercel with GitHub CI/CD",
    ],
  },
  {
    role: "Digital Marketing Track — Intern",
    company: "DEPI | Ministry of Communication & IT",
    period: "Apr 2024 – Dec 2024",
    points: [
      "SEO, content strategy & social media using Google Ads & Meta",
      "Built 20+ projects portfolio",
      "Grew a tourism company's organic followers by 15%",
      "Team graduation project ranked in top 10",
    ],
  },
  {
    role: "Soft Skills Training",
    company: "EG-Bank | MINT Program",
    period: "Sep 2023",
    points: [
      "Communication, teamwork, and problem-solving training",
      "Leadership and collaboration exercises",
    ],
  },
  {
    role: "Summer Internship",
    company: "CIB Bank",
    period: "Jul – Aug 2023",
    points: [
      "Banking operations and financial services insights",
      "LinkedIn Learning certification",
    ],
  },
];

/* ─── HOOKS ──────────────────────────────────────────────────── */
function useFadeIn(ref) {
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { e.target.classList.add("visible"); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
}

function useTyping(words, speed = 80, pause = 2000) {
  const [display, setDisplay] = useState("");
  const [idx, setIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[idx % words.length];
    const delay = deleting ? speed / 2 : speed;
    const timer = setTimeout(() => {
      if (!deleting && display === word) {
        setTimeout(() => setDeleting(true), pause);
      } else if (deleting && display === "") {
        setDeleting(false);
        setIdx(i => i + 1);
      } else {
        setDisplay(w => deleting ? w.slice(0, -1) : word.slice(0, w.length + 1));
      }
    }, delay);
    return () => clearTimeout(timer);
  }, [display, deleting, idx, words, speed, pause]);

  return display;
}

/* ─── COMPONENTS ─────────────────────────────────────────────── */

function Navbar({ active }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = ["About", "Skills", "Projects", "Experience", "Contact"];
  const scroll = (id) => document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });

  return (
    <nav id="navbar" className={scrolled ? "scrolled" : ""}>
      <div className="nav-inner">
        <span className="nav-logo">khalid<span>.</span>dev</span>
        <div className="nav-links">
          {links.map(l => (
            <span key={l} className={`nav-link ${active === l.toLowerCase() ? "active" : ""}`} onClick={() => scroll(l)}>
              {l}
            </span>
          ))}
          <a href="mailto:khalidsmhran@gmail.com" className="btn-primary nav-cta" style={{ padding: "9px 20px", fontSize: 13, marginLeft: 8 }}>
            Hire Me
          </a>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  const role = useTyping(ROLES);
  return (
    <section className="hero" id="hero">
      <div className="hero-bg" />
      <div className="dot-pattern" />
      <div className="hero-content" style={{ animation: "fadeUp .8s ease both" }}>
        <div className="hero-eyebrow">
          <span className="hero-dot" />
          Available for opportunities
        </div>
        <h1 className="hero-name">Khalid<br /><span>Samy</span></h1>
        <div className="hero-role">
          {role}<span className="cursor" />
        </div>
        <p className="hero-bio">
          React Front-End Developer passionate about building fast, beautiful, and user-centric web interfaces.
          Currently completing my B.Sc. in Business Informatics at Helwan National University (GPA 3.6).
        </p>
        <div className="hero-cta">
          <a href="#projects" className="btn-primary" onClick={e => { e.preventDefault(); document.getElementById("projects").scrollIntoView({ behavior: "smooth" }); }}>
            View My Work
          </a>
          <a href="mailto:khalidsmhran@gmail.com" className="btn-outline">Get In Touch</a>
          <a href="https://github.com/khalidsamy" target="_blank" rel="noreferrer" className="btn-outline" style={{ borderRadius: "50%", padding: "13px", width: 46, justifyContent: "center" }}>
            <GitHubIcon />
          </a>
          <a href="https://linkedin.com/in/khalid-samy" target="_blank" rel="noreferrer" className="btn-outline" style={{ borderRadius: "50%", padding: "13px", width: 46, justifyContent: "center" }}>
            <LinkedInIcon />
          </a>
        </div>
        <div className="hero-stats">
          {[["4", "+", "Projects Deployed"], ["2", "+", "Years of Learning"], ["Top 10", "", "DEPI Graduation"]].map(([n, s, l]) => (
            <div key={l}>
              <div className="hero-stat-num">{n}<span>{s}</span></div>
              <div className="hero-stat-label">{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  const ref = useRef(null);
  useFadeIn(ref);
  return (
    <section className="section" id="about" ref={ref} style={{ position: "relative" }}>
      <div className="container">
        <div className="section-title fade-up visible">
          <p className="section-eyebrow">Who I Am</p>
          <h2 className="section-h2">About Me</h2>
          <div className="section-line" />
        </div>
        <div className="about-grid">
          <div className="about-photo-wrap">
            <div className="about-photo-ring">
              <div className="about-photo-inner">
                <img src="/khalidSamy.jpg" alt="Khalid Samy" onError={e => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }} />
                <span className="about-photo-initials" style={{ display: "none" }}>KS</span>
              </div>
            </div>
            <div className="about-badge">🚀 Open to work</div>
          </div>
          <div className="about-text">
            <h3>Hey, I'm Khalid 👋</h3>
            <p>
              I'm a React Front-End Developer from Giza, Egypt — passionate about building modern, interactive web experiences
              that are both beautiful and functional. I completed a 6-month React internship at the Digital Egypt Pioneers Initiative (DEPI),
              where I contributed to a full-stack graduation project that ranked in the Top 10.
            </p>
            <p>
              My background in Business Informatics & Digital Transformation gives me a unique edge — I combine technical
              front-end skills with a strong understanding of business goals, user needs, and digital strategy.
            </p>
            <p>
              When I'm not building UIs, I'm exploring AI tools, refining my design eye, or thinking about how tech can
              solve real-world problems.
            </p>
            <div className="about-info">
              {[
                ["🎓", "Helwan National University"],
                ["📍", "Giza, Egypt"],
                ["⭐", "GPA 3.6 — Excellent"],
                ["🗓️", "Graduating Jun 2026"],
              ].map(([icon, text]) => (
                <div key={text} className="about-info-chip">{icon} {text}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  const ref = useRef(null);
  useFadeIn(ref);
  return (
    <section className="section skills-bg" id="skills" ref={ref}>
      <div className="container">
        <div className="section-title fade-up visible">
          <p className="section-eyebrow">What I Know</p>
          <h2 className="section-h2">Tech Stack</h2>
          <div className="section-line" />
        </div>
        <div className="skills-grid">
          {Object.entries(SKILLS).map(([cat, tags]) => (
            <div key={cat} className="skill-category">
              <p className="skill-cat-title">{cat}</p>
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

function Projects() {
  const ref = useRef(null);
  useFadeIn(ref);
  const featured = PROJECTS.filter(p => p.featured);
  const rest = PROJECTS.filter(p => !p.featured);

  return (
    <section className="section" id="projects" ref={ref}>
      <div className="container">
        <div className="section-title fade-up visible">
          <p className="section-eyebrow">What I've Built</p>
          <h2 className="section-h2">Projects</h2>
          <div className="section-line" />
        </div>

        {/* Featured */}
        {featured.map(p => (
          <div key={p.title} className="project-card featured" style={{ marginBottom: 24 }}>
            <div className="project-featured-accent">
              <div style={{ textAlign: "center" }}>
                <div className="project-featured-icon">{p.icon}</div>
                <p style={{ marginTop: 16, fontSize: 12, color: "#38bdf8", fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase" }}>Featured</p>
              </div>
            </div>
            <div className="project-body">
              <span className="project-badge">🏆 {p.badge.replace("🏆 ", "")}</span>
              <h3 className="project-title">{p.title}</h3>
              <p className="project-desc">{p.desc}</p>
              <div className="project-tech">{p.tech.map(t => <span key={t} className="project-tag">{t}</span>)}</div>
              <div className="project-links">
                <a href={p.live} target="_blank" rel="noreferrer" className="project-link live">↗ Live Demo</a>
                <a href={p.github} target="_blank" rel="noreferrer" className="project-link gh"><GitHubIcon size={13} /> Front-End</a>
                {p.githubBack && <a href={p.githubBack} target="_blank" rel="noreferrer" className="project-link gh"><GitHubIcon size={13} /> Back-End</a>}
              </div>
            </div>
          </div>
        ))}

        {/* Grid */}
        <div className="projects-grid">
          {rest.map(p => (
            <div key={p.title} className="project-card">
              <div className="project-body" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
                <span className="project-badge" style={{ background: "rgba(129,140,248,.12)", borderColor: "rgba(129,140,248,.25)", color: "#a5b4fc" }}>{p.badge}</span>
                <h3 className="project-title">{p.title}</h3>
                <p className="project-desc">{p.desc}</p>
                <div className="project-tech">{p.tech.map(t => <span key={t} className="project-tag">{t}</span>)}</div>
                <div className="project-links" style={{ marginTop: "auto" }}>
                  <a href={p.live} target="_blank" rel="noreferrer" className="project-link live">↗ Live</a>
                  <a href={p.github} target="_blank" rel="noreferrer" className="project-link gh"><GitHubIcon size={13} /> Code</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Experience() {
  const ref = useRef(null);
  useFadeIn(ref);
  return (
    <section className="section exp-bg" id="experience" ref={ref}>
      <div className="container">
        <div className="section-title fade-up visible">
          <p className="section-eyebrow">My Journey</p>
          <h2 className="section-h2">Experience</h2>
          <div className="section-line" />
        </div>
        <div className="exp-grid">
          {EXPERIENCE.map(exp => (
            <div key={exp.role} className="exp-card">
              <span className="exp-period">{exp.period}</span>
              <h3 className="exp-role">{exp.role}</h3>
              <p className="exp-company">{exp.company}</p>
              <ul className="exp-points">
                {exp.points.map(pt => <li key={pt}>{pt}</li>)}
              </ul>
            </div>
          ))}
        </div>

        {/* Education */}
        <div style={{ marginTop: 48 }}>
          <div className="section-title" style={{ marginBottom: 32 }}>
            <p className="section-eyebrow">Education</p>
          </div>
          <div className="edu-card">
            <div className="edu-icon">🎓</div>
            <h3 className="edu-degree">Bachelor of Business Administration</h3>
            <p className="edu-major">Business Informatics & Digital Transformation</p>
            <p className="edu-uni">Helwan National University · Cairo, Egypt</p>
            <div className="edu-badges">
              <span className="edu-badge gpa">GPA 3.6 / 4.0 — Excellent</span>
              <span className="edu-badge period">Oct 2022 – Jun 2026</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const ref = useRef(null);
  useFadeIn(ref);
  const links = [
    { icon: "✉️", label: "Email", value: "khalidsmhran@gmail.com", href: "mailto:khalidsmhran@gmail.com" },
    { icon: "📱", label: "Phone", value: "+20-111-369-7736", href: "tel:+201148712424" },
    { icon: "💼", label: "LinkedIn", value: "khalid-samy", href: "https://linkedin.com/in/khalid-samy" },
    { icon: "🐙", label: "GitHub", value: "khalidsamy", href: "https://github.com/khalidsamy" },
  ];
  return (
    <section className="section contact-bg" id="contact" ref={ref}>
      <div className="container">
        <div className="section-title fade-up visible">
          <p className="section-eyebrow">Let's Talk</p>
          <h2 className="section-h2">Get In Touch</h2>
          <div className="section-line" />
        </div>
        <div className="contact-wrap">
          <p className="contact-subtitle">
            Whether you have a project in mind, a job opportunity, or just want to connect — I'd love to hear from you.
            I'm currently open to internships and full-time front-end roles.
          </p>
          <div className="contact-links">
            {links.map(l => (
              <a key={l.label} href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="contact-card">
                <div className="contact-card-icon">
                  <span style={{ fontSize: 18 }}>{l.icon}</span>
                </div>
                <div>
                  <span className="contact-card-label">{l.label}</span>
                  {l.value}
                </div>
              </a>
            ))}
          </div>
          <a href="mailto:khalidsmhran@gmail.com" className="btn-primary" style={{ fontSize: 16, padding: "16px 48px" }}>
            Send Me a Message ✉️
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── ICONS ──────────────────────────────────────────────────── */
function GitHubIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38
        0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13
        -.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87
        2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95
        0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12
        0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27
        1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15
        0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48
        0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38
        A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}
function LinkedInIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

/* ─── APP ────────────────────────────────────────────────────── */
export default function App() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const sections = ["hero", "about", "skills", "projects", "experience", "contact"];
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { rootMargin: "-40% 0px -40% 0px" }
    );
    sections.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <Navbar active={active} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <footer>
        <p>Designed & Built by <span>Khalid Samy</span> · {new Date().getFullYear()}</p>
      </footer>
    </>
  );
}
