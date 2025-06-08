import { Request, Response } from "express";

export const generatePresignedURL=(req:Request,res:Response)=>{
    const {metadata}=req.body;

    console.log("Meta Data",metadata)

    
}