import { NextFunction, Request, Response } from "express";
import { publicKeySchema, registerInputSchema } from "../schemas/registerInputSchema";

export const validateRegisterInput=(req:Request,res:Response,next:NextFunction): void =>{

    const { walletPublicAddress, password,publicKey } = req.body;

    if (!walletPublicAddress || !password || !publicKey) {
        res.status(400).json({ error: "All fields are required" });
        return;
    }

    const validatedBody=registerInputSchema.safeParse(req.body);

    if (!validatedBody.success) {
        res.status(400).json({ error: validatedBody.error.errors.map(err => err.message).join(", ") });
        return;
    }

    req.body = validatedBody.data;
    next();
}