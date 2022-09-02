import { execaCommand } from "execa";
import { outDir, getPemFile } from "./names.mjs";

// adjmdbedldpkegeokflmlbdfpcghgpgf
// adjmdbedldpkegeokflmlbdfpcghgpgf

/**
 * Get extension id from private key pem file.
 *
 * ```sh
 * openssl rsa -in key.pem -pubout -outform DER |  shasum -a 256 | head -c32 | tr 0-9a-f a-p
 * ```
 *
 * From: https://stackoverflow.com/a/23877974/4842857
 */
export async function getCrxId() {
  const pemFile = getPemFile(outDir);
  const { stdout } = await execaCommand(
    `openssl rsa -in ${pemFile} -pubout -outform DER | shasum -a 256 | head -c32 | tr 0-9a-f a-p`,
    { reject: true, shell: true }
  );
  return stdout;
}
