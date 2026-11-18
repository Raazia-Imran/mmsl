import React, { useId, useRef, useState, useEffect, Children } from "react";
import Icon from "./Icon.jsx";
import { useCopy } from "./ContentCopy.jsx";
export default function SwipeCarousel({ label, children }) {
  const copy = useCopy();
  const id = useId();
  const view = useRef(null);
  const drag = useRef(null);
  const suppressClick = useRef(false);
  const [active, setActive] = useState(0);
  const cards = Children.toArray(children);
  useEffect(() => {
    const el = view.current;
    if (!el) return;
    let frame;
    const measure = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const center = el.scrollLeft + el.clientWidth / 2;
        let nearest = 0,
          best = Infinity;
        [...el.children].forEach((card, i) => {
          const distance = Math.abs(
            card.offsetLeft + card.offsetWidth / 2 - center,
          );
          if (distance < best) {
            nearest = i;
            best = distance;
          }
        });
        setActive(nearest);
      });
    };
    el.addEventListener("scroll", measure, { passive: true });
    const resize = new ResizeObserver(measure);
    resize.observe(el);
    measure();
    return () => {
      el.removeEventListener("scroll", measure);
      resize.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [cards.length]);
  function go(index) {
    const el = view.current;
    const i = Math.max(0, Math.min(index, cards.length - 1));
    const card = el.children[i];
    if (!card) return;
    const reduce =
      matchMedia("(prefers-reduced-motion: reduce)").matches ||
      document.documentElement.dataset.motion === "off";
    el.scrollTo({
      left: card.offsetLeft - (el.clientWidth - card.offsetWidth) / 2,
      behavior: reduce ? "instant" : "smooth",
    });
  }
  if (!cards.length) return null;
  return (
    <div
      className="swipe-carousel"
      role="region"
      aria-roledescription={copy("Card carousel")}
      aria-label={label}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
          e.preventDefault();
          go(active + (e.key === "ArrowRight" ? 1 : -1));
        } else if (e.key === "Home" || e.key === "End") {
          e.preventDefault();
          go(e.key === "Home" ? 0 : cards.length - 1);
        }
      }}
    >
      <div
        className="highlight-viewport"
        id={id}
        ref={view}
        tabIndex={0}
        onDragStart={(e) => e.preventDefault()}
        onPointerDown={(e) => {
          if (e.pointerType === "mouse" && e.button === 0) {
            suppressClick.current = false;
            drag.current = {
              x: e.clientX,
              left: e.currentTarget.scrollLeft,
              moved: false,
            };
          }
        }}
        onPointerMove={(e) => {
          const d = drag.current;
          if (!d) return;
          const dx = e.clientX - d.x;
          if (Math.abs(dx) > 6 && !d.moved) {
            d.moved = true;
            e.currentTarget.setPointerCapture(e.pointerId);
            e.currentTarget.dataset.dragging = "true";
          }
          if (d.moved) {
            e.preventDefault();
            e.currentTarget.scrollLeft = d.left - dx;
          }
        }}
        onPointerUp={(e) => {
          if (drag.current?.moved) {
            suppressClick.current = true;
            if (e.currentTarget.hasPointerCapture(e.pointerId))
              e.currentTarget.releasePointerCapture(e.pointerId);
          }
          drag.current = null;
          delete e.currentTarget.dataset.dragging;
        }}
        onPointerCancel={(e) => {
          drag.current = null;
          delete e.currentTarget.dataset.dragging;
        }}
        onClickCapture={(e) => {
          if (suppressClick.current) {
            e.preventDefault();
            e.stopPropagation();
            suppressClick.current = false;
          }
        }}
      >
        {cards.map((card, i) =>
          React.cloneElement(card, {
            "data-position":
              i === active ? "active" : i < active ? "before" : "after",
            "aria-label":
              card.props["aria-label"] || `${i + 1} / ${cards.length}`,
          }),
        )}
      </div>
      <div className="carousel-controls">
        <button
          type="button"
          className="carousel-arrow previous"
          aria-label={`${label}: ${copy("Previous card")}`}
          aria-controls={id}
          disabled={active === 0}
          onClick={() => go(active - 1)}
        >
          <Icon name="arrow" />
        </button>
        <span
          className="carousel-position"
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          {active + 1} / {cards.length}
        </span>
        <button
          type="button"
          className="carousel-arrow"
          aria-label={`${label}: ${copy("Next card")}`}
          aria-controls={id}
          disabled={active >= cards.length - 1}
          onClick={() => go(active + 1)}
        >
          <Icon name="arrow" />
        </button>
      </div>
      <p className="carousel-hint">{copy("Swipe or use the arrow controls")}</p>
    </div>
  );
}
