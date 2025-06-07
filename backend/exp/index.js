const PinataSDK = require('@pinata/sdk');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const API_SECRET = "3432d89bb54b76bf65c56a17c303f1b53cceda09617ffc115cb99ac3a781742d";
const API_KEY = "b0c1cd0e8be3cb61909e";

const pinata = new PinataSDK(API_KEY, API_SECRET);

pinata.testAuthentication().then((result) => {
    console.log('Pinata Authenticated:', result);
}).catch((err) => {
    console.error('Auth failed:', err);
});

async function upload() {
    try {
        const readableStream1 = fs.createReadStream(path.join(__dirname, 'hello-world.txt'));
        const readableStream2 = fs.createReadStream(path.join(__dirname, 'image1.png'));
        const readableStream3 = {
            name:"Random name",
            age:"random age"
        }

        const options1 = {
            pinataMetadata: {
                name: "hello-world-file",
                keyvalues: {
                    groupId: '66db1623-5247-4931-a24f-a2d294bbbd12', 
                }
            },
            pinataOptions: {
                cidVersion: 0
            }
        };

        const options2 = {
            pinataMetadata: {
                name: "random image",
                keyvalues: {
                    groupId: '66db1623-5247-4931-a24f-a2d294bbbd12', 
                }
            },
            pinataOptions: {
                cidVersion: 0
            }
        };

        const options3 = {
            pinataMetadata: {
                name: "JSON file",
                keyvalues: {
                    groupId: '66db1623-5247-4931-a24f-a2d294bbbd12', 
                }
            },
            pinataOptions: {
                cidVersion: 1
            }
        };

        const result1 = await pinata.pinFileToIPFS(readableStream1, options1);
        const result2 = await pinata.pinFileToIPFS(readableStream2, options2);
        const result3 = await pinata.pinJSONToIPFS(readableStream3, options3);

        console.log('File1 uploaded successfully:', result1);
        console.log('IPFS Hash:', result1.IpfsHash);

        console.log('File2 uploaded successfully:', result2);
        console.log('IPFS Hash:', result2.IpfsHash);

        console.log('File3 uploaded successfully:', result3);
        console.log('IPFS Hash:', result3.IpfsHash);
    } catch (error) {
        console.error('Upload error:', error);
    }
}

function encryptFile(filePath, password) {
    const algorithm = 'aes-256-cbc';

    // Generate 32-byte key from password and 16-byte IV
    const key = crypto.createHash('sha256').update(password).digest();
    const iv = crypto.randomBytes(16);

    const cipher = crypto.createCipheriv(algorithm, key, iv);

    const input = fs.readFileSync(filePath);
    const encrypted = Buffer.concat([cipher.update(input), cipher.final()]);

    // Save IV + encrypted data
    return Buffer.concat([iv, encrypted]);
}

async function fetchByGroupId(groupId) {
    try {
        const filters = {
            metadata: {
                keyvalues: {
                    groupId: {
                        value: groupId,
                        op: 'eq'
                    }
                }
            }
        };

        const result = await pinata.pinList(filters);
        console.log(`Files in group '${groupId}':`);
        result.rows.forEach((file, index) => {
            console.log(`${index + 1}. ${file.metadata.name} - CID: ${file.ipfs_pin_hash}`);
        });
    } catch (error) {
        console.error('Error fetching files by groupId:', error);
    }
}

// fetchByGroupId('66db1623-5247-4931-a24f-a2d294bbbd12');

async function uploadPrivate() {
    const encryptedData = encryptFile(path.join(__dirname, 'image1.png'), 'your-password');
    fs.writeFileSync('secret.enc', encryptedData);

    const readableStream = fs.createReadStream('secret.enc');
    const result = await pinata.pinFileToIPFS(readableStream, {
        pinataMetadata: { name: 'Encrypted Secret File' }
    });

    console.log('Encrypted file pinned:', result);
}

uploadPrivate();
