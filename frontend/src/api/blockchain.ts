import { Contract, ethers, parseEther } from 'ethers';
import { data } from '@/utils/abi'; 

const abi=data.abi;
const CONTRACT_ADDRESS = '0x5FbDB2315678afecb367f032d93F642f64180aa3';  

export const checkForExistingUser = async (signer: any, address: string) => {
  try {
    const contract = new Contract(CONTRACT_ADDRESS, abi, signer);

    const user = await contract.getUser(address);

    if (user.NCid === '0x00000000000000000000000000000000') {
      console.log('✅ No user found at this address');
      return null;
    }

    console.log('❌ User already exists:', user);
    return user;
  } catch (error:any) {
    if (error.code === 'BAD_DATA') {
      console.log('✅ No user found at this address (BAD_DATA)');
      return null;
    }
    console.error('❗ Error checking for existing user:', error);
    throw error;
  }
};

export const registerUserOnChain=async (address:string,publicKey:string,NCid:string,signer:any)=>{
    const contract = new Contract(CONTRACT_ADDRESS, abi, signer);
    const valueInMatic = parseEther("0.001");
    const X="0x" + publicKey.slice(2, 66);
    const Y="0x" + publicKey.slice(66, 130);
    const tx=await contract.registerUser(address,NCid,X,Y,{
      value:valueInMatic
    });
    const receipt = await tx.wait();

    return receipt.transactionHash;
}
