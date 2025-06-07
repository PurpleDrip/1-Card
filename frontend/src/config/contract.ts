import { data } from "@/utils/abi";
import { ethers } from "ethers";

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

const getContract = async (useSigner = false) => {
  const abi = data.abi;
  const provider = new ethers.BrowserProvider(window.ethereum);

  if (useSigner) {
    const signer = await provider.getSigner(); 
    return new ethers.Contract(contractAddress, abi, signer);
  }

  return new ethers.Contract(contractAddress, abi, provider);
};

export default getContract;
