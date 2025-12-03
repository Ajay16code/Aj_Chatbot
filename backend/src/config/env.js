import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT;
export const MONGO_URI = process.env.MONGO_URI;
export const GROQ_API_KEY = process.env.GROQ_API_KEY;
