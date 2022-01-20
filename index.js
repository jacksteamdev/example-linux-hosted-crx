const fastify = require("fastify")({ logger: true });
const path = require("path");

fastify.register(require("fastify-static"), {
  root: path.join(__dirname, "public"),
  prefix: "/public/", // optional: default '/'
});

fastify.get("/text", (req, reply) => {
  return reply.type("text/text").sendFile("test.txt"); // serving path.join(__dirname, 'public', 'myHtml.html') directly
});

fastify.get("/crx", (req, reply) => {
  return reply.type("application/x-chrome-extension").sendFile("crx.crx"); // serving path.join(__dirname, 'public', 'myHtml.html') directly
});

fastify.get("/update.xml", (req, reply) => {
  return reply.type("text/xml").sendFile("update.xml"); // serving path.join(__dirname, 'public', 'myHtml.html') directly
});

fastify.listen(3000, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`server listening on ${address}`);
});
