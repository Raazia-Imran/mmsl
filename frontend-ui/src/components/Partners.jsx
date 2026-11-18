import React from "react";
import { safeUrl, imageUrl } from "../content.js";

export default function Partners({ data }) {
  return (
    <ul className="collaborator-tiles">
      {data.map((partner) => {
        const url = safeUrl(partner.url);
        const logo = imageUrl(partner, "logo", "logoPath");
        const content = logo ? <img src={logo} alt={partner.title} loading="lazy" /> : partner.title;
        return (
          <li className="partner-logo" key={partner._id}>
            {url ? <a href={url} target="_blank" rel="noopener noreferrer">{content}</a> : content}
          </li>
        );
      })}
    </ul>
  );
}
