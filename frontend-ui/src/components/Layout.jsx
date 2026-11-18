import { useCopy } from "./ContentCopy.jsx";
import React, { useEffect, useState } from "react";
import { routeNames } from "../content.js";
import Icon from "./Icon.jsx";
import { safeUrl, imageUrl } from "../content.js";
export default function Layout({ settings, path, children }) {
  const copy = useCopy();

  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    const scroll = () => setCompact(window.scrollY > 65);
    scroll();
    window.addEventListener("scroll", scroll, { passive: true });
    return () => window.removeEventListener("scroll", scroll);
  }, []);
  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    if (!open) return;
    const f = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        document.getElementById("menu-toggle")?.focus();
      }
    };
    document.addEventListener("keydown", f);
    return () => document.removeEventListener("keydown", f);
  }, [open]);
  return (
    <>
      <a className="skip-link" href="#main">
        {copy("Skip to content")}
      </a>

      <div className="nav-space">
        <header className={`header ${compact ? "compressed" : ""}`}>
          <a className="brand" href="/" aria-label={`${settings.title} home`}>
            <img
              src={imageUrl(settings, "logo")}
              width="210"
              height="90"
              alt={settings.title}
            />
          </a>
          <span className="mobile-page">
            {settings.navigation.find((n) => n.path === path)?.label}
          </span>
          <button
            id="menu-toggle"
            className="menu-toggle icon-button"
            aria-label={
              open ? copy("Close navigation") : copy("Open navigation")
            }
            aria-expanded={open}
            aria-controls="main-nav"
            onClick={() => setOpen(!open)}
          >
            <Icon name={open ? "close" : "menu"} />
          </button>
          <nav
            id="main-nav"
            className={open ? copy("nav open") : "nav"}
            aria-label={copy("Main navigation")}
          >
            {settings.navigation.map((n) => (
              <a
                key={n._key}
                href={safeUrl(n.path) || "/"}
                aria-current={path === n.path ? "page" : undefined}
              >
                {n.label}
              </a>
            ))}
            <a
              className="nav-cta"
              aria-current={path === "/contact/" ? "page" : undefined}
              href="/contact/"
            >
              {copy("Let’s connect")}
              <Icon name="upRight" size={16} />
            </a>
          </nav>
        </header>
      </div>
      <main id="main" tabIndex="-1">
        {children}
      </main>
      <footer className="footer">
        <div className="footer-top">
          <div>
            <span className="eyebrow">{copy("LET’S CONNECT THE SCALES")}</span>
            <h2>
              {copy("Have a research")}
              <br />
              {copy("question in mind?")}
            </h2>
            <a className="button orange" href="/contact/">
              {copy("Connect with the lab")}
              <Icon name="upRight" />
            </a>
          </div>
          <div className="footer-marks">
            <img
              className="footer-lab-logo"
              src={imageUrl(settings, "logo")}
              alt={settings.title}
            />
          </div>
        </div>
        <div className="footer-grid">
          <div>
            <h3>{copy("Visit the lab")}</h3>
            <p>
              {settings.department}
              <br />

              {settings.address.map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </p>
          </div>
          <div>
            <h3>{copy("Explore")}</h3>
            <a href="/about/">{copy("About the lab")}</a>
            <a href="/services/">{copy("Research projects")}</a>
            <a href="/papers/">{copy("Publications")}</a>
          </div>
          <div>
            <h3>{copy("Discover")}</h3>
            <a href="/achievements/">{copy("Achievements")}</a>
            <a href="/collaborators/">{copy("Collaborators")}</a>
          </div>
          <div>
            <h3>{copy("Get in touch")}</h3>
            {settings.email ? (
              <a href={`mailto:${settings.email}`}>{settings.email}</a>
            ) : (
              <p>{settings.emailPlaceholder}</p>
            )}
            <a href="/contact/">
              {copy("Contact information ")}
              <Icon name="upRight" size={14} />
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            {copy("© ")}
            {new Date().getFullYear()} {settings.title}
          </span>
          <span>
            <a href="/privacy/">{copy("Privacy & cookie settings")}</a>
            <a href="#main">{copy("Back to top ↑")}</a>
          </span>
        </div>
      </footer>
    </>
  );
}
