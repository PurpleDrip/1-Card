import { generateKeyPair } from "crypto";

export const generateKeys = (address: string): Promise<{ publicKey: string; privateKey: string }> => {
    return new Promise((resolve, reject) => {
        generateKeyPair('rsa', {
            modulusLength: 2048,  
            publicKeyEncoding: {
                type: 'spki',
                format: 'pem'
            },
            privateKeyEncoding: {
                type: 'pkcs8',
                format: 'pem',
                cipher: 'aes-256-cbc',
                passphrase: address
            }
        }, (err, publicKey, privateKey) => {
            if (err) {
                console.error('Error generating key pair', err);
                reject(err);
            } else {
                resolve({
                    publicKey,
                    privateKey
                });
            }
        });
    });
}