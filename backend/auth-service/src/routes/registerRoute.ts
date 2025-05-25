import { registerUser } from "../controllers/user"
import e from 'express';
import { appendCookie } from '../middlewares/cookie';
import { validateRegisterInput } from '../middlewares/validate';
import { appendUserToChain } from "../controllers/chain";

const router = e.Router();

router.post("/register",validateRegisterInput,registerUser,appendUserToChain,appendCookie)

export default router;