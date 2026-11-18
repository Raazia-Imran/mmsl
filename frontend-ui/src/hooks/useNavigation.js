import { useEffect, useState } from "react";
import { flushSync } from "react-dom";
import { paths } from "../content.js";

const normalize = (path) => (path.endsWith("/") ? path : path + "/");

export default function useNavigation(initialPath) {
  const [path, setPath] = useState(initialPath);

  useEffect(() => {
    let transition;

    function navigate(next, hash, moveFocus) {
      transition?.skipTransition();
      const commit = () => {
        flushSync(() => setPath(next));
        if (moveFocus) document.getElementById("main")?.focus({ preventScroll: true });
        const anchor = hash && document.getElementById(hash.slice(1));
        if (anchor) anchor.scrollIntoView({ behavior: "instant" });
        else window.scrollTo({ top: 0, behavior: "instant" });
      };

      const allowMotion = document.documentElement.dataset.motion !== "off" &&
        !matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (document.startViewTransition && allowMotion) {
        transition = document.startViewTransition(commit);
      } else {
        commit();
      }
    }

    const pop = () => navigate(normalize(location.pathname), location.hash, false);
    function click(event) {
      const link = event.target.closest?.("a[href]");
      if (!link || event.defaultPrevented || event.button !== 0 ||
          event.metaKey || event.ctrlKey || event.shiftKey || event.altKey ||
          link.target || link.hasAttribute("download")) return;

      const url = new URL(link.href);
      const next = normalize(url.pathname);
      if (url.origin !== location.origin || !paths.includes(next) || url.search) return;
      if (next === normalize(location.pathname) && url.hash) return;
      event.preventDefault();
      if (next === normalize(location.pathname) && !location.hash) return;
      history.pushState({}, "", next + url.hash);
      navigate(next, url.hash, true);
    }

    document.addEventListener("click", click);
    window.addEventListener("popstate", pop);
    return () => {
      transition?.skipTransition();
      document.removeEventListener("click", click);
      window.removeEventListener("popstate", pop);
    };
  }, []);
  return path;
}
