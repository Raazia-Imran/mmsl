import React, { useState } from "react";
export default function MotionPreference() {
  const [enabled, setEnabled] = useState(() => typeof document !== "undefined" && document.documentElement.dataset.motion === "off");
  function change(event) {
    const off = event.target.checked;
    setEnabled(off);
    document.documentElement.dataset.motion = off ? "off" : "";
    try {
      if (off) localStorage.setItem("mmsl-motion", "off");
      else localStorage.removeItem("mmsl-motion");
    } catch {}
  }
  return <><label><input type="checkbox" checked={enabled} onChange={change} /> Reduce animation on this device</label><p>Turning this on saves your choice in this browser. Clearing it removes the saved preference.</p></>;
}
