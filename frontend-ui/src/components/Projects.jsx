import React, { useState, useCallback } from "react";
import Icon from "./Icon.jsx";
import Dialog from "./Dialog.jsx";
import ProjectArtwork from "./ProjectArtwork.jsx";

const projectArt = {
  "project-nano": "flow",
  "project-composite": "structure",
  "project-steel": "material",
};
export default function Projects({ data, expertise = [], compact = false }) {
  const [selected, setSelected] = useState(null);
  const close = useCallback(() => setSelected(null), []);
  return (
    <>
      {!compact && <h2>Current projects</h2>}
      {!data.length && (
        <p className="empty-state">Projects will be published here.</p>
      )}
      <div className="service-deck project-deck">
        {data.map((project) => (
          <button
            className="service-card"
            key={project._id}
            onClick={() => setSelected(project)}
          >
            {(project.image || project.icon || projectArt[project._id]) && (
              <ProjectArtwork
                styleName={project.icon || projectArt[project._id]}
                image={project.image}
                alt={project.imageAlt}
              />
            )}
            <span className="service-card-copy">
              <strong>{project.title}</strong>
              <span>{project.summary}</span>
              <span className="card-action">
                Project details <Icon name="upRight" size={16} />
              </span>
            </span>
          </button>
        ))}
      </div>
      {!compact && (
        <>
          <h2>Expertise</h2>
          <div className="expertise-stage">
            <div className="expertise-deck">
              {expertise.map((entry) => (
                <article
                  className="expertise-glass"
                  key={entry._id}
                  tabIndex={0}
                >
                  <ProjectArtwork
                    styleName={entry.icon || "structure"}
                    image={entry.image}
                    alt={entry.imageAlt}
                  />
                  <h3>{entry.title}</h3>
                  {entry.description?.trim() && <p>{entry.description}</p>}
                </article>
              ))}
            </div>
          </div>
        </>
      )}
      {selected && (
        <Dialog title={selected.title} onClose={close}>
          <div className="tags">
            {selected.methods?.map((m) => (
              <span key={m}>{m}</span>
            ))}
          </div>
          <p>{selected.summary}</p>
          {selected.description && <p>{selected.description}</p>}
          <a className="button primary" href="/contact/">
            Ask about this research
            <Icon name="upRight" />
          </a>
        </Dialog>
      )}
    </>
  );
}
