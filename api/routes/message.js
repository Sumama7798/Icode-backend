import { connectDB } from "../../../utils/db.js";
import { sendEmail } from "../../../controllers/message.controller.js";

export default async function handler(req, res) {
  await connectDB();

  if (req.method === "POST") {
    return sendEmail(req, res);
  }

  res.status(405).json({ message: "Method Not Allowed" });
}
