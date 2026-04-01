import Image from "next/image";
import Link from "next/link";

const LOGO_URL =
  "/images/pages/hero-bg.webp";

export default function SiteFooter() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <Image src={LOGO_URL} alt="Rawlins" width={160} height={40} className="footer-logo-img" />
          <p className="footer-brand-desc">
            Global management consulting firm that partners with public and
            private organizations to navigate complex challenges at the
            intersection of strategy, operations, and technology.
          </p>
        </div>
        <div>
          <h4 className="footer-heading">Capabilities</h4>
          <ul className="footer-links">
            <li><Link href="/capabilities">View All</Link></li>
            <li><Link href="/capabilities#strategy">Strategy</Link></li>
            <li><Link href="/capabilities#operations">Operations</Link></li>
            <li><Link href="/capabilities#technology">Technology</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="footer-heading">Company</h4>
          <ul className="footer-links">
            <li><Link href="/#story">About</Link></li>
            <li><Link href="/about/our-people">Our People</Link></li>
            <li><Link href="/about/areas-we-serve">Areas We Serve</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="footer-heading">Insights</h4>
          <ul className="footer-links">
            <li><Link href="/insights/thought-leadership">Thought Leadership</Link></li>
            <li><Link href="/insights/case-studies">Case Studies</Link></li>
            <li><Link href="/insights/podcast">Podcast</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="footer-heading">Connect</h4>
          <ul className="footer-links">
            <li><Link href="/contact">Contact Us</Link></li>
            <li>
              <a href="mailto:info@rawlinsic.com">info@rawlinsic.com</a>
            </li>
            <li>
              <a href="tel:+17758433822">(775) 843-3822</a>
            </li>
          </ul>
          <div className="footer-social">
            <a href="https://www.linkedin.com/company/107078508/admin/dashboard/" target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label="LinkedIn">
              <span style={{ fontFamily: "Arial, sans-serif", fontSize: "20px", fontWeight: 700, color: "#060c16", lineHeight: 1, letterSpacing: "-0.5px" }}>in</span>
            </a>
            <a href="https://www.google.com/maps/place/Rawlins+Infra+Consult/@39.4199229,-119.7519656,17z/data=!3m1!4b1!4m6!3m5!1s0xc834b8bdb96e445:0xd0e8e5a965f86123!8m2!3d39.4199229!4d-119.7519656!16s%2Fg%2F11w3b8bxf3" target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label="Google">
              <span style={{ fontFamily: "Arial, sans-serif", fontSize: "22px", fontWeight: 700, color: "#060c16", lineHeight: 1 }}>G</span>
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>&copy; {new Date().getFullYear()} Rawlins. All rights reserved.</span>
        <span>Privacy Policy &middot; Terms of Service</span>
      </div>
    </footer>
  );
}
