import { connectDB } from "../utils/db.js";
import { sendEmail } from "../controllers/message.controller.js";

export default async function handler(req, res) {
  await connectDB();
  const { method, url } = req;
  const cleanUrl = url.split("?")[0];

  try {
    if (method === "POST" && cleanUrl.endsWith("/sendEmail")) {
      return sendEmail(req, res);
    }

    res.status(405).json({ message: "Method Not Allowed" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
}
