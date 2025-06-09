import contract from "../config/contract";
import { Request, Response } from "express";

export const fetchUserData=async(req:Request,res:Response)=>{
    const {NCid}=req.body;

    try{
        const CIDs=await contract.getUserInfo(NCid);
        const latestCID=CIDs[CIDs.length-1];

        const response = await fetch(`https://gateway.pinata.cloud/ipfs/${latestCID}`);
        if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status}`);
        }
        const existingData = await response.json();

        res.status(200).json({
            success:true,
            message:"Successfully fetched data from Chain.",
            data:existingData
        })
        return;
    }catch(err){
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Error processing the document.",
        });
    }
}