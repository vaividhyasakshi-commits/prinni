import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, CalendarDays, Heart } from "lucide-react";

const exploreLinks = [
  ["Home", "/#home"],
  ["Our Story", "/#about"],
  ["Why Prnni", "/#benefits"],
  ["Who It's For", "/#audience"],
];

const discoverLinks = [
  ["Inside the Diary", "/#inside"],
  ["90-Day Journey", "/#journey"],
  ["Gallery", "/#gallery"],
  ["FAQs", "/#faq"],
  ["Blog", "/blog"],
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div className="footer-brand">
          <Link to="/#home" className="footer-logo">
            <img src="/images/logo.png" alt="Prnni’s Diary — home" width="180" height="60" />
          </Link>

          <p>
            A little space to plan your days, hold your thoughts,
            and become who you wish to be.
          </p>

          <div className="footer-heart">
            <Heart size={17} />
            Made with love, for the journey of becoming.
          </div>
        </div>

        <div className="footer-column">
          <h4>EXPLORE</h4>
          {exploreLinks.map(([label, path]) => (
            <Link to={path} key={label}>
              {label}
            </Link>
          ))}
        </div>

        <div className="footer-column">
          <h4>DISCOVER</h4>
          {discoverLinks.map(([label, path]) => (
            <Link to={path} key={label}>
              {label}
            </Link>
          ))}
        </div>

        <div className="footer-column">
          <h4>COMING SOON</h4>

          <div className="footer-launch">
            <CalendarDays size={19} />
            <div>
              <span>Official Launch</span>
              <strong>5 December 2026</strong>
            </div>
          </div>

          <p>Pre-booking window: 5–15 December 2026.</p>

          <Link to="/#prebook" className="footer-book">
            Pre-Book Prnni <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>
          © {new Date().getFullYear()} Prnni's Diary.
          All rights reserved.
        </span>
        <span>Plan. Reflect. Grow. ♡</span>
      </div>
    </footer>
  );
}