import React from "react";
import { imageUrl } from "../content.js";

const icons = new Set(["flow", "structure", "material"]);

export default function ProjectArtwork({ styleName, image, alt = "" }) {
  const bundled = icons.has(styleName) ? styleName : "structure";
  const src =
    imageUrl({ image }, "image") || `/images/research/icon-${bundled}.webp`;
  return (
    <span className="project-art engineering-art">
      <img
        src={src}
        width="440"
        height="360"
        alt={alt}
        loading="lazy"
        decoding="async"
      />
    </span>
  );
}
