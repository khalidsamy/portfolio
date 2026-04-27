import { useState, useEffect } from "react";
import { useScroll } from "../hooks/useScroll";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const progress = useScroll();
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      <div className="scroll-progress" style={{ width: `${progress}%` }} />
      <nav id="navbar" className={scrolled ? "scrolled" : ""}>
        <div className="container nav-inner">
          <div className="nav-logo" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>
            khalid<span>.</span>dev
          </div>
          <div className="nav-links">
            {[
              { name: "About", icon: "👤" },
              { name: "Skills", icon: "🚀" },
              { name: "Projects", icon: "💻" },
              { name: "Experience", icon: "⏳" },
              { name: "Contact", icon: "✉️" }
            ].map(l => (
              <span key={l.name} className="nav-link" onClick={() => scrollTo(l.name.toLowerCase())}>
                <span style={{ marginRight: '6px', fontSize: '12px' }}>{l.icon}</span>
                {l.name}
              </span>
            ))}
            <a href="mailto:khalidsmhran@gmail.com" className="btn btn-primary" style={{ padding: '8px 20px', fontSize: '13px' }}>Hire Me</a>
          </div>
        </div>
      </nav>
    </>
  );
}
