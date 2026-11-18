import { useCopy } from "../components/ContentCopy.jsx";
import MotionPreference from "../components/MotionPreference.jsx";
import React from "react";
import Projects from "../components/Projects.jsx";
import Publications from "../components/Publications.jsx";
import Resources from "../components/Resources.jsx";
import Highlights from "../components/Highlights.jsx";
import Partners from "../components/Partners.jsx";
import ScaleExplorer from "../components/ScaleExplorer.jsx";
import Contact from "./Contact.jsx";
import Icon from "../components/Icon.jsx";
import { imageUrl, safeUrl } from "../content.js";
export default function InnerPage({ path, data }) {
  const copy = useCopy();

  const page = data.pageSettings?.pages?.find((p) => p.path === path);
  const [label, title, description] = page
    ? [page.kicker, page.title, page.description]
    : [];
  return (
    <>
      <section className="page-hero">
        <div>
          {label?.trim() && <span className="eyebrow">{label}</span>}
          <h1>
            {title?.split("\n").map((x, i) => (
              <React.Fragment key={i}>
                {i > 0 && <br />}
                {i === 1 ? <em>{x}</em> : x}
              </React.Fragment>
            ))}
          </h1>
          <p>{description}</p>
        </div>
      </section>
      {path === "/about/" ? (
        <>
          <section className="section about-body">
            <span className="eyebrow">{data.settings.title}</span>
            <h2>{copy("Scope and objectives")}</h2>
            <div>
              {data.home.aboutParagraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>
          <section
            className="section purpose-section"
            aria-label={copy("Mission and vision")}
          >
            {["mission", "vision"].map((field) => (
              <article className="purpose-card" key={field} tabIndex={0}>
                <Icon name={field === "mission" ? "target" : "eye"} size={25} />
                <h2>
                  {field === "mission" ? copy("Mission") : copy("Vision")}
                </h2>
                {page?.[field]?.trim() && <p>{page[field]}</p>}
              </article>
            ))}
          </section>
        </>
      ) : (
        <section className="section inner-content">
          {path === "/team/" && (
            <div className="team-grid">
              {data.team?.length ? (
                data.team.map((m) => (
                  <article key={m._id}>
                    {imageUrl(m, "photo") && (
                      <img
                        className="team-photo"
                        src={imageUrl(m, "photo")}
                        alt={m.photoAlt || m.name}
                        loading="lazy"
                      />
                    )}
                    <h2>{m.name}</h2>
                    <p>{m.role}</p>
                    <p>{m.biography}</p>
                    {safeUrl(m.profileUrl) && (
                      <a
                        className="text-link"
                        href={safeUrl(m.profileUrl)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {copy("Academic profile")}
                      </a>
                    )}
                  </article>
                ))
              ) : (
                <div className="empty-state">
                  <h2>{copy("Team profiles are being prepared.")}</h2>
                  <p>
                    {copy(
                      "Approved names, roles, biographies and photographs will be added here.",
                    )}
                  </p>
                </div>
              )}
            </div>
          )}
          {path === "/services/" && (
            <Projects data={data.projects} expertise={data.expertise} />
          )}
          {path === "/papers/" && <Publications data={data.publications} />}
          {path === "/achievements/" && (
            <>
              <p className="content-note">
                {copy(
                  "These supplied milestones are awaiting confirmation and supporting details from the lab.",
                )}
              </p>
              <Highlights achievements={data.achievements} news={data.news} />
            </>
          )}
          {path === "/collaborators/" && (
            <>
              <Partners data={data.partners} />
            </>
          )}
          {path === "/resources/" && <Resources data={data.resources} />}
          {path === "/contact/" && <Contact settings={data.settings} />}
          {path === "/privacy/" && (
            <div className="prose">
              <h2>{copy("Contact enquiries")}</h2>
              <p>
                {copy(
                  "When the contact form is enabled, it asks for your name, email address and message so the lab can respond. Please do not include sensitive personal information.",
                )}
              </p>
              <p>
                {copy(
                  "Submitted form data is sent through Web3Forms to the lab’s configured contact address. Its processing is subject to",
                )}{" "}
                <a
                  href="https://web3forms.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {copy("Web3Forms’ privacy policy")}
                </a>
                {copy(". If the form is unavailable, no enquiry is submitted.")}
              </p>
              <h2>{copy("Website services")}</h2>
              <p>
                {copy(
                  "The website uses Vercel for hosting and Sanity for public content delivery. These providers may process technical request information such as IP addresses and browser details to operate and protect their services.",
                )}
              </p>
              <h2>{copy("Cookies and animation preferences")}</h2>
              <MotionPreference />
              <p>
                {copy(
                  "This website does not add advertising cookies or optional analytics. Browser preferences and security features provided by the hosting service may apply.",
                )}
              </p>
              <h2>{copy("Contact and retention")}</h2>
              <p>
                {copy(
                  "The lab’s official contact address and enquiry retention arrangements will be published after confirmation. This notice should be reviewed by the lab before the contact form is activated.",
                )}
              </p>
            </div>
          )}
        </section>
      )}
    </>
  );
}
