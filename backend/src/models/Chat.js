import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },  // Firebase UID
    mode: { type: String, enum: ["support", "study", "stress"], required: true },
    question: String,
    answer: String,
  },
  { timestamps: true }
);

export default mongoose.model("Chat", chatSchema);
