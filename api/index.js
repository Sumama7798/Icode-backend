import { connectDB } from "../utils/db.js";

export default async function handler(req, res) {
  await connectDB();

  const { method } = req;

  try {
    if (method === "GET") {
      return res.status(200).json({
        message: "Welcome to iCode API (Vercel)",
        timestamp: new Date().toISOString(),
      });
    }

    res.status(405).json({ message: "Method Not Allowed" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
}
