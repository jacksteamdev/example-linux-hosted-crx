import chromium from "chromium";
import { execa } from "execa";
import { existsSync } from "fs";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { packCrx } from "../src/packCrx.mjs";
import { startServer } from "../src/index.mjs";
import { dataDir } from "../src/names.mjs";

// TODO: set preferences.json file extensionsDir
// TODO: start update server

const { crxId } = await packCrx();
const prefDir = path.join(path.dirname(chromium.path), "extensions");
const prefFile = path.join(prefDir, `${crxId}.json`);

try {
  if (!existsSync(prefDir)) {
    await mkdir(prefDir);
  }

  await writeFile(
    prefFile,
    JSON.stringify({
      external_update_url: "http://localhost:3000/update.xml",
    })
  );

  await startServer();

  await execa(
    chromium.path,
    [`--user-data-dir=${dataDir}`, "chrome://extensions"],
    { reject: true }
  );
} catch (error) {
  console.error(error.stdout ?? error);
}
