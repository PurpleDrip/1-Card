window.addEventListener('message', async (event) => {
  if (event.source !== window || !event.data) return;

  if (event.data.type === 'NULL_CARD_REQUEST') {
    const { nonce } = event.data;

    const password = prompt('Enter your password to sign the request:');
    if (!password) {
      window.postMessage({ type: 'NULL_CARD_RESPONSE', error: 'No password provided' }, '*');
      return;
    }

    chrome.runtime.sendMessage({ type: 'SIGN_NONCE', nonce, password }, (response) => {
      window.postMessage({ type: 'NULL_CARD_RESPONSE', ...response }, '*');
    });
  }

  if (event.data.type === 'GET_PUBLIC_KEY_REQUEST') {
    const { password, NCid, address } = event.data;

    if (!password || !NCid || !address) {
      window.postMessage({ type: 'GET_PUBLIC_KEY_RESPONSE', error: 'Password, Address, and NCid are required' }, '*');
      return;
    }

    chrome.runtime.sendMessage({ type: 'GET_PUBLIC_KEY', password, NCid, address }, (response) => {
      window.postMessage({ type: 'GET_PUBLIC_KEY_RESPONSE', ...response }, '*');
    });
  }
});
