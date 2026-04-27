import { useState, useEffect } from "react";

export function useScroll() {
  const [prog, setProg] = useState(0);
  useEffect(() => {
    const handle = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setProg((winScroll / height) * 100);
    };
    window.addEventListener("scroll", handle);
    return () => window.removeEventListener("scroll", handle);
  }, []);
  return prog;
}
