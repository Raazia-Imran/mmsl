import { useCopy } from "../components/ContentCopy.jsx";
import React from "react";
import Icon from "../components/Icon.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import ScaleExplorer from "../components/ScaleExplorer.jsx";
import Projects from "../components/Projects.jsx";
import Publications from "../components/Publications.jsx";
import Resources from "../components/Resources.jsx";
import Partners from "../components/Partners.jsx";
import Achievements from "../components/Achievements.jsx";
import { imageUrl } from "../content.js";
export default function Home({ data }) {
  const copy = useCopy();

  const { home, projects, publications, resources, partners, achievements } =
    data;
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">
            <i /> {home.eyebrow}
          </span>
          <h1>
            {(home.heroTitle || "").split("\n").map((x, i) => (
              <React.Fragment key={i}>
                {i > 0 && <br />}
                {i === 1 ? <em>{x}</em> : x}
              </React.Fragment>
            ))}
          </h1>
          <p className="hero-lab">{data.settings.title}</p>
          <p className="hero-description">{home.heroDescription}</p>
          <div className="hero-actions">
            <a className="button primary" href="/services/">
              {home.primaryActionLabel}
              <Icon name="upRight" />
            </a>
            <a className="hero-secondary" href="/about/">
              {home.secondaryActionLabel}
              <Icon name="arrow" />
            </a>
          </div>
        </div>
        <div className="hero-art">
          <img
            src={imageUrl(home, "heroImage")}
            alt={home.heroImageAlt || ""}
            fetchPriority="high"
          />
        </div>
      </section>

      <section className="section introduction" id="approach">
        <SectionHeading
          label={copy("THE LAB / OUR APPROACH")}
          title={home.aboutTitle}
          href="/about/"
          linkLabel={copy("Inside the lab")}
        />
        <div className="intro-copy" data-reveal>
          {home.aboutParagraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </section>

      <section className="section research-section">
        <SectionHeading
          label={copy("RESEARCH IN FOCUS")}
          title={home.projectTitle}
          description={copy(
            "Explore the questions, materials and methods behind our projects.",
          )}
          href="/services/"
          linkLabel={copy("All projects")}
        />
        <Projects data={projects} compact />
      </section>
      <section className="section publication-section">
        <SectionHeading
          label={copy("KNOWLEDGE IN PRINT")}
          title={home.papersTitle}
          description={copy(
            "Research connecting computational methods with engineering applications.",
          )}
          href="/papers/"
          linkLabel={copy("All publications")}
        />
        <Publications data={publications} compact />
      </section>
      <section className="section milestones-section">
        <SectionHeading
          label=""
          title={home.achievementTitle}
          href="/achievements/"
          linkLabel={copy("Our achievements")}
        />
        <Achievements data={achievements} />
      </section>
      <section className="section collaborators-section">
        <SectionHeading
          label={copy("CONNECTED THROUGH COLLABORATION")}
          title={home.partnersTitle}
          description={home.partnersSubtitle}
        />
        <Partners data={partners} />
      </section>
    </>
  );
}
