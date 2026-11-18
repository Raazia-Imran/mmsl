import React, { createContext, useContext, useMemo } from "react";
const Context = createContext(() => "");
export function makeCopy(groups = []) {
  const entries = Object.fromEntries(
    groups.flatMap((group) =>
      (group.entries || []).map((entry) => [entry.key, entry.value ?? ""]),
    ),
  );
  return (key) => entries[key] ?? "";
}
export function CopyProvider({ groups, children }) {
  const copy = useMemo(() => makeCopy(groups), [groups]);
  return <Context.Provider value={copy}>{children}</Context.Provider>;
}
export const useCopy = () => useContext(Context);
