import Journal from "../models/Journal.js";

export const addJournalEntry = async (req, res) => {
  try {
    const { text } = req.body;
    const userId = req.user.uid;

    const entry = await Journal.create({
      userId,
      text,
      date: new Date(),
    });

    res.json({ message: "Journal entry saved", entry });
  } catch (err) {
    console.error("Journal save error:", err);
    res.status(500).json({ message: "Failed to save journal entry" });
  }
};

export const getJournalEntries = async (req, res) => {
  try {
    const userId = req.user.uid;

    const entries = await Journal.find({ userId }).sort({ date: -1 });

    res.json(entries);
  } catch (err) {
    console.error("Journal fetch error:", err);
    res.status(500).json({ message: "Failed to load journal entries" });
  }
};
