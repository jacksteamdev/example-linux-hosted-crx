import createFastify from "fastify";
import staticFiles from "fastify-static";
import { packCrx } from "./pack-crx.mjs";
import path from "path";
import { buildUpdateXML } from "./build-update-xml.mjs";
import { fileURLToPath } from "url";
import { existsSync } from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const crxDir = path.resolve(__dirname, "..", "crx");
const outDir = path.resolve(__dirname, "..", "dist");
const crxId = "hdneaoibdfdmifgfjjlkbkceanhjmgch";

const fastify = createFastify({ logger: true });

fastify.register(staticFiles, { root: path.join(__dirname), prefix });

fastify.get("/crx", async (req, reply) => {
  if (!existsSync(outDir)) {
    await packCrx({ crxDir, outDir });
  }

  return reply.type("application/x-chrome-extension").sendFile(crxFile);
});

fastify.get("/update.xml", async (req, reply) => {
  const xml = await buildUpdateXML(crxDir, crxId);
  return reply.type("text/xml").send(xml);
});

fastify.listen(3000, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`server listening on ${address}`);
});
