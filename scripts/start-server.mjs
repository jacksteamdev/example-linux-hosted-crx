import { startServer } from "../src/index.mjs";

try {
  await startServer();
} catch (error) {
  console.error(error);
  process.exit(1);
}
