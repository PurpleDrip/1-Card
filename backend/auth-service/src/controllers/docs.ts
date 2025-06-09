import { Request, Response } from "express";
import Tesseract from "tesseract.js";
import fs from "fs";
import multer from "multer";
import path from "path";
import os from "os";
import { validateAadhar, validateDrivingLicense, validatePancard, validatePassport, validateRation, validateVoter } from "../services/validate";
import contract from "../config/contract";
import pinata from "../config/pinata";
import redis from "../config/redis";

const TTL=300;

const upload = multer({ dest: os.tmpdir() });

export const validateDoc = [
  upload.single("documentFile"), 
  async (req: Request, res: Response): Promise<void> => {
    const { docType,NCid,newUser} = req.body;
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

      let valid=false;
      let newNullCardData;
      let newActivityLog;

      switch(docType.toUpperCase()){
        case "AADHAR":
          valid=validateAadhar("234567890123")
          newNullCardData={docType: "AADHAR", verifedBy: "Auth-Gate", verifiedAt: Date.now().toString()}
          newActivityLog={ activityName: "Verified Aadhar", activityTime: Date.now().toString() }
          break;
        
        case "PASSPORT":
          valid=validatePassport("A2096457");
          newNullCardData={docType: "PASSPORT", verifedBy: "Auth-Gate", verifiedAt: Date.now().toString()}
          newActivityLog={ activityName: "Verified Passport", activityTime: Date.now().toString() }
          break;
        
        case "VOTER":
          valid=validateVoter("ABC1234567");
          newNullCardData={docType: "VOTER", verifedBy: "Auth-Gate", verifiedAt: Date.now().toString()}
          newActivityLog={ activityName: "Verified VoterID", activityTime: Date.now().toString() }
          break;

        case "PANCARD":
          valid=validatePancard("ABCDE1234F");
          newNullCardData={docType: "PANCARD", verifedBy: "Auth-Gate", verifiedAt: Date.now().toString()}
          newActivityLog={ activityName: "Verified Pancard", activityTime: Date.now().toString() }
          break;

        case "RATION":
          valid=validateRation("AP12BC3456");
          newNullCardData={docType: "RATION", verifedBy: "Auth-Gate", verifiedAt: Date.now().toString()}
          newActivityLog={ activityName: "Verified Ration Card", activityTime: Date.now().toString() }
          break;

        case "DRIVING_LICENSE":
          valid=validateDrivingLicense("DL0420110149646");
          newNullCardData={docType: "DRIVING_LICENSE", verifedBy: "Auth-Gate", verifiedAt: Date.now().toString()}
          newActivityLog={ activityName: "Verified Driving License", activityTime: Date.now().toString() }
          break;

        default:
          console.log("Invalid document type.");
          res.status(400).json({
            success:false,
            message:"Invalid Document Type."
          })
          return;
      }

      if(!valid){
        res.status(400).json({
          success:false,
          message:"Failed in validating the document."
        })
        return;
      }

      let userData;

      if(!newUser){
        try {
          const existingCIDs=await contract.getUserInfo(NCid);
          const response = await fetch(`https://gateway.pinata.cloud/ipfs/${existingCIDs[existingCIDs.length - 1]}`);
          if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.status}`);
          }
          const existingData = await response.json();

          userData = {
            nullCardData: [...(existingData.nullCardData || []),newNullCardData],
            activityLogs: [...(existingData.activityLogs || []),newActivityLog],
            usageLogs: existingData.usageLogs || []
          };
        } catch (error) {
          console.log("Error fetching or processing data:", error);
        }
      }else{
        userData={
          nullCardData:newNullCardData,
          activityLogs:newActivityLog,
          usageLogs:[]
        }
      }

      const {IpfsHash}=await pinata.pinJSONToIPFS(userData,{
        pinataMetadata:{
          name:`Null-Card-Data-${NCid}`
        }
      })

      redis.set(NCid,IpfsHash,{ex:TTL})

      res.status(200).json({
        success: true,
        message: "New CID created and stored in Redis",
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