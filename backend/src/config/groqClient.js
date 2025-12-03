// backend/src/groqClient.js
import dotenv from "dotenv";
dotenv.config(); // <-- load .env BEFORE reading process.env

import Groq from "groq-sdk";

const apiKey = process.env.GROQ_API_KEY;

let groq;

if (apiKey) {
  groq = new Groq({ apiKey });
  console.log("Groq AI client initialized ✔️");
} else {
  console.warn("GROQ_API_KEY missing — using stub client");

  // Stub client that mimics Groq response shape
  groq = {
    chat: {
      completions: {
        create: async ({ messages }) => {
          const last = messages[messages.length - 1]?.content || "";
          return {
            choices: [
              {
                message: {
                  content: `(stub) Echo: ${last}`,
                },
              },
            ],
          };
        },
      },
    },
  };
}

export default groq;
