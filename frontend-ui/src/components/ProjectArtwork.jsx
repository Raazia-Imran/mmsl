import React from "react";
import { imageUrl } from "../content.js";
export default function ProjectArtwork({ image, alt = "" }) {
  const src = imageUrl({ image }, "image");
  if (!src) return null;
  return (
    <span className="project-art engineering-art">
      <img
        src={src}
        alt={alt}
        width="440"
        height="440"
        loading="lazy"
        decoding="async"
      />
    </span>
  );
}
