import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { handleChat } from "../controllers/chatController.js";

const router = express.Router();

router.post("/", verifyToken, handleChat);

export default router;
