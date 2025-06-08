import crypto from 'crypto';

export async function encryptFile(file: File, password: string): Promise<Blob> {
  const algorithm = 'aes-256-cbc';

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const key = crypto.createHash('sha256').update(password).digest();
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv(algorithm, key, iv);
  const encrypted = Buffer.concat([cipher.update(buffer), cipher.final()]);

  const encryptedData = Buffer.concat([iv, encrypted]);

  return new Blob([encryptedData], { type: file.type });
}


export const uploadDoc=async (type:string,NCid:string,doc:File)=>{

    const formData=new FormData();

    const encryptedFile=await encryptFile(doc,process.env.NEXT_PUBLIC_PINATA_ENCRYPT_PASS as string);

    formData.append('file', encryptedFile, `${type.toUpperCase()}-${NCid}.enc`);
    const response=await fetch(
      "https://uploads.pinata.cloud/v3/files",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`,
        },
        body: formData,
      }
    );

    const result = await response.json();
    
    return result;
}