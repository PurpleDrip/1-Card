import PinataSDK  from '@pinata/sdk';

const PINATA_API_SECRET = process.env.PINATA_API_SECRET;
const PINATA_API_KEY = process.env.PINATA_API_KEY;

const pinata = new PinataSDK(PINATA_API_KEY, PINATA_API_SECRET);

export default pinata;