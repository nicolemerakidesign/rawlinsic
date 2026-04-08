"use client";

import { useEffect, useRef } from "react";
import SiteNav from "@/components/site-nav";
import SiteFooter from "@/components/site-footer";

export default function TermsOfServicePage() {
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
        <h1 className="hero-title" style={{ marginBottom: 40 }}>Terms of Service</h1>

        <div style={{ color: "rgba(255,255,255,0.85)", fontSize: 16, lineHeight: 1.9, display: "flex", flexDirection: "column", gap: 32 }}>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14 }}>Last updated: April 7, 2026</p>

          <div>
            <h2 style={{ fontSize: 22, fontWeight: 600, color: "#fff", marginBottom: 12, fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif" }}>1. Acceptance of Terms</h2>
            <p>By accessing and using the Rawlins Infra Consult website (rawlinsic.com), you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website.</p>
          </div>

          <div>
            <h2 style={{ fontSize: 22, fontWeight: 600, color: "#fff", marginBottom: 12, fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif" }}>2. Use of Website</h2>
            <p>This website is provided for informational purposes about Rawlins Infra Consult and our services. You agree to use this website only for lawful purposes and in a manner that does not infringe upon the rights of others or restrict their use of the website.</p>
          </div>

          <div>
            <h2 style={{ fontSize: 22, fontWeight: 600, color: "#fff", marginBottom: 12, fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif" }}>3. Intellectual Property</h2>
            <p>All content on this website, including text, graphics, logos, images, and software, is the property of Rawlins Infra Consult or its content suppliers and is protected by applicable intellectual property laws. You may not reproduce, distribute, modify, or create derivative works from any content without our prior written consent.</p>
          </div>

          <div>
            <h2 style={{ fontSize: 22, fontWeight: 600, color: "#fff", marginBottom: 12, fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif" }}>4. Disclaimer of Warranties</h2>
            <p>This website and its content are provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without warranties of any kind, either express or implied. Rawlins Infra Consult does not warrant that the website will be uninterrupted, error-free, or free of harmful components.</p>
          </div>

          <div>
            <h2 style={{ fontSize: 22, fontWeight: 600, color: "#fff", marginBottom: 12, fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif" }}>5. Limitation of Liability</h2>
            <p>To the fullest extent permitted by law, Rawlins Infra Consult shall not be liable for any direct, indirect, incidental, special, or consequential damages arising from your use of or inability to use this website or its content.</p>
          </div>

          <div>
            <h2 style={{ fontSize: 22, fontWeight: 600, color: "#fff", marginBottom: 12, fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif" }}>6. Third-Party Links</h2>
            <p>Our website may contain links to third-party websites. These links are provided for your convenience only. We do not endorse or assume responsibility for the content, privacy policies, or practices of any third-party sites.</p>
          </div>

          <div>
            <h2 style={{ fontSize: 22, fontWeight: 600, color: "#fff", marginBottom: 12, fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif" }}>7. Professional Services</h2>
            <p>Information on this website does not constitute professional advice. Any engagement for consulting services will be governed by a separate written agreement between you and Rawlins Infra Consult.</p>
          </div>

          <div>
            <h2 style={{ fontSize: 22, fontWeight: 600, color: "#fff", marginBottom: 12, fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif" }}>8. Modifications</h2>
            <p>We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting to this page. Your continued use of the website following any changes constitutes your acceptance of the revised terms.</p>
          </div>

          <div>
            <h2 style={{ fontSize: 22, fontWeight: 600, color: "#fff", marginBottom: 12, fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif" }}>9. Governing Law</h2>
            <p>These Terms of Service shall be governed by and construed in accordance with the laws of the United States, without regard to conflict of law provisions.</p>
          </div>

          <div>
            <h2 style={{ fontSize: 22, fontWeight: 600, color: "#fff", marginBottom: 12, fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif" }}>10. Contact Us</h2>
            <p>If you have questions about these Terms of Service, please contact us at:</p>
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
