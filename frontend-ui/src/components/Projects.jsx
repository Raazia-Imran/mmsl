import React, { useState, useCallback } from "react";
import Icon from "./Icon.jsx";
import Dialog from "./Dialog.jsx";
import ProjectArtwork from "./ProjectArtwork.jsx";

const projectArt = {
  "project-nano": "flow",
  "project-composite": "structure",
  "project-steel": "material",
};
const expertise = [
  ["Finite Element Analysis (FEA)", "structure"],
  ["Computational Fluid Dynamics (CFD)", "flow"],
  ["Molecular Dynamics (MD)", "material"],
];
export default function Projects({ data, compact = false }) {
  const [selected, setSelected] = useState(null);
  const close = useCallback(() => setSelected(null), []);
  if (!data.length)
    return <p className="empty-state">Projects will be published here.</p>;
  return (
    <>
      {!compact && <h2>Current projects</h2>}
      <div className="service-deck project-deck">
        {data.map((project) => (
          <button
            className="service-card"
            key={project._id}
            onClick={() => setSelected(project)}
          >
            {projectArt[project._id] && (
              <ProjectArtwork styleName={projectArt[project._id]} />
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
          <div className="service-deck">
            {expertise.map(([name, design]) => (
              <article className="service-card expertise-card" key={name}>
                <ProjectArtwork styleName={design} />
                <div className="service-card-copy">
                  <h3>{name}</h3>
                </div>
              </article>
            ))}
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
