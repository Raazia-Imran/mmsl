import { getCliClient } from "sanity/cli";
import { readFile } from "node:fs/promises";

const data = JSON.parse(
  await readFile(
    new URL("../../frontend-ui/src/content.json", import.meta.url),
    "utf8",
  ),
);
const client = getCliClient({ apiVersion: "2025-02-19" }).withConfig({
  useCdn: false,
});
if (client.config().projectId !== "4isekt9n")
  throw new Error("Unexpected Sanity project");
if (!process.argv.includes("--apply")) {
  console.log(
    "Preview only: create missing Expertise cards with empty descriptions. Pass --apply to continue.",
  );
} else {
  let tx = client.transaction();
  for (const entry of data.expertise) tx = tx.createIfNotExists(entry);
  await tx.commit();
  console.log("Expertise cards created; existing content preserved.");
}
