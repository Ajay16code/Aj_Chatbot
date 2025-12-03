import admin from "../config/firebaseAdmin.js";
import dotenv from "dotenv";

dotenv.config();

export const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : null;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  // 🔥 DEVELOPMENT MODE → bypass Firebase completely
  if (process.env.SKIP_FIREBASE_AUTH === "true") {
    req.user = { uid: "test-user", email: "test@local.dev" };
    return next(); // <-- no firebase call!
  }

  // 🔐 REAL MODE: verify in Firebase
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.user = { uid: decoded.uid, email: decoded.email };
    next();
  } catch (error) {
    console.error("Firebase verify error:", error.message);
    return res.status(401).json({ message: "Invalid Firebase token" });
  }
};
