import React, { useState, useCallback } from "react";
import Icon from "./Icon.jsx";
import Dialog from "./Dialog.jsx";
import { Lattice } from "./ScaleExplorer.jsx";
export default function Projects({ data, compact = false }) {
  const [active, setActive] = useState(0);
  const [selected, setSelected] = useState(null);
  const close = useCallback(() => setSelected(null), []);
  if (!data.length)
    return <p className="empty-state">Projects will be published here.</p>;
  const p = data[active] || data[0];
  return (
    <>
      <h2>Current projects</h2>
      <div className="service-deck">{data.map(project => <button className="service-card" key={project._id} onClick={() => setSelected(project)}><strong>{project.title}</strong><span>{project.summary}</span><Icon name="upRight" /></button>)}</div>
      {!compact && <><h2>Expertise</h2><div className="service-deck">{["Finite Element Analysis (FEA)", "Computational Fluid Dynamics (CFD)", "Molecular Dynamics (MD)"].map(method => <article className="service-card" key={method}><strong>{method}</strong></article>)}</div></>}
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
