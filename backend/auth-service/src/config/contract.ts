import { ethers } from "ethers";
import fs from "node:fs";

// 1. Connect to local Hardhat node
const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");

// 2. Use signer with private key
const signer = new ethers.Wallet(
  "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80", 
  provider
);

// 3. Load ABI and create contract instance
const abi = JSON.parse(fs.readFileSync("../utils/abi.json", "utf-8")).abi;
const contract = new ethers.Contract(
  "0x5FbDB2315678afecb367f032d93F642f64180aa3", 
  abi, 
  signer
);

export default contract;
