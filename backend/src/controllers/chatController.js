import groq from "../config/groqClient.js";
import Chat from "../models/Chat.js";
import { getContext } from "../utils/getContext.js";

export const handleChat = async (req, res) => {
  try {
    const { mode, message } = req.body;
    const userId = req.user.uid;

    const { systemPrompt, extraContext } = await getContext(mode, message);

    let reply;
    try {
      const completion = await groq.chat.completions.create({
        model: "llama-3.1-8b-instant",
        messages: [
          { role: "system", content: systemPrompt },
          {
            role: "user",
            content: `${extraContext}\n\nUser: ${message}`,
          },
        ],
        temperature: 0.4,
      });
      reply = completion.choices[0].message.content;
    } catch (groqErr) {
      console.warn("Groq API failed, using fallback response:", groqErr.message);
      // Fallback response when Groq fails (no API key or other issues)
      reply = `[Bot Response - ${mode.toUpperCase()} Mode]\n\nYour message: "${message}"\n\nNote: AI responses are currently unavailable. Please check your Groq API key configuration.`;
    }

    try {
      await Chat.create({ userId, mode, question: message, answer: reply });
    } catch (dbErr) {
      console.warn("Failed to save chat to DB:", dbErr.message);
    }

    res.json({ reply });
  } catch (error) {
    console.error("Chat error:", error);
    res.status(500).json({ message: "Chat failed: " + error.message });
  }
};
