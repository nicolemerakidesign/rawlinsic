"use client";

import { useEffect, useRef } from "react";
import SiteNav from "@/components/site-nav";
import SiteFooter from "@/components/site-footer";

export default function PrivacyPolicyPage() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const ringX = useRef(0);
  const ringY = useRef(0);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;
    const move = (e: MouseEvent) => {
      mouseX.current = e.clientX; mouseY.current = e.clientY;
      dot.style.left = e.clientX - 4 + "px"; dot.style.top = e.clientY - 4 + "px";
    };
    const loop = () => {
      ringX.current += (mouseX.current - ringX.current) * 0.12;
      ringY.current += (mouseY.current - ringY.current) * 0.12;
      ring.style.left = ringX.current - 20 + "px"; ring.style.top = ringY.current - 20 + "px";
      requestAnimationFrame(loop);
    };
    document.addEventListener("mousemove", move);
    requestAnimationFrame(loop);
    return () => document.removeEventListener("mousemove", move);
  }, []);

  useEffect(() => {
    const nav = document.getElementById("mainNav");
    const onScroll = () => { if (nav) nav.classList.toggle("scrolled", window.scrollY > 60); };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="cursor-dot" ref={dotRef} />
      <div className="cursor-ring" ref={ringRef} />
      <div className="ambient-bg" />
      <SiteNav />

      <section style={{ padding: "180px 48px 100px", maxWidth: 900, margin: "0 auto" }}>
        <span className="hero-label"><span className="gold-text">Legal</span></span>
        <h1 className="hero-title" style={{ marginBottom: 40 }}>Privacy Policy</h1>

        <div style={{ color: "rgba(255,255,255,0.85)", fontSize: 16, lineHeight: 1.9, display: "flex", flexDirection: "column", gap: 32 }}>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14 }}>Last updated: April 7, 2026</p>

          <div>
            <h2 style={{ fontSize: 22, fontWeight: 600, color: "#fff", marginBottom: 12, fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif" }}>1. Introduction</h2>
            <p>Rawlins Infra Consult (&ldquo;Rawlins,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website at rawlinsic.com.</p>
          </div>

          <div>
            <h2 style={{ fontSize: 22, fontWeight: 600, color: "#fff", marginBottom: 12, fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif" }}>2. Information We Collect</h2>
            <p><strong style={{ color: "#fff" }}>Information you provide:</strong> When you fill out our contact form, subscribe to updates, or communicate with us, we may collect your name, email address, phone number, organization name, and the content of your message.</p>
            <p style={{ marginTop: 12 }}><strong style={{ color: "#fff" }}>Automatically collected information:</strong> We may collect certain information automatically when you visit our website, including your IP address, browser type, operating system, referring URLs, and pages viewed. We use analytics tools to understand how visitors interact with our site.</p>
          </div>

          <div>
            <h2 style={{ fontSize: 22, fontWeight: 600, color: "#fff", marginBottom: 12, fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif" }}>3. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul style={{ paddingLeft: 24, marginTop: 8 }}>
              <li>Respond to your inquiries and provide requested services</li>
              <li>Communicate with you about our services, events, and updates</li>
              <li>Improve and optimize our website and user experience</li>
              <li>Comply with legal obligations and protect our rights</li>
            </ul>
          </div>

          <div>
            <h2 style={{ fontSize: 22, fontWeight: 600, color: "#fff", marginBottom: 12, fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif" }}>4. Information Sharing</h2>
            <p>We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted service providers who assist us in operating our website and conducting business, provided they agree to keep your information confidential. We may also disclose information when required by law or to protect our rights.</p>
          </div>

          <div>
            <h2 style={{ fontSize: 22, fontWeight: 600, color: "#fff", marginBottom: 12, fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif" }}>5. Cookies and Tracking</h2>
            <p>Our website may use cookies and similar tracking technologies to enhance your browsing experience and gather analytics data. You can control cookie preferences through your browser settings. Disabling cookies may affect certain features of the website.</p>
          </div>

          <div>
            <h2 style={{ fontSize: 22, fontWeight: 600, color: "#fff", marginBottom: 12, fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif" }}>6. Data Security</h2>
            <p>We implement reasonable administrative, technical, and physical safeguards to protect your personal information. However, no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee absolute security.</p>
          </div>

          <div>
            <h2 style={{ fontSize: 22, fontWeight: 600, color: "#fff", marginBottom: 12, fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif" }}>7. Third-Party Links</h2>
            <p>Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of those sites. We encourage you to review the privacy policies of any third-party sites you visit.</p>
          </div>

          <div>
            <h2 style={{ fontSize: 22, fontWeight: 600, color: "#fff", marginBottom: 12, fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif" }}>8. Your Rights</h2>
            <p>Depending on your jurisdiction, you may have the right to access, correct, delete, or restrict the processing of your personal data. To exercise these rights, please contact us using the information below.</p>
          </div>

          <div>
            <h2 style={{ fontSize: 22, fontWeight: 600, color: "#fff", marginBottom: 12, fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif" }}>9. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date. We encourage you to review this policy periodically.</p>
          </div>

          <div>
            <h2 style={{ fontSize: 22, fontWeight: 600, color: "#fff", marginBottom: 12, fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif" }}>10. Contact Us</h2>
            <p>If you have questions about this Privacy Policy, please contact us at:</p>
            <p style={{ marginTop: 8 }}>
              Rawlins Infra Consult<br />
              Email: <a href="mailto:info@rawlinsic.com" style={{ color: "#c9a84c" }}>info@rawlinsic.com</a>
            </p>
          </div>
        </div>
      </section>

      <div className="section-divider"><div className="gold-line" /></div>
      <SiteFooter />
    </>
  );
}
