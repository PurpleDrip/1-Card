import { ec } from 'elliptic';

const EC = new ec('secp256k1');   

export default function generateKeys() {
  const key = EC.genKeyPair();

  const privateKey = key.getPrivate('hex');
  const publicKey = key.getPublic('hex'); 

  return { privateKey, publicKey };
}