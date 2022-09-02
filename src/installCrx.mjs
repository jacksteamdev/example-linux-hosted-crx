import chromium from "chromium";
import { existsSync } from "fs";
import { mkdir, writeFile } from "fs/promises";
import path from "path";

/**
 * Installs the extension in the Chromium app extensions folder.
 *
 * @param {string} crxId Chrome extension id
 */
export async function installCrx(crxId) {
  const prefDir = path.join(path.dirname(chromium.path), "extensions");
  const prefFile = path.join(prefDir, `${crxId}.json`);
  const prefData = {
    external_update_url: "http://localhost:3000/update.xml",
  };

  if (!existsSync(prefDir)) {
    await mkdir(prefDir);
  }

  await writeFile(prefFile, JSON.stringify(prefData));
}
