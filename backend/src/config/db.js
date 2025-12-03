import mongoose from "mongoose";

/**
 * Connect to MongoDB with retries. Returns true on success, false on failure.
 */
export const connectDB = async ({ retries = 3, delayMs = 2000 } = {}) => {
  // Try a list of candidate URIs so the app works both inside docker-compose (host 'mongo')
  // and when running locally (host 'localhost'). The first successful connect wins.
  const configured = process.env.MONGO_URI && process.env.MONGO_URI.trim();
  const fallbackDbName = (configured && configured.split('/').pop()) || 'aj_db';
  const candidates = [
    configured,
    `mongodb://localhost:27017/${fallbackDbName}`,
    `mongodb://127.0.0.1:27017/${fallbackDbName}`,
  ].filter(Boolean);

  for (const uri of candidates) {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        await mongoose.connect(uri, {});
        console.log(`MongoDB connected to ${uri}`);
        return true;
      } catch (err) {
        console.warn(`MongoDB connection attempt ${attempt} to ${uri} failed: ${err.message}`);
        if (attempt < retries) await new Promise((res) => setTimeout(res, delayMs));
      }
    }
  }

  console.error('MongoDB error: all connection attempts failed');
  return false;
};
