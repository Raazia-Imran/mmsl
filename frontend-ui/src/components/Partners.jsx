import React from "react";
import { safeUrl, imageUrl } from "../content.js";

function PartnerLogo({ partner, duplicate }) {
  const url = safeUrl(partner.url);
  const logo = imageUrl(partner, "logo", "logoPath");
  const content = (
    <div className="partner-image">
      {logo ? (
        <img src={logo} alt={duplicate ? "" : partner.title} loading="lazy" />
      ) : (
        partner.title
      )}
    </div>
  );
  return (
    <li className="partner-logo">
      {url && !duplicate ? (
        <a href={url} target="_blank" rel="noopener noreferrer">
          {content}
        </a>
      ) : (
        content
      )}
    </li>
  );
}

export default function Partners({ data }) {
  return (
    <div className="collaborator-marquee" aria-label="Collaborators">
      <div className="collaborator-track">
        <ul className="collaborator-row">
          {data.map((partner) => (
            <PartnerLogo key={partner._id} partner={partner} />
          ))}
        </ul>
        <ul className="collaborator-row" aria-hidden="true" inert>
          {data.map((partner) => (
            <PartnerLogo key={partner._id} partner={partner} duplicate />
          ))}
        </ul>
      </div>
    </div>
  );
}
