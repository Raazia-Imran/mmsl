import { useCopy } from "./ContentCopy.jsx";
import React, { useState, useCallback } from "react";
import Icon from "./Icon.jsx";
import Dialog from "./Dialog.jsx";
import ProjectArtwork from "./ProjectArtwork.jsx";

export default function Projects({ data, expertise = [], compact = false }) {
  const copy = useCopy();

  const [selected, setSelected] = useState(null);
  const close = useCallback(() => setSelected(null), []);
  return (
    <>
      {!compact && <h2>{copy("Current projects")}</h2>}
      {!data.length && (
        <p className="empty-state">
          {copy("Projects will be published here.")}
        </p>
      )}
      <div className="service-deck project-deck">
        {data.map((project) => (
          <button
            className="service-card"
            key={project._id}
            onClick={() => setSelected(project)}
          >
            {project.image && (
              <ProjectArtwork image={project.image} alt={project.imageAlt} />
            )}
            <span className="service-card-copy">
              <strong>{project.title}</strong>
              <span>{project.summary}</span>
              <span className="card-action">
                {copy("Project details ")}
                <Icon name="upRight" size={16} />
              </span>
            </span>
          </button>
        ))}
      </div>
      {!compact && (
        <>
          <h2>{copy("Expertise")}</h2>
          <div className="expertise-stage">
            <div className="expertise-deck">
              {expertise.map((entry) => (
                <article
                  className="expertise-glass"
                  key={entry._id}
                  tabIndex={0}
                >
                  <ProjectArtwork image={entry.image} alt={entry.imageAlt} />
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
            {selected.discipline && <span>{selected.discipline}</span>}
            {selected.methods?.map((m) => (
              <span key={m}>{m}</span>
            ))}
          </div>
          <p>{selected.summary}</p>
          {selected.description && <p>{selected.description}</p>}
          <a className="button primary" href="/contact/">
            {copy("Ask about this research")}
            <Icon name="upRight" />
          </a>
        </Dialog>
      )}
    </>
  );
}
