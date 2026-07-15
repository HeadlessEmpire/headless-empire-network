import {readFile} from "node:fs/promises";
import {validateDocument} from "./validator.mjs";

const paths = process.argv.slice(2);
if (paths.length === 0) {
  console.error("Usage: node scripts/validate.mjs <json-file> [...json-files]");
  process.exit(2);
}

let failed = false;
for (const path of paths) {
  try {
    const document = JSON.parse(await readFile(path, "utf8"));
    const result = validateDocument(document);
    if (result.errors.length > 0) {
      failed = true;
      console.error(`${path}: invalid ${result.type}`);
      result.errors.forEach((error) => console.error(`  - ${error}`));
    } else {
      console.log(`${path}: valid ${result.type}`);
    }
  } catch (error) {
    failed = true;
    console.error(`${path}: ${error.message}`);
  }
}

process.exitCode = failed ? 1 : 0;
