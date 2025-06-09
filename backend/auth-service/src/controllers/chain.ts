import redis from "../config/redis";
import contract from "../config/contract";
import { Request, Response } from "express";
import { ethers } from "ethers";

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

        await contract.verifyUser(address);

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
        await contract.appendData(address,cid)

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