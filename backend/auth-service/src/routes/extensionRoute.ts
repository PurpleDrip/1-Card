import { fetchUserData } from "controllers/extension";
import e from "express";

const router = e.Router();

router.post("/get-user-data",fetchUserData)

export default router;