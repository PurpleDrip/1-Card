import { ethers } from 'ethers';

declare global {
  interface Window {
    ethereum?: any;
  }
}

const POLYGON_CHAIN_ID = '0x89'; // 137

const polygonParams = {
  chainId: POLYGON_CHAIN_ID,
  chainName: 'Polygon Mainnet',
  nativeCurrency: {
    name: 'MATIC',
    symbol: 'MATIC',
    decimals: 18,
  },
  rpcUrls: ['https://polygon-rpc.com'],
  blockExplorerUrls: ['https://polygonscan.com'],
};

export async function connectWallet() {
  if (!window.ethereum) {
    throw new Error('MetaMask not detected');
    return;
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  await provider.send('eth_requestAccounts', []);
  const network = await provider.getNetwork();

  if (Number(network.chainId) !== 137) {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: POLYGON_CHAIN_ID }],
      });
    } catch (switchError: any) {
      if (switchError.code === 4902) {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [polygonParams],
        });
      } else {
        throw new Error('Failed to switch network');
        return;
      }
    }
  }

  const signer = await provider.getSigner();
  const address = await signer.getAddress();
  const balanceInWei = await provider.getBalance(address);
  const balance = ethers.formatEther(balanceInWei);

  return { address, balance };
}
