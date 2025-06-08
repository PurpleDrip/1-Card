export const getPublicKey=async (password:string,NCid:string)=>{
    return new Promise((resolve, reject) => {
        const extensionId="dmpahdppkfaedpalinlpllhebloopneh";
            if (!window.chrome?.runtime?.sendMessage) {
            reject(new Error("Chrome runtime API is not available"));
            return;
            }

    window.chrome.runtime.sendMessage(
        extensionId,
      { type: 'GET_PUBLIC_KEY', password, NCid },
      (response) => {
        if (chrome.runtime.lastError) {
            console.log(chrome.runtime.lastError.message)
          reject(new Error(chrome.runtime.lastError.message));
          return;
        }
        if (response.error) {
          reject(new Error(response.error));
          return;
        }
        resolve(response.publicKey);
      }
    );
  });
}