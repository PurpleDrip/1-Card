import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require("dotenv").config();

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    hardhat: {
      chainId: 1337,
    },
    ethereum: {
      chainId: 1,
      url: `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_RPC_URL}`,
      accounts: [process.env.PRIVATE_KEY as string]
    },
    polygon:{
      chainId: 137,
      url: `https://polygon-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_RPC_URL}`,
      accounts: [process.env.PRIVATE_KEY as string]
    },
    
    sepolia:{
      chainId: 11155111,
      url: `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_RPC_URL}`,
      accounts: [process.env.PRIVATE_KEY as string]
    },
    amoy:{
      chainId:80002,
      url:`https://polygon-amoy.g.alchemy.com/v2/${process.env.ALCHEMY_RPC_URL}`,
      accounts: [process.env.PRIVATE_KEY as string]
    }
  },
  paths: {
    artifacts: "./artifacts",
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
  }
}

export default config;
