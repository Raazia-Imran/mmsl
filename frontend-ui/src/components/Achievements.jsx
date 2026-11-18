import React from "react";
import Icon from "./Icon.jsx";
import { imageUrl, safeUrl } from "../content.js";

export default function Achievements({ data }) {
  return (
    <div className="news-grid">
      {data.map((item) => {
        const cover = imageUrl(item, "cover", "coverPath");
        const source = safeUrl(item.storyUrl);
        return (
          <article className="news-card" key={item._id} tabIndex={0}>
            {cover && (
              <img
                className="news-cover"
                src={cover}
                alt={item.coverAlt || ""}
                loading="lazy"
              />
            )}
            <div className="news-copy">
              {item.date && <time dateTime={item.date}>{item.date}</time>}
              <h3>{item.title}</h3>
              {item.description && <p>{item.description}</p>}
              {source && (
                <a className="text-link" href={source}>
                  Read story <Icon name="upRight" size={16} />
                </a>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
}
