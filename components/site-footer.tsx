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
          </ul>
          <div className="footer-social">
            <a href="https://www.linkedin.com/company/107078508/admin/dashboard/" target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label="LinkedIn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="url(#footerLinkedinGold)">
                <defs><linearGradient id="footerLinkedinGold" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#c9a84c"/><stop offset="50%" stopColor="#e8d5a0"/><stop offset="100%" stopColor="#d4b878"/></linearGradient></defs>
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a href="https://www.google.com/maps/place/Rawlins+Infra+Consult/@39.4199229,-119.7519656,17z/data=!3m1!4b1!4m6!3m5!1s0xc834b8bdb96e445:0xd0e8e5a965f86123!8m2!3d39.4199229!4d-119.7519656!16s%2Fg%2F11w3b8bxf3" target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label="Google">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="url(#footerGoogleGold)">
                <defs><linearGradient id="footerGoogleGold" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#c9a84c"/><stop offset="50%" stopColor="#e8d5a0"/><stop offset="100%" stopColor="#d4b878"/></linearGradient></defs>
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
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
