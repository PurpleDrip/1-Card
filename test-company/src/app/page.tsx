"use client"

import { ec } from 'elliptic';
import CryptoJS from 'crypto-js';
const EC = new ec('secp256k1');
import { getSignature } from '@/api/extension'

const page = () => {
  const handleClick=async ()=>{
    const nonce = "hello-world"; 

    const { signature, NCid } = await getSignature(nonce) as {signature:string,NCid:string}; 

    const response = await fetch("http://localhost:5000/api/v1/auth/get-pub-key", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ NCid })
    });
    const data = await response.json();
    const publicKeyXY = data.data;

    const valid = await verifySignature(nonce, signature, publicKeyXY);

    console.log("Is valid signature:", valid);
}

  async function verifySignature(nonce: string, signature: string, publicKeyXY: [string, string]) {
    const msgHash = CryptoJS.SHA256(nonce).toString();

    const pubKey = EC.keyFromPublic({
      x: publicKeyXY[0].slice(2),
      y: publicKeyXY[1].slice(2)
    }, 'hex');

    const isValid = pubKey.verify(msgHash, signature);

    return isValid;
  }

  return (
    <div className='h-screen p-8'>
      <section className='w-full bg-red-400 px-4 py-2 rounded-3xl flex items-center justify-between'>
        <h1 className='text-3xl'>Company XYZ</h1>
        <button className='bg-red-900 px-3 py-1 rounded-full cursor-pointer'
          onClick={handleClick}>Use Null Card</button>
      </section>
    </div>
  )
}

export default page