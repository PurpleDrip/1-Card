import { ec } from 'elliptic';
import CryptoJS from 'crypto-js';
const EC = new ec('secp256k1');

export async function generateKeys() {
  const key = EC.genKeyPair();
  const privateKey = key.getPrivate('hex');
  const publicKey = key.getPublic('hex');

  return { privateKey, publicKey };
}

export function encryptPrivateKey(privateKey: string, password: string): string {
  return CryptoJS.AES.encrypt(privateKey, password).toString();
}

export function decryptPrivateKey(encryptedPrivateKey: string, password: string): string {
  const bytes = CryptoJS.AES.decrypt(encryptedPrivateKey, password);
  const decrypted = bytes.toString(CryptoJS.enc.Utf8);
  if (!decrypted) throw new Error('Incorrect password or corrupted data');
  return decrypted;
}

export function signNonce(nonce: string, privateKey: string): string {
  const key = EC.keyFromPrivate(privateKey, 'hex');
  const msgHash = CryptoJS.SHA256(nonce).toString();
  const signature = key.sign(msgHash);
  return signature.toDER('hex');
}