import Image from "next/image";
import Link from "next/link";

const LOGO_URL =
  "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=90,anim=true/c4zcddt61rtnmmmh8sqtv1fn/dkeher82cub0yp82vsjcz9t9/cfZ06kEF6A_pOkuifk_rD.webp";

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
            <li>
              <a
                href="https://www.linkedin.com/company/rawlins-infra-consult/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span>&copy; {new Date().getFullYear()} Rawlins. All rights reserved.</span>
        <span>Privacy Policy &middot; Terms of Service</span>
      </div>
    </footer>
  );
}
