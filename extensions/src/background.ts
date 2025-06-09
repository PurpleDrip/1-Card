import { decryptPrivateKey, encryptPrivateKey, generateKeys, signNonce } from "./utils/cryptoUtils";

chrome.runtime.onMessageExternal.addListener((request, _sender, sendResponse) => {
  if (request.type === 'SIGN_NONCE') {
    chrome.storage.local.get(['encryptedPrivateKey','NCid'], async (result) => {
      if (!result.encryptedPrivateKey) {
        sendResponse({ error: 'Private key not set' });
        return;
      }

      try {
        const privateKey = decryptPrivateKey(result.encryptedPrivateKey, request.password);
        const signature = signNonce(request.nonce, privateKey);
        const NCid = result.NCid || 'unknown';
        sendResponse({ NCid, signature });
      } catch (err) {
        console.error(err);
        sendResponse({ error: 'Failed to sign nonce' });
      }
    });
    return true; 
  }

  if (request.type === 'GET_PUBLIC_KEY') {
    const { password, NCid,address } = request;

    if (!password || !NCid || !address) {
      sendResponse({ error: 'Password, Address and NCid are required' });
      return;
    }

    chrome.storage.local.get(['encryptedPrivateKey'], async (result) => {
      if (result.encryptedPrivateKey) {
        sendResponse({ error: 'Account already exists' });
        return;
      }

      try {
        const { publicKey, privateKey } =await generateKeys();

        const encryptedPrivateKey = encryptPrivateKey(privateKey, password);

        chrome.storage.local.set({
          encryptedPrivateKey,
          NCid,
          address
        }, () => {
          sendResponse({ publicKey });
        });
      } catch (err) {
        console.error(err);
        sendResponse({ error: 'Failed to generate keypair' });
      }
    });
    return true;
  }

  if(request.type === "GET_CREDS"){
        chrome.storage.local.get(['NCid,address'], async (result) => {
      if (!result.NCid || !result.address) {
        sendResponse({ error: 'No account found' });
        return;
      }

      try {
        const {NCid,address}=result;
        sendResponse({ address,NCid });

      } catch (err) {
        console.error(err);
        sendResponse({ error: 'Failed to fetch CREDS' });
      }
    });
  }
});