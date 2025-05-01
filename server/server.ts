import express from "express";
import { Request, Response } from 'express';
import dotenv from "dotenv";
import cors from "cors";
import { ethers } from "ethers";

dotenv.config();

const app = express();
app.use(cors());

const provider = new ethers.JsonRpcProvider(process.env.BLOCKCHAIN_RPC);

app.get('/status', (req:Request, res:Response):void => {
  res.json({ status: "Server operational" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
