import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";
import yaml from "js-yaml";
import { listBrandSlugs } from "./brand-loader.js";

const PLAYBOOKS_DIR = new URL("../playbooks", import.meta.url).pathname;

export async function loadPlaybooks() {
  const files = await readdir(PLAYBOOKS_DIR);
  const playbooks = [];

  for (const file of files) {
    if (!file.endsWith(".yaml")) continue;
    const raw = await readFile(join(PLAYBOOKS_DIR, file), "utf8");
    playbooks.push(yaml.load(raw));
  }

  return playbooks;
}

export async function duePlaybooks() {
  const playbooks = await loadPlaybooks();
  const brands = await listBrandSlugs();

  const due = [];
  for (const pb of playbooks) {
    if (pb.trigger !== "cron") continue;
    for (const brand of brands) {
      due.push({ playbook: pb.name, brand });
    }
  }
  return due;
}
