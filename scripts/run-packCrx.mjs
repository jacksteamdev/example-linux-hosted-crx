import { packCrx } from "../src/packCrx.mjs";

try {
  const { crxFile, crxId, crxKey } = await packCrx();
  console.log("Extension packed:", crxFile);
  console.log("Extension id:", crxId);
  console.log("Extension key:", crxKey);
} catch (error) {
  console.error(error.stderr ?? error);
}
