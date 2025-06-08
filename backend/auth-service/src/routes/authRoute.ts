import e from 'express';
import {  verifyUser } from "../controllers/chain";

const router = e.Router();

router.post("/verify-user",verifyUser)

export default router;