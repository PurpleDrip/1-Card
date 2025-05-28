chrome.runtime.onMessage.addListener(e=>{e.action==="open_extension_popup"&&chrome.windows.create({url:chrome.runtime.getURL("index.html"),type:"popup",width:400,height:600})});
