chrome.runtime.onMessage.addListener((msg) => {
  if (msg.action === "open_extension_popup") {
    chrome.windows.create({
      url: chrome.runtime.getURL("index.html"),
      type: "popup",
      width: 400,
      height: 600
    });
  }
});
