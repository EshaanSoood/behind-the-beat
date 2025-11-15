import { readdir, readFile } from "fs/promises";
import { join, extname } from "path";

const ROOTS = ["app", "components", "styles"];
const ALLOWED_EXTENSIONS = new Set([".ts", ".tsx", ".js", ".jsx", ".css"]);
const ROUNDED_PATTERN = /rounded-[a-z0-9-]+/i;

async function collectFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const fullPath = join(dir, entry.name);
      if (entry.isDirectory()) {
        return collectFiles(fullPath);
      }
      if (ALLOWED_EXTENSIONS.has(extname(entry.name))) {
        return [fullPath];
      }
      return [];
    })
  );
  return files.flat();
}

async function main() {
  const violations = [];

  for (const root of ROOTS) {
    const files = await collectFiles(root);
    for (const file of files) {
      const contents = await readFile(file, "utf8");
      if (ROUNDED_PATTERN.test(contents)) {
        violations.push(file);
      }
    }
  }

  if (violations.length > 0) {
    console.error("Rounded corner utility usage detected:\n" + violations.join("\n"));
    process.exit(1);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
