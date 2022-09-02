const url = new URL(chrome.runtime.getURL("options.html"));
chrome.action.onClicked.addListener(() => {
  chrome.runtime.requestUpdateCheck((status, { version }) => {
    console.log(status, version);
    if (status === "update_available") {
      chrome.action.setBadgeBackgroundColor({ color: "green" });
      chrome.action.setBadgeText({ text: " " });
    } else {
      chrome.action.setBadgeBackgroundColor({ color: "red" });
      chrome.action.setBadgeText({ text: " " });
    }
    chrome.action.setTitle({ title: `${status} ${version}`.trim() });
  });
});
chrome.runtime.onInstalled.addListener(() => {
  url.searchParams.set("type", "Update");
  chrome.tabs.create({ url: url.href });
});
chrome.runtime.onUpdateAvailable.addListener(({ version }) => {
  chrome.action.setBadgeBackgroundColor({ color: "green" });
  chrome.action.setBadgeText({ text: " " });
  chrome.action.setTitle({ title: version });
});
export {};
