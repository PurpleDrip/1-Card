import { ec } from 'elliptic';
import { encryptData, decryptData } from './cryptoUtils';

const EC = new ec('secp256k1');
const PRIVATE_KEY_STORAGE_KEY = 'encryptedPrivateKey';
const NCID_STORAGE_KEY = 'NCid';

export async function generateKeys(password: string) {
  const { encryptedPrivateKey } = await getStoredKeys();
  if (encryptedPrivateKey) throw new Error('Key pair already exists');

  const key = EC.genKeyPair();
  const privateKey = key.getPrivate('hex');
  const publicKey = key.getPublic('hex');

  const encrypted = await encryptData(privateKey, password);

  await chrome.storage.local.set({ encryptedPrivateKey: encrypted, NCid: publicKey });

  return { privateKey, publicKey };
}

export async function getStoredKeys() {
  return await chrome.storage.local.get([PRIVATE_KEY_STORAGE_KEY, NCID_STORAGE_KEY]);
}

export async function decryptPrivateKey(password: string) {
  const { encryptedPrivateKey } = await getStoredKeys();
  if (!encryptedPrivateKey) throw new Error('No key pair found');
  return await decryptData(encryptedPrivateKey, password);
}

export async function getNCid() {
  const { NCid } = await getStoredKeys();
  return NCid;
}

export async function setNCid(ncid: string) {
  await chrome.storage.local.set({ NCid: ncid });
}
