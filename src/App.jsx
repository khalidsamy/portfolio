import { useEffect } from "react";
import emailjs from "@emailjs/browser";
import "./App.css";

// Components
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

// Hooks
import { useCursor } from "./hooks/useCursor";

export default function App() {
  const cursor = useCursor();
  
  useEffect(() => {
    emailjs.init("ugJigS9qfXKSuNw0i");
  }, []);

  return (
    <>
      <div className="custom-cursor" style={{ transform: `translate3d(${cursor.x}px, ${cursor.y}px, 0)` }} />
      <div className="cursor-ring" style={{ transform: `translate3d(${cursor.x}px, ${cursor.y}px, 0)` }} />
      
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
