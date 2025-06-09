import PinataSDK from '@pinata/sdk';

const API_KEY=process.env.PINATA_API_KEY
const API_SECRET=process.env.PINATA_API_SECRET

const pinata = new PinataSDK(API_KEY, API_SECRET);

export default pinata;