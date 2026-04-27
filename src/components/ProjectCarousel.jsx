import { useState, useEffect } from "react";

export default function ProjectCarousel({ images }) {
  const [cur, setCur] = useState(0);
  
  useEffect(() => {
    const itv = setInterval(() => {
      setCur(c => (c + 1) % images.length);
    }, 4000);
    return () => clearInterval(itv);
  }, [images.length]);

  const next = (e) => { e.stopPropagation(); setCur((cur + 1) % images.length); };
  const prev = (e) => { e.stopPropagation(); setCur((cur - 1 + images.length) % images.length); };

  return (
    <div className="project-carousel">
      {images.map((img, i) => (
        <img key={i} src={img} alt="project preview" className={`carousel-img ${i === cur ? 'active' : ''}`} />
      ))}
      <div className="carousel-controls">
        <div className="carousel-btn" onClick={prev}>←</div>
        <div className="carousel-btn" onClick={next}>→</div>
      </div>
      <div className="carousel-dots">
        {images.map((_, i) => (
          <div key={i} className={`carousel-dot ${i === cur ? 'active' : ''}`} />
        ))}
      </div>
    </div>
  );
}
