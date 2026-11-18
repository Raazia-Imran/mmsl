import React from "react";
import { safeUrl, imageUrl } from "../content.js";
export default function Partners({ data }) {

  return (
    <div className="collaborator-slider"><div className="logo-window"><div className="logo-track">{[0,1].map(copy => <div key={copy} className="logo-group" aria-hidden={copy ? true : undefined} inert={copy ? true : undefined}>
      {data.map((p) => (
        <div className="partner-logo" key={p._id}>
          {safeUrl(p.url) ? (
            <a href={safeUrl(p.url)} target="_blank" rel="noopener noreferrer">
              <img
                src={imageUrl(p, "logo", "logoPath")}
                alt={p.title}
                loading="lazy"
              />
            </a>
          ) : (
            <img
              src={imageUrl(p, "logo", "logoPath")}
              alt={p.title}
              loading="lazy"
            />
          )}
        </div>
      ))}
    </div>)}</div></div></div>
  );
}
