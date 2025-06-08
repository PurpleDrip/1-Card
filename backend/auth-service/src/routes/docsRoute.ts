import { validateDoc } from "../controllers/docs";
import e from "express";

const router = e.Router();

router.post("/validate-doc",validateDoc)

export default router;