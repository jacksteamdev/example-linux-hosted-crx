import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const rootDir = path.resolve(__dirname, "..");
export const crxDir = path.resolve(rootDir, "crx");
export const outDir = path.resolve(rootDir, "dist");
export const dataDir = path.resolve(rootDir, "chromium-data");

/**
 * Get filepath by root dir
 * @param {string} root Root dir for file
 * @returns string
 */
export const getPemFile = (root) =>
  path.join(root, `${path.basename(crxDir)}.pem`);

/**
 * Get filepath by root dir
 * @param {string} root Root dir for file
 * @returns string
 */
export const getCrxFile = (root) =>
  path.join(root, `${path.basename(crxDir)}.crx`);
