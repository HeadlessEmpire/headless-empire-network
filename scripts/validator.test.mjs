import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {validateDocument} from "./validator.mjs";

async function load(path) {
  return JSON.parse(await readFile(new URL(`../${path}`, import.meta.url), "utf8"));
}

for (const path of [
  "examples/member.json",
  "examples/feed.json",
  "examples/registry.json",
  "fixtures/valid/member-moved.json",
  "registry/registry.json"
]) {
  test(`${path} is valid`, async () => {
    const result = validateDocument(await load(path));
    assert.deepEqual(result.errors, []);
  });
}

for (const path of [
  "fixtures/invalid/member-moved-without-target.json",
  "fixtures/invalid/member-http.json"
]) {
  test(`${path} is invalid`, async () => {
    const result = validateDocument(await load(path));
    assert.ok(result.errors.length > 0);
  });
}
