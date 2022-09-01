import chromium from "chromium";
import { execa } from "execa";
import path, { basename } from "path";
import fs from "fs";

/**
 * @param {{crxDir: string, outDir: string}} options
 * @returns {Promise<{crxFile: string, pemFile: string}>} The output filenames for the crx and the key
 */
export async function packCrx({ crxDir, outDir }) {
  // cannot put quotes around value: https://stackoverflow.com/a/21504057/4842857
  const args = [`--pack-extension=${crxDir}`];

  const pemFile = path.join(outDir, `${basename(crxDir)}.pem`);
  if (fs.existsSync(pemFile)) args.push(`--pack-extension-key=${pemFile}`);

  await execa(chromium.path, args, { cwd: outDir });

  const crxFile = path.join(outDir, `${basename(crxDir)}.crx`);
  return { pemFile, crxFile };
}
