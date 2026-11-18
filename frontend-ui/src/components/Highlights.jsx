import React from "react";
import { useCopy } from "./ContentCopy.jsx";
import Achievements from "./Achievements.jsx";
export default function Highlights({
  achievements = [],
  news = [],
  compact = false,
}) {
  const copy = useCopy();
  const Heading = compact ? "h3" : "h2";
  return (
    <div className="highlights-sections">
      <section
        className="highlight-section"
        aria-label={copy("Achievement milestones")}
      >
        <Heading>{copy("Achievement milestones")}</Heading>
        <Achievements
          data={achievements}
          label={copy("Achievement milestones")}
        />
      </section>
      <section className="highlight-section" aria-label={copy("Latest news")}>
        <Heading>{copy("Latest news")}</Heading>
        {news.length > 0 && (
          <Achievements data={news} label={copy("Latest news")} />
        )}
      </section>
    </div>
  );
}
