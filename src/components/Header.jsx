import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowUpRight, Menu, X, Sparkles } from "lucide-react";
import { publicUrl } from "../publicUrl";

const navItems = [
  { name: "Home", path: "/#home" },
  { name: "About", path: "/#about" },
  { name: "Benefits", path: "/#benefits" },
  { name: "Who It's For", path: "/#audience" },
  { name: "Inside Diary", path: "/#inside" },
  { name: "90-Day Journey", path: "/#journey" },
  { name: "Gallery", path: "/#gallery" },
  { name: "FAQs", path: "/#faq" },
  { name: "Blog", path: "/blog" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      <div className="announcement">
        <Sparkles size={13} />
        Launching 5 December 2026 — Pre-Bookings 5–15 December
        <Sparkles size={13} />
      </div>

      <header className="site-header">
        <div className="nav-container">
          <Link
            to="/#home"
            className="site-logo"
            onClick={() => setOpen(false)}
          >
            <img src={publicUrl("/images/logo.png")} alt="Prnni’s Diary — home" width="180" height="60" />
          </Link>

          <nav className={`nav-menu ${open ? "open" : ""}`}>
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setOpen(false)}
                className={
                  `${location.pathname}${location.hash}` === item.path || (item.path === "/#home" && location.pathname === "/" && !location.hash) ? "active" : ""
                }
              >
                {item.name}
              </Link>
            ))}

            <Link
              to="/#prebook"
              className="mobile-prebook"
              onClick={() => setOpen(false)}
            >
              Pre-Book Now
            </Link>
          </nav>

          <Link to="/#prebook" className="header-cta">
            Pre-Book Now <ArrowUpRight size={16} />
          </Link>

          <button
            type="button"
            className="menu-toggle"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>
    </>
  );
}
