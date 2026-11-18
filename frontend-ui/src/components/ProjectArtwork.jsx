import React from "react";

export default function ProjectArtwork({ styleName }) {
  return (
    <span className="project-art">
      <img
        src={`/images/research/${styleName}.webp`}
        width="680"
        height="470"
        alt=""
        loading="lazy"
        decoding="async"
      />
      <span className="art-label">AI-generated image</span>
    </span>
  );
}
