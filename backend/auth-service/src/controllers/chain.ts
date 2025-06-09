import redis from "../config/redis";
import contract from "../config/contract";
import { Request, Response } from "express";

export const verifyUser=async(req:Request,res:Response)=>{
    const {address}=req.body;

    try{
        const existingUser=await contract.getUser(address)
        if(!existingUser){
            res.status(400).json({
                success:false,
                message:"No user exists with this Wallet Address."
            });
            return;
        }

        const tx=await contract.verifyUser(address);
        await tx.wait();

        res.status(200).json({
            success:true,
            message:"Successfully verified User."
        })
        return
    }catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            message:err
        })
        return;
    }
}

export const appendCID=async (req:Request,res:Response)=>{
    const {address}=req.body;

    try{
        const existingUser=await contract.getUser(address)
        if(!existingUser){
            res.status(400).json({
                success:false,
                message:"No user exists with this Wallet Address."
            });
            return;
        }
        const NCid=existingUser[0];
        const cid=await redis.get(NCid.toString());
        const tx=await contract.appendData(address,cid)
        await tx.wait();

        res.status(201).json({
            success:true,
            message:"Successfully append the CID to the chain."
        })
        return;
    }catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            message:err
        })
        return;
    }
}

export const getPublicKey=async(req:Request,res:Response)=>{
    const {NCid}=req.body;

    try{
        const result=await contract.getPublicKey(NCid)

        console.log(result);
        res.status(200).json({
            success:true,
            message:"Retrieved Public key",
            data:result
        })
        return;
    }catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Internal server error."
        })
        return;
    }
}