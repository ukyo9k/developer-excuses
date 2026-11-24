// make.fun entry: "Make the AI Judge Laugh: Developer Excuses"
// A deterministic Node program (no network, no dependencies) that writes
// one original one-line developer excuse to /output/entry.txt. The file
// holds exactly the excuse — UTF-8, 1-200 characters, no trailing newline.
import { mkdirSync, writeFileSync } from "node:fs";

const EXCUSE =
  "Prod's down because the 'dead code' I deleted this morning was the only thing keeping payments alive.";

// The competition gate requires 1-200 characters of UTF-8 text that is
// not only whitespace. Fail loudly instead of writing an invalid entry.
const MIN_CHARS = 1;
const MAX_CHARS = 200;

/** Count Unicode code points so a multi-byte character counts as one. */
function characterCount(line: string): number {
  return [...line].length;
}

/** True when the line is non-empty, within the size cap, and not blank. */
function isValidExcuse(line: string): boolean {
  const chars = characterCount(line);
  if (chars < MIN_CHARS || chars > MAX_CHARS) return false;
  return line.trim().length > 0;
}

/** Throw with a useful message when the line cannot be a valid entry. */
function validate(line: string): void {
  if (!isValidExcuse(line)) {
    throw new Error(
      `excuse must be ${MIN_CHARS}-${MAX_CHARS} characters, got ${characterCount(line)}`,
    );
  }
}

/** Persist the validated line as the entry file. */
function writeEntry(line: string): void {
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", line, "utf8");
}

validate(EXCUSE);
writeEntry(EXCUSE);
