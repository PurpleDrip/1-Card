import { NextFunction, Request, Response } from "express";
import { publicKeySchema, registerInputSchema } from "../schemas/registerInputSchema";

export const validateRegisterInput=(req:Request,res:Response,next:NextFunction): void =>{

    const { walletPublicAddress, password } = req.body;

    if (!walletPublicAddress || !password) {
        res.status(400).json({ error: "All fields are required" });
        return;
    }

    const validatedBody=registerInputSchema.safeParse(req.body);

    if (!validatedBody.success) {
        res.status(400).json({ error: validatedBody.error.errors.map(err => err.message).join(", ") });
        return;
    }

    const publicKey=publicKeySchema.safeParse(req.body.publicKey);

    if(!publicKey.success) {
        res.status(400).json({ error: publicKey.error.errors.map(err => err.message).join(", ") });
        return;
    }
    res.locals.publicKey = publicKey.data;
    req.body = validatedBody.data;
    next();
}