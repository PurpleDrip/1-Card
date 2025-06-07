import { signNonce } from './utils/cryptoUtils';
import { decryptPrivateKey } from './utils/keyManager';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'SIGN_NONCE') {
    // Get encrypted private key from storage
    chrome.storage.local.get(['encryptedPrivateKey'], async (result) => {
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
        const privateKey = await decryptPrivateKey(result.encryptedPrivateKey, password);
        const signature = await signNonce(request.nonce, privateKey);
        const NCid = "d344ffg"

        sendResponse({ NCid, signature });
      } catch (err) {
        sendResponse({ error: 'Failed to sign nonce' });
      }
    });
    return true;
  }
});
