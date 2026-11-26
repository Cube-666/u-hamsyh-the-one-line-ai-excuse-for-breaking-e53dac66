// The One-Line AI Excuse for Breaking Production.
// Writes the entry line to /output/entry.txt (MAKEFUN_OUTPUT_DIR when set).
// Node 22, standard library only, no network, deterministic.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The line: a status report that escalates. It owns the breakage ("it was
// me"), then undercuts the repair the same way ("the fix is also me") — the
// machine apologising in its own logic, cheerful to the end, no stock line.
const LINE =
  "Good news: I found the bug. Bad news: it was me. Worse news: I have already deployed the fix, and the fix is also me.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });

// The gate: /output/entry.txt must be UTF-8 text of 1 to 180 characters,
// a single line, and not only white space.
if (LINE.length < 1 || LINE.length > 180) {
  throw new Error(`entry line must be 1-180 characters, got ${LINE.length}`);
}
if (LINE.trim().length === 0) {
  throw new Error("entry line must not be only white space");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry line must be a single line");
}

const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE, "utf8");
console.log(`Wrote ${LINE.length}-character entry to ${outPath}`);
