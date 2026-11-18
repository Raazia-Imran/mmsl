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
  const { home, projects, publications, resources, partners, achievements } =
    data;
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">
            <i /> RESEARCH ACROSS SCALES
          </span>
          <h1>
            {home.heroTitle.split("\n").map((x, i) => (
              <React.Fragment key={i}>
                {i > 0 && <br />}
                {i === 1 ? <em>{x}</em> : x}
              </React.Fragment>
            ))}
          </h1>
          <p className="hero-lab">Multiscale Modelling & Simulation Lab</p>
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
            src="/images/hero-bg.png"
            alt=""
            fetchPriority="high"
          />
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="art-label art-label-top">
            <span className="status-dot" /> EXPLORING THE CONNECTIONS
          </div>
          <div className="hero-glass">
            <Icon name="atom" size={30} />
            <div>
              Multiscale simulation
              <small>FEA · CFD · MD</small>
            </div>
          </div>
          <span className="hero-art-caption">
            
          </span>
        </div>
        <a className="scroll-cue" href="#approach">
          <span>SCROLL TO EXPLORE</span>
          <span>↓</span>
        </a>
      </section>
      <div className="research-ribbon">
        <span>Material behaviour</span>
        <i />
        <span>Fluid dynamics</span>
        <i />
        <span>Structural mechanics</span>
        <i />
        <span>Computational methods</span>
      </div>
      <section className="section introduction" id="approach">
        <SectionHeading
          label="THE LAB / OUR APPROACH"
          title={home.aboutTitle}
          href="/about/"
          linkLabel="Inside the lab"
        />
        <div className="intro-copy" data-reveal>
          {home.aboutParagraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </section>
      
      <section className="section research-section">
        <SectionHeading
          label="RESEARCH IN FOCUS"
          title={home.projectTitle}
          description="Explore the questions, materials and methods behind our projects."
          href="/services/"
          linkLabel="All projects"
        />
        <Projects data={projects} compact />
      </section>
      <section className="section publication-section">
        <SectionHeading
          label="KNOWLEDGE IN PRINT"
          title={home.papersTitle}
          description="Research connecting computational methods with engineering applications."
          href="/papers/"
          linkLabel="All publications"
        />
        <Publications data={publications} compact />
      </section>
      <section className="section milestones-section">
        <SectionHeading
          label="MOMENTS THAT MATTER"
          title={home.achievementTitle}
          href="/achievements/"
          linkLabel="Our achievements"
        />
        <Achievements data={achievements} />
      </section>
      <section className="section collaborators-section">
        <SectionHeading
          label="CONNECTED THROUGH COLLABORATION"
          title="Collaborators"
          
        />
        <Partners data={partners} />
      </section>

    </>
  );
}
