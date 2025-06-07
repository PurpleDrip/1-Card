import { Contract } from 'ethers';
import { data } from '@/utils/abi'; // adjust this to your actual ABI file path

const abi=data.abi;
const CONTRACT_ADDRESS = '0x5FbDB2315678afecb367f032d93F642f64180aa3';  // use your deployed contract address

/**
 * Checks if a user exists by querying the smart contract.
 * 
 * @param signer - An ethers.js Signer (connected to the user's wallet).
 * @param address - The user's wallet address.
 * @returns A Promise resolving to the User struct or null if not found.
 */
export const checkForExistingUser = async (signer: any, address: string) => {
  try {
    const contract = new Contract(CONTRACT_ADDRESS, abi, signer);

    // Call the view function to get the user details.
    const user = await contract.getUser(address);

    // If NCid is all zeros, treat as user not found.
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
