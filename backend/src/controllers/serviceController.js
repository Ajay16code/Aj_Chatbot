import Service from "../models/Service.js";

export const getServices = async (req, res) => {
  try {
    const services = await Service.find({});
    res.json(services);
  } catch (err) {
    console.error("Service fetch error:", err);
    res.status(500).json({ message: "Failed to load services" });
  }
};
