import chromium from "chromium";
import { execa } from "execa";
import { existsSync } from "fs";
import fs from "fs/promises";
import { getCrxId } from "./getCrxId.mjs";
import { getCrxKey } from "./getCrxKey.mjs";
import { crxDir, getCrxFile, getPemFile, outDir, rootDir } from "./names.mjs";

/** @param {number} ms Milliseconds to delay */
function delay(ms) {
  return new Promise((resolve) => setTimeout(() => resolve(), ms));
}

/**
 * Pack the extension into a crx file. This should run in an upload endpoint.
 *
 * Chromium doesn't like quotes around CLI argument values.
 * See: https://stackoverflow.com/a/21504057/4842857
 *
 * @returns {Promise<{crxFile: string; pemFile: string; crxId: string; crxKey: string}>}
 */
export async function packCrx() {
  if (!existsSync(outDir)) await fs.mkdir(outDir);

  const args = [`--pack-extension=${crxDir}`];
  if (existsSync(getPemFile(outDir))) {
    args.push(`--pack-extension-key=${getPemFile(outDir)}`);
  }

  await execa(chromium.path, args, { reject: true });

  // files aren't available when command resolves
  while (!existsSync(getCrxFile(rootDir)) && !existsSync(getPemFile(rootDir))) {
    await delay(100);
  }

  // chromium always outputs the files next to the source dir 🤷
  await fs.rename(getCrxFile(rootDir), getCrxFile(outDir));
  if (existsSync(getPemFile(rootDir))) {
    await fs.rename(getPemFile(rootDir), getPemFile(outDir));
  }

  return {
    crxFile: getCrxFile(outDir),
    pemFile: getPemFile(outDir),
    crxId: await getCrxId(),
    crxKey: await getCrxKey(),
  };
}
