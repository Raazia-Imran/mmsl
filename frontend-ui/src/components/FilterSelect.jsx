import React, { useEffect, useId, useRef, useState } from "react";
import Icon from "./Icon.jsx";

export default function FilterSelect({ label, value, options, onChange }) {
  const [open, setOpen] = useState(false);
  const root = useRef(null);
  const trigger = useRef(null);
  const list = useRef(null);
  const id = useId();
  const selected = options.find((option) => option.value === value);

  useEffect(() => {
    if (!open) return;
    const current = list.current.querySelector('[aria-selected="true"]');
    current?.focus();
    function dismiss(event) {
      if (!root.current?.contains(event.target)) setOpen(false);
    }
    document.addEventListener("pointerdown", dismiss);
    return () => document.removeEventListener("pointerdown", dismiss);
  }, [open]);

  function choose(next) {
    onChange(next);
    setOpen(false);
    trigger.current.focus();
  }

  function handleKey(event) {
    if (event.key === "Escape") {
      event.preventDefault();
      setOpen(false);
      trigger.current.focus();
    }
    if (event.key === "Tab") setOpen(false);
    const items = Array.from(
      list.current?.querySelectorAll('[role="option"]') || [],
    );
    const current = items.indexOf(document.activeElement);
    let next;
    switch (event.key) {
      case "ArrowDown":
        next = (current + 1) % items.length;
        break;
      case "ArrowUp":
        next = (current - 1 + items.length) % items.length;
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = items.length - 1;
        break;
      default:
        return;
    }
    event.preventDefault();
    items[next]?.focus();
  }

  return (
    <div
      className="filter-select"
      ref={root}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
    >
      <button
        ref={trigger}
        type="button"
        className="filter-trigger"
        aria-label={label + ": " + (selected?.label || value)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen(!open)}
        onKeyDown={(event) => {
          if (["ArrowDown", "ArrowUp"].includes(event.key)) {
            event.preventDefault();
            setOpen(true);
          }
        }}
      >
        <Icon name="filter" size={16} />
        <span>{selected?.label || value}</span>
        <Icon name="chevron" size={15} />
      </button>
      {open && (
        <div
          ref={list}
          id={id}
          className="filter-options"
          role="listbox"
          aria-label={label}
          onKeyDown={handleKey}
        >
          {options.map((option) => (
            <button
              type="button"
              role="option"
              key={option.value}
              tabIndex={-1}
              aria-selected={value === option.value}
              onClick={() => choose(option.value)}
            >
              <span>{option.label}</span>
              {value === option.value && <Icon name="check" size={16} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
