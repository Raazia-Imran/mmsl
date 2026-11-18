import { useCopy } from "./ContentCopy.jsx";
import React, { useState, useMemo, useCallback } from "react";
import Icon from "./Icon.jsx";
import FilterSelect from "./FilterSelect.jsx";
import Dialog from "./Dialog.jsx";
import { safeUrl } from "../content.js";
export default function Publications({ data, compact = false }) {
  const copy = useCopy();

  const [query, setQuery] = useState("");
  const [year, setYear] = useState("all");
  const [sort, setSort] = useState("newest");
  const [selected, setSelected] = useState(null);
  const close = useCallback(() => setSelected(null), []);
  const filtered = useMemo(
    () =>
      data
        .filter(
          (p) =>
            `${p.title} ${p.authors} ${p.journal} ${(p.authorList || []).join(" ")}`
              .toLowerCase()
              .includes(query.trim().toLowerCase()) &&
            (year === "all" || String(p.year) === year),
        )
        .sort((a, b) =>
          sort === "oldest" ? a.year - b.year : b.year - a.year,
        ),
    [data, query, year, sort],
  );
  return (
    <>
      {!compact && (
        <div className="publication-tools" data-reveal>
          <label className="search-field">
            <Icon name="search" />
            <input
              type="search"
              aria-label={copy("Search publications")}
              placeholder={copy("Search by title, author or journal")}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
          <div className="paper-filters">
            <FilterSelect
              label={copy("Publication year")}
              value={year}
              onChange={setYear}
              options={[
                { value: "all", label: copy("All years") },
                ...[
                  ...new Set(
                    data.map((paper) => paper.year).filter(Number.isFinite),
                  ),
                ]
                  .sort((a, b) => b - a)
                  .map((year) => ({
                    value: String(year),
                    label: String(year),
                  })),
              ]}
            />
            <FilterSelect
              label={copy("Sort publications")}
              value={sort}
              onChange={setSort}
              options={[
                { value: "newest", label: copy("Newest first") },
                { value: "oldest", label: copy("Oldest first") },
              ]}
            />
          </div>
        </div>
      )}
      <div className="publication-count" aria-live="polite">
        <span>
          {filtered.length}{" "}
          {filtered.length === 1 ? copy("publication") : copy("publications")}
        </span>
        {!compact && (query || year !== "all" || sort !== "newest") && (
          <button
            onClick={() => {
              setQuery("");
              setYear("all");
              setSort("newest");
            }}
          >
            {copy("Clear filters ")}
            <Icon name="close" size={13} />
          </button>
        )}
      </div>
      <div className="publication-grid">
        {filtered.map((p, i) => (
          <article className="publication-card" key={p._id} data-reveal>
            <div className="publication-cover" aria-hidden="true">
              <span>
                {copy("RESEARCH")}
                <br />
                {copy("PAPER")}
              </span>
              <Icon name="book" size={45} />
              <strong>{p.year}</strong>
              <i />
            </div>
            <div className="publication-body">
              <div className="publication-topline">
                <span>{copy("JOURNAL ARTICLE")}</span>
                <span>{String(i + 1).padStart(2, "0")}</span>
              </div>
              <p className="journal">{p.journal}</p>
              <h3>
                <button onClick={() => setSelected(p)}>{p.title}</button>
              </h3>
              <p className="publication-authors">
                {p.authorList?.length ? p.authorList.join(", ") : p.authors}
              </p>
              {p.abstract && <p className="abstract-preview">{p.abstract}</p>}
              <div className="publication-actions">
                <button className="text-link" onClick={() => setSelected(p)}>
                  {copy("View paper")}
                  <Icon name="upRight" size={16} />
                </button>
                {safeUrl(p.pdfUrl || p.pdfPath) ? (
                  <a
                    className="paper-action"
                    href={safeUrl(p.pdfUrl || p.pdfPath)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon name="download" size={16} />
                    {copy("PDF")}
                  </a>
                ) : (
                  <span className="unavailable">
                    <Icon name="file" size={14} />
                    {copy("PDF pending")}
                  </span>
                )}
                {safeUrl(p.url) ||
                (p.doi && /^10\.[0-9]{4,9}\//.test(p.doi)) ? (
                  <a
                    className="paper-action"
                    href={
                      safeUrl(p.url) || `https://doi.org/${encodeURI(p.doi)}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {copy("DOI")}
                    <Icon name="upRight" size={14} />
                  </a>
                ) : null}
              </div>
            </div>
          </article>
        ))}
      </div>
      {!filtered.length && (
        <div className="empty-state">
          <Icon name="search" size={30} />
          <h3>{copy("No matching publications")}</h3>
          <p>{copy("Try a different title, author or year.")}</p>
        </div>
      )}
      {selected && (
        <Dialog title={selected.title} onClose={close}>
          <dl className="paper-facts">
            <div>
              <dt>{copy("Authors")}</dt>
              <dd>
                {selected.authorList?.length
                  ? selected.authorList.join(", ")
                  : selected.authors}
              </dd>
            </div>
            <div>
              <dt>{copy("Published in")}</dt>
              <dd>
                {selected.journal}
                {copy(", ")}
                {selected.year}
              </dd>
            </div>
            {selected.doi && (
              <div>
                <dt>{copy("DOI")}</dt>
                <dd>{selected.doi}</dd>
              </div>
            )}
          </dl>
          {selected.abstract && (
            <>
              <h3>{copy("Abstract")}</h3>
              <p>{selected.abstract}</p>
            </>
          )}
          {safeUrl(selected.pdfUrl || selected.pdfPath) ? (
            <a
              className="button primary"
              href={safeUrl(selected.pdfUrl || selected.pdfPath)}
              target="_blank"
              rel="noopener noreferrer"
            >
              {copy("Open paper PDF")}
              <Icon name="download" />
            </a>
          ) : (
            <p className="content-note">
              {copy(
                "The paper PDF and complete bibliographic details will be added after confirmation by the lab.",
              )}
            </p>
          )}
        </Dialog>
      )}
    </>
  );
}
