import express from "express";
import requiredUser from "../middleware/requiredUser.js";
import { getUsersForSidebar } from "../controllers/user.js";

const router = express.Router();

router.get("/", requiredUser, getUsersForSidebar);

export default router;
