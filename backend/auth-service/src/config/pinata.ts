import PinataSDK from '@pinata/sdk';
import dotenv from "dotenv";

dotenv.config();

const PINATA_API_SECRET = "3432d89bb54b76bf65c56a17c303f1b53cceda09617ffc115cb99ac3a781742d"
const PINATA_API_KEY = "b0c1cd0e8be3cb61909e"

const pinata = new PinataSDK(PINATA_API_KEY, PINATA_API_SECRET);

export default pinata;