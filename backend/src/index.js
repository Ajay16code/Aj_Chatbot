import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

import chatRoutes from "./routes/chatRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import subjectRoutes from "./routes/subjectRoutes.js";
import journalRoutes from "./routes/journalRoutes.js";
import healthRoutes from "./routes/healthRoutes.js";

dotenv.config();
const app = express();

// Frontend URL for CORS (5173 or 5174 – check your Vite port)
const FRONTEND_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:5173";

app.use(
  cors({
    origin: FRONTEND_ORIGIN,
  })
);

app.use(express.json());

// connect DB and start server
const PORT = process.env.PORT || 4000;

const start = async () => {
  const dbOk = await connectDB().catch((e) => {
    console.error("connectDB threw:", e);
    return false;
  });

  if (!dbOk) {
    console.warn("Warning: MongoDB not connected. The server will continue running in limited mode.");
  }

  app.listen(PORT, () => console.log(`Backend running on ${PORT}`));
};

start();

// Health route (you can keep this OR the router, but one is enough)
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// API routes
app.use("/api/chat", chatRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/subjects", subjectRoutes);
app.use("/api/journal", journalRoutes);
// if you want extra info in /api/health from router, you can keep this:
app.use("/api/health", healthRoutes);

// (server started inside start())
