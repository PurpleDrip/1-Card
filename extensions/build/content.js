window.addEventListener("message",a=>{a.source===window&&a.data.type==="NULL_CARD_EXTENSION_CALL"&&chrome.runtime.sendMessage({action:"open_ui",payload:a.data.payload})});
