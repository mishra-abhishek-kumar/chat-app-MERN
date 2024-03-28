import express from "express";
import { getMessages, sendMessage } from "../controllers/message.js";
import requiredUser from "../middleware/requiredUser.js";

const router = express.Router();

router.get("/:id", requiredUser, getMessages);
router.post("/send/:id", requiredUser, sendMessage);

export default router;