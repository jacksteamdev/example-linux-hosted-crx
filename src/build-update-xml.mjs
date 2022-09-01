import { XMLBuilder } from "fast-xml-parser";
import fs from "fs/promises";
import path from "path";

/**
 * Builds an XML file with update data
 * @param {string} crxDir
 */
export async function buildUpdateXML(crxDir, crxId) {
  const manifestFile = path.join(crxDir, "manifest.json");
  const manifestJson = await fs.readFile(manifestFile, "utf8");
  /** @type {chrome.runtime.Manifest} */
  const manifest = JSON.parse(manifestJson);

  const builder = new XMLBuilder({ format: true });
  const xml = builder.build({
    gupdate: {
      xmlns: "http://www.google.com/update2/response",
      protocol: "2.0",
      app: {
        appid: crxId,
        updatecheck: {
          codebase: "http://localhost:3000/crx",
          version: manifest.version,
        },
      },
    },
  });
  return xml;
}
