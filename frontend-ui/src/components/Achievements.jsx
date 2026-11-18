import { useCopy } from "./ContentCopy.jsx";
import React from "react";
import Icon from "./Icon.jsx";
import SwipeCarousel from "./SwipeCarousel.jsx";
import { imageUrl, safeUrl } from "../content.js";
export default function Achievements({ data, label }) {
  const copy = useCopy();
  return (
    <SwipeCarousel label={label}>
      {data.map((item) => {
        const cover = imageUrl(item, "cover"),
          source = safeUrl(item.storyUrl);
        return (
          <article
            className={`news-card highlight-card${item.placeholder ? " placeholder-card" : ""}`}
            key={item._id}
            tabIndex={0}
            aria-label={
              item.placeholder ? copy("News card awaiting content") : undefined
            }
          >
            <div className="news-visual">
              {cover && (
                <img
                  className="news-cover"
                  src={cover}
                  alt={item.coverAlt || ""}
                  loading="lazy"
                  draggable={false}
                />
              )}
            </div>
            <div className="news-copy">
              {!item.placeholder && (
                <>
                  {item.date && <time dateTime={item.date}>{item.date}</time>}
                  {item.title && <h3>{item.title}</h3>}
                  {item.description && <p>{item.description}</p>}
                  {source && (
                    <a className="text-link" href={source}>
                      {copy("Read story ")}
                      <Icon name="upRight" size={16} />
                    </a>
                  )}
                </>
              )}
            </div>
          </article>
        );
      })}
    </SwipeCarousel>
  );
}
