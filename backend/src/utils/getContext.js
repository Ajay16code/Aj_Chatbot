import Service from "../models/Service.js";
import Subject from "../models/Subject.js";
import Quote from "../models/Quote.js";

export async function getContext(mode, message) {
  try {
    if (mode === "support") {
      const services = await Service.find({});
      const contextText = services && services.length > 0
        ? services
            .map(
              (s) =>
                `${s.name} - docs: ${s.docsRequired?.join(", ") || ""} - fees: ${s.fees} - timeline: ${s.timeline}`
            )
            .join("\n")
        : "No services data available.";

      const systemPrompt = `
You are AJ Sevai Centre support bot. 
Answer only using the given AJ Sevai data. 
Explain in simple Tamil + English mix. 
If you don't know, say you are not sure and ask user to contact AJ Sevai directly.
`;

      return { systemPrompt, extraContext: contextText };
    }

    if (mode === "study") {
      const subjects = await Subject.find({});
      const contextText = subjects && subjects.length > 0
        ? subjects
            .map((sub) => `${sub.name}: units -> ${sub.units?.join(", ") || ""}`)
            .join("\n")
        : "No subjects data available.";

      const systemPrompt = `
You are a friendly study buddy for KGiSL students. 
Explain OS, CN, DSA, Stats etc in very simple language (Tamil + English).
Give short answers, examples, and exam tips. Do NOT write full assignments.
`;
      return { systemPrompt, extraContext: contextText };
    }

    if (mode === "stress") {
      const quote = await Quote.findOne().lean();
      const systemPrompt = `
You are a simple wellbeing helper. 
You ONLY give motivation, breathing exercises, and journaling prompts. 
You are NOT a doctor or therapist. 
If user mentions self-harm or suicide, clearly tell them to talk to family, friends or a professional immediately.
`;
      const extraContext = `Motivational quote: ${quote?.text || "Take care of yourself today."}`;
      return { systemPrompt, extraContext };
    }

    // default
    return { systemPrompt: "You are a helpful assistant.", extraContext: "" };
  } catch (err) {
    console.error("getContext error:", err);
    return { systemPrompt: "You are a helpful assistant.", extraContext: "" };
  }
}

