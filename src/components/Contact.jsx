import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { useFadeIn } from "../hooks/useFadeIn";

export default function Contact() {
  const ref = useFadeIn();
  const formRef = useRef();
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const SERVICE_ID = 'service_8p2hiwf';
  const TEMPLATE_ID = 'template_kyrahrr';
  const PUBLIC_KEY = 'ugJigS9qfXKSuNw0i';

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
      .then(() => {
        setStatus({ type: 'success', text: "Message sent! I'll get back to you soon 🙌" });
        formRef.current.reset();
      })
      .catch((err) => {
        console.error("EmailJS Error:", err);
        setStatus({ type: 'error', text: "Something went wrong. Please check your connection." });
      })
      .finally(() => setLoading(false));
  };

  return (
    <section className="section fade-reveal" id="contact" ref={ref}>
      <div className="container">
        <div className="contact-grid">
          <div className="glass-card contact-info-card">
            <div className="section-header">
              <p className="section-eyebrow">Let's Connect</p>
              <h2 className="section-title">Get In Touch</h2>
            </div>
            <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>
              Have a project in mind or just want to say hi? Feel free to reach out through any of the channels below.
            </p>
            <div className="contact-item">
              <div className="contact-icon">✉️</div>
              <div>
                <p style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Email</p>
                <p style={{ fontWeight: 600 }}>khalidsmhran@gmail.com</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">📱</div>
              <div>
                <p style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Phone</p>
                <p style={{ fontWeight: 600 }}>+20 111 369 7736</p>
              </div>
            </div>
          </div>
          
          <form ref={formRef} onSubmit={sendEmail} className="contact-form">
            <div className="input-group">
              <input type="text" name="from_name" className="input-field" placeholder="Full Name" required />
            </div>
            <div className="input-group">
              <input type="email" name="from_email" className="input-field" placeholder="Email Address" required />
            </div>
            <div className="input-group">
              <input type="text" name="subject" className="input-field" placeholder="Subject" required />
            </div>
            <div className="input-group">
              <textarea name="message" className="input-field" placeholder="Tell me about your project..." required></textarea>
            </div>
            
            <button type="submit" disabled={loading} className="submit-btn">
              {loading ? <div className="spinner" /> : "Send Message"}
            </button>

            {status && (
              <div className={`form-status ${status.type === 'success' ? 'status-success' : 'status-error'}`}>
                {status.text}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
