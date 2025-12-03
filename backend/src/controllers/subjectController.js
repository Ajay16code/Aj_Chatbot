import Subject from "../models/Subject.js";

export const getSubjects = async (req, res) => {
  try {
    const data = await Subject.find({});
    res.json(data);
  } catch (err) {
    console.error("Subject fetch error:", err);
    res.status(500).json({ message: "Failed to load subjects" });
  }
};
