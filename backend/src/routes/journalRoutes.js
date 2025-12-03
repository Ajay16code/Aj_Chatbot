import express from "express";
import { verifyToken } from "../middleware/auth.js";
import {
  addJournalEntry,
  getJournalEntries,
} from "../controllers/journalController.js";

const router = express.Router();

// POST /api/journal  → add new entry
router.post("/", verifyToken, addJournalEntry);

// GET /api/journal  → get all entries for user
router.get("/", verifyToken, getJournalEntries);

export default router;
