import staticFiles from "@fastify/static";
import createFastify from "fastify";
import { buildUpdateXML } from "./buildUpdateXML.mjs";
import { outDir } from "./names.mjs";
import { packCrx } from "./packCrx.mjs";

const fastify = createFastify({ logger: true });

fastify.register(staticFiles, { root: outDir });

fastify.get("/crx", async function (req, reply) {
  const { crxId } = await packCrx(); // should do this in an upload endpoint
  fastify.log.info(`extension packed: ${crxId}`);
  return reply.type("application/x-chrome-extension").sendFile("crx.crx");
});

fastify.get("/update.xml", async (req, reply) => {
  const xml = await buildUpdateXML();
  return reply.type("text/xml").send(xml);
});

export async function startServer() {
  try {
    const address = await fastify.listen({ port: 3000 });
    fastify.log.info(`server listening on ${address}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}
