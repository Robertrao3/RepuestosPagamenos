import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const raw = JSON.parse(readFileSync("./src/data/Inv.json", "utf-8"));
const seen = new Set();
const products = raw.filter((p) => {
  if (seen.has(p.id)) return false;
  seen.add(p.id);
  return true;
});

const BATCH_SIZE = 500;
let inserted = 0;
let failed = 0;

console.log(`Uploading ${products.length} products in batches of ${BATCH_SIZE}...`);

for (let i = 0; i < products.length; i += BATCH_SIZE) {
  const batch = products.slice(i, i + BATCH_SIZE);
  const { error } = await supabase.from("products").upsert(batch);
  if (error) {
    console.error(`Batch ${i / BATCH_SIZE + 1} failed:`, error.message);
    failed += batch.length;
  } else {
    inserted += batch.length;
    process.stdout.write(`\r${inserted} / ${products.length} uploaded...`);
  }
}

console.log(`\nDone. ${inserted} inserted, ${failed} failed.`);
