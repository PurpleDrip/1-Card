import e from 'express';
import {  appendCID, verifyUser } from "../controllers/chain";

const router = e.Router();

router.post("/verify-user",verifyUser)
router.post("/append-cid",appendCID)

export default router;