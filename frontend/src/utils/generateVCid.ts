import { createHash } from "crypto";

export function generateNCid(walletPublicAddress: string): string {
  const normalized = walletPublicAddress.trim().toLowerCase();
  
  if (!/^0x[a-f0-9]{40}$/.test(normalized)) {
    throw new Error("Invalid wallet address format");
  }

  return "0x"+createHash("sha256")
    .update(walletPublicAddress.toLowerCase())
    .digest("hex")
    .slice(0, 32); 
}
