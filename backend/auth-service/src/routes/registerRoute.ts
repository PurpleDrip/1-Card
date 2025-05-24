import { registerUser } from "../controllers/registerUser"
import e from 'express';
import { appendCookie } from '../middlewares/cookie';
import { validateRegisterInput } from '../middlewares/validate';

const router = e.Router();

router.post("/register",validateRegisterInput,registerUser,appendCookie)

export default router;