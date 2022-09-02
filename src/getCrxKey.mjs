import { execaCommand } from "execa";
import { getPemFile, outDir } from "./names.mjs";

/**
 * Get extension key from private key pem file.
 *
 * ```sh
 * openssl rsa -in key.pem -pubout -outform DER | openssl base64 -A
 * ```
 *
 * From: https://stackoverflow.com/a/23877974/4842857
 */
export async function getCrxKey() {
  const pemFile = getPemFile(outDir);
  const { stdout } = await execaCommand(
    `openssl rsa -in ${pemFile} -pubout -outform DER | openssl base64 -A`,
    { reject: true, shell: true }
  );
  return stdout;
}
