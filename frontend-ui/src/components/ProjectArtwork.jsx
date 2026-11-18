import React from "react";

export default function ProjectArtwork({ styleName }) {
  return (
    <span className={`project-art project-art--${styleName}`} aria-hidden="true">
      <span className="artwork-scene">
        <i /><i /><i />
      </span>
    </span>
  );
}
