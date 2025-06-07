export async function encryptData(data: string, password: string) {
  const enc = new TextEncoder();
  const keyMaterial = await window.crypto.subtle.importKey(
    'raw',
    enc.encode(password),
    'PBKDF2',
    false,
    ['deriveKey']
  );

  const key = await window.crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt: enc.encode('salt'), iterations: 100000, hash: 'SHA-256' },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt']
  );

  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const ciphertext = await window.crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    enc.encode(data)
  );

  return { iv: Array.from(iv), ciphertext: Array.from(new Uint8Array(ciphertext)) };
}

export async function decryptData(encrypted: { iv: number[], ciphertext: number[] }, password: string) {
  const enc = new TextEncoder();
  const keyMaterial = await window.crypto.subtle.importKey(
    'raw',
    enc.encode(password),
    'PBKDF2',
    false,
    ['deriveKey']
  );

  const key = await window.crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt: enc.encode('salt'), iterations: 100000, hash: 'SHA-256' },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['decrypt']
  );

  const decrypted = await window.crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: new Uint8Array(encrypted.iv) },
    key,
    new Uint8Array(encrypted.ciphertext)
  );

  return new TextDecoder().decode(decrypted);
}

import { ec } from 'elliptic';
const EC = new ec('secp256k1');

export function signNonce(nonce: string, privateKey: string) {
  const key = EC.keyFromPrivate(privateKey, 'hex');
  const signature = key.sign(nonce);
  return signature.toDER('hex');
}
