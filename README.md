# Linux Extension Update Server

This project contains a naive implementation of a Chrome extension update server
and utilities to create a CRX file and extract the id and key from the private
key.

> While the server will run on any OS, only Linux supports installing Chrome
> extensions distributed from an origin other than the Chrome Web Store. See
> [Google documentation](https://developer.chrome.com/docs/extensions/mv3/external_extensions/#preferences).

An extension must be packed into a CRX file before distribution. Chrome supports
packing an extension from the command line. `./src/packCrx.mjs` outlines this
process.

OpenSSL can extract the extension id and key from a PEM file.
`./src/getCrxId.mjs` and `./src/getCrxKey.mjs` contain the relevant shell
commands.

Chrome supports forced Linux installations by way of a preferences JSON file
placed in the app extensions folder. The module `./src/installCrx.mjs` outlines
how to do this.

The server has two endpoints: an update endpoint and a download endpoint. The
update endpoint must end in `.xml`; Chrome will append `.xml` to any update URL
that does not end with that extension.

If the user manually uninstalls the extension, Chrome places it on a blocklist
and will ignore the preferences file. During development we can remove an
extension id from the blocklist by manually installing the CRX file and removing
it.
