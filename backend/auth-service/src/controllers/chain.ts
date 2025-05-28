import { ethers } from "ethers";
import contract from "../config/contract";
import { NextFunction, Request, Response } from "express";

export const appendUserToChain = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { walletPublicAddress,NCid } = res.locals.user;
    const  publicKey  = req.body.publicKey;
    const X="0x" + publicKey.slice(2, 66);
    const Y="0x" + publicKey.slice(66, 130);

    try{
        const result=await contract.registerUser(walletPublicAddress,ethers.hexlify(NCid),ethers.hexlify(X),ethers.hexlify(Y));
        res.locals.hash=result.hash;
        next();

    }catch(err){
        console.log("Error appending user to chain:", err);
        res.status(500).json({ message: "Failed to append user to chain" });
        return;
    }
}