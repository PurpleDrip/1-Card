import { decryptPrivateKey, encryptPrivateKey, generateKeys, signNonce } from "./utils/cryptoUtils";

chrome.runtime.onMessageExternal.addListener((request, _sender, sendResponse) => {
  if (request.type === 'SIGN_NONCE') {
    chrome.storage.local.get(['encryptedPrivateKey','NCid'], async (result) => {
      if (!result.encryptedPrivateKey) {
        sendResponse({ error: 'Private key not set' });
        return;
      }

      const password = prompt('Enter your password to unlock:');
      if (!password) {
        sendResponse({ error: 'No password provided' });
        return;
      }

      try {
        const privateKey = decryptPrivateKey(result.encryptedPrivateKey, password);
        const signature = signNonce(request.nonce, privateKey);
        const NCid = result.NCid || 'unknown';
        sendResponse({ NCid, signature });
      } catch (err) {
        sendResponse({ error: 'Failed to sign nonce' });
      }
    });
    return true;
  }

  if (request.type === 'GET_PUBLIC_KEY') {
    const { password, NCid } = request;

    if (!password || !NCid) {
      sendResponse({ error: 'Password and NCid are required' });
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
          NCid
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
});
