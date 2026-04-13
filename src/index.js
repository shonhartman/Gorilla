import "dotenv/config";
import { listBrandSlugs } from "./brand-loader.js";
import { duePlaybooks } from "./scheduler.js";

async function main() {
  const brands = await listBrandSlugs();
  console.log(`Gorilla — ${brands.length} brand(s) loaded: ${brands.join(", ")}`);

  const due = await duePlaybooks();
  console.log(`${due.length} playbook run(s) due:`);
  for (const d of due) {
    console.log(`  -> ${d.playbook} for ${d.brand}`);
  }

  console.log("\nReady. Connect OpenClaw with: npm run agent");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
