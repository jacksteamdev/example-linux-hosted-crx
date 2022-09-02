/**
 *
 * @param {string} html HTML to parse
 * @returns {ChildNode[]}
 */
const h = (html) => {
  return Array.from(
    new DOMParser().parseFromString(html, "text/html").body.childNodes
  );
};

const manifest = chrome.runtime.getManifest();
const content = h(`
  <h1>Updated to ${manifest.version}</h1>
  <pre><code>${JSON.stringify(manifest, null, 2)}</code></pre>
  `);
console.log(content);
document.body.append(...content);

export {};
