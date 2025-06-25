import { connectDB } from "../../../utils/db.js";
import { getCardsByAdress } from "../../../controllers/card.controller.js";

export default async function handler(req, res) {
  await connectDB();
  const { method, url } = req;
  const cleanUrl = url.split("?")[0];

  try {
    if (method === "POST" && cleanUrl.endsWith("/getCardsByAdress")) {
      return getCardsByAdress(req, res);
    }

    res.status(405).json({ message: "Method Not Allowed" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
}
