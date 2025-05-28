window.addEventListener("message", (event) => {
  // Only accept messages from the same page
  if (event.source !== window) return;

  if (event.data.type === "NULL_CARD_EXTENSION_CALL") {
    chrome.runtime.sendMessage({
      action: "open_ui",
      payload: event.data.payload
    });
  }
});
