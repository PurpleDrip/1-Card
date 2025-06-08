import PinataSDK  from '@pinata/sdk';

const API_SECRET = "3432d89bb54b76bf65c56a17c303f1b53cceda09617ffc115cb99ac3a781742d";
const API_KEY = "b0c1cd0e8be3cb61909e";

const pinata = new PinataSDK(API_KEY, API_SECRET);

export default pinata;