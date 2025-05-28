import { NextFunction, Request, Response } from "express";
import User from "../model/User";
import { generateNCid } from "../utils/generateNCid";
import { encryptPassword } from "../utils/encryptedPassword";

export const registerUser=async (req:Request,res:Response,next:NextFunction):Promise<void>=>{
    const { walletPublicAddress, password } = req.body;

    try{
        const user=await User.findOne({ walletPublicAddress });

        if(user){
            res.status(400).json({ message: "User already exists with this wallet address" });
            return;
        }

        const NCid=generateNCid(walletPublicAddress);
        const encryptedPassword = await encryptPassword(password); 

        const newUser=await User.create({
            walletPublicAddress,
            password:encryptedPassword,
            NCid
        });

        res.locals.user=newUser;

        next();

    }catch(err){
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
        return;
    }
}