import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  name: String,
  docsRequired: [String],
  fees: Number,
  timeline: String,
});

export default mongoose.model("Service", serviceSchema);
