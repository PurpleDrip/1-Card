import crypto from 'crypto';

const password=process.env.PINATA_ENCRYPT_PASS as string;

export function decryptFile(encryptedBuffer: Buffer): Buffer {
    const algorithm = 'aes-256-cbc';
    const key = crypto.createHash('sha256').update(password).digest();

    const iv = encryptedBuffer.slice(0, 16);
    const ciphertext = encryptedBuffer.slice(16);

    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    const decrypted = Buffer.concat([decipher.update(ciphertext), decipher.final()]);

    return decrypted;
}
