// make.fun entry: "Make the AI Judge Laugh: Developer Excuses"
// A deterministic program (Node, no network) that writes one original
// one-line developer excuse to /output/entry.txt — exactly the excuse, no
// trailing newline, so the file holds 1-200 characters of UTF-8 text.
import { mkdirSync, writeFileSync } from "node:fs";

const EXCUSE =
  "Prod's down because the 'dead code' I deleted this morning was the only thing keeping payments alive.";

// The gate requires 1-200 characters of UTF-8 text, not only whitespace.
// Fail loudly instead of writing an invalid entry.
const chars = [...EXCUSE].length;
if (chars < 1 || chars > 200 || EXCUSE.trim().length === 0) {
  throw new Error(`excuse must be 1-200 characters, got ${chars}`);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", EXCUSE, "utf8");
