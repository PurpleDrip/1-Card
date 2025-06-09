import e from 'express';
import {  appendCID, getPublicKey, verifyUser } from "../controllers/chain";

const router = e.Router();

router.post("/verify-user",verifyUser)
router.post("/append-cid",appendCID)
router.post("/get-pub-key",getPublicKey)

export default router;