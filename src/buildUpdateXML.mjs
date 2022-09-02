import { XMLBuilder } from "fast-xml-parser";
import fs from "fs/promises";
import path from "path";
import { crxDir } from "./names.mjs";
import { packCrx } from "./packCrx.mjs";

/**
 * Builds an XML file with extension update data
 *
 * See `playground/update.xml` for correct output format
 */
export async function buildUpdateXML() {
  const { crxId } = await packCrx();

  const manifestFile = path.join(crxDir, "manifest.json");
  const manifestJson = await fs.readFile(manifestFile, "utf8");
  /** @type {chrome.runtime.Manifest} */
  const manifest = JSON.parse(manifestJson);

  const builder = new XMLBuilder({
    format: true,
    attributeNamePrefix: "_",
    ignoreAttributes: false,
  });
  const xml = builder.build({
    "?xml": {
      _version: "1.0",
      _encoding: "UTF-8",
    },
    gupdate: {
      _xmlns: "http://www.google.com/update2/response",
      _protocol: "2.0",
      app: {
        _appid: crxId,
        updatecheck: {
          _codebase: "http://localhost:3000/crx",
          _version: manifest.version,
        },
      },
    },
  });
  return xml;
}
