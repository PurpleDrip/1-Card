import { Request, Response } from "express";
import Tesseract from "tesseract.js";
import { decryptFile } from "../utils/decryptFile";
import fs from "fs";
import multer from "multer";
import path from "path";
import os from "os";

const upload = multer({ dest: os.tmpdir() });

export const validateDoc = [
  upload.single("documentFile"), 
  async (req: Request, res: Response): Promise<void> => {
    const { docType } = req.body;
    const file = req.file;

    if (!docType || !file) {
      res.status(400).json({
        success: false,
        message: "Document type and file are required.",
      });
      return;
    }

    try {
      const fileBuffer = fs.readFileSync(file.path);
      const extension = path.extname(file.originalname); 
      const tempFilePath = path.join(os.tmpdir(), `decrypted_${Date.now()}.${extension}`); 
      fs.writeFileSync(tempFilePath, fileBuffer);

      const result = await Tesseract.recognize(tempFilePath, "eng");

      fs.unlinkSync(tempFilePath);
      fs.unlinkSync(file.path);

      res.status(200).json({
        success: true,
        text: result.data.text,
      });
      return;
    } catch (err) {
      console.error(err);
      res.status(500).json({
        success: false,
        message: "Error processing the document.",
      });
    }
  },
];