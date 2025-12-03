import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
  name: String,
  units: [String],
});

export default mongoose.model("Subject", subjectSchema);
