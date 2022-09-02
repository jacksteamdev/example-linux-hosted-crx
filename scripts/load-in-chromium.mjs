import chromium from "chromium";
import { execa } from "execa";
import { installCrx } from "../src/installCrx.mjs";
import { startServer } from "../src/index.mjs";
import { dataDir } from "../src/names.mjs";
import { packCrx } from "../src/packCrx.mjs";

// TODO: set preferences.json file extensionsDir
// TODO: start update server

try {
  const { crxId } = await packCrx();
  await installCrx(crxId);
  await startServer();
  await execa(
    chromium.path,
    [`--user-data-dir=${dataDir}`, "chrome://extensions"],
    { reject: true }
  );
} catch (error) {
  console.error(error.stdout ?? error);
}
