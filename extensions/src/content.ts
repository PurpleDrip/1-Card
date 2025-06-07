window.addEventListener('message', event => {
  if (event.source !== window || !event.data) return;

  if (event.data.type === 'NULL_CARD_REQUEST') {
    const { nonce } = event.data;

    const password = prompt('Enter your password to sign the request:');
    if (!password) {
      window.postMessage({ type: 'NULL_CARD_RESPONSE', error: 'No password provided' }, '*');
      return;
    }

    chrome.runtime.sendMessage({ type: 'SIGN_NONCE', nonce, password }, response => {
      window.postMessage({ type: 'NULL_CARD_RESPONSE', ...response }, '*');
    });
  }
});
