import getContract from "@/config/contract";
import axiosInstance from "../axios";

export const registerUserOnChain=async(NCid:string,publicKey:string)=>{
    try{
        const contract=await getContract(true);
        const tx=await contract.register(NCid,publicKey);
        await tx.wait();
    }catch(err){
        return err;
    }
}

export const registerUser = (
    walletPublicAddress: string,
    NCid:string,
    password: string
): Promise<any> => {
    return axiosInstance.post("/api/v1/auth/register", {
        NCid,
        walletPublicAddress,
        password
    });
};
