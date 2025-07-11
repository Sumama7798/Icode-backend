import { connectDB } from "../../../utils/db.js";
import { getCardsByAdress } from "../../../controllers/card.controller.js";

export default async function handler(req, res) {
  await connectDB();

  if (req.method === "GET") {
    const { page, section } = req.query;

    // Express-style fix: simulate `req.params`
    req.params = { page, section };

    return getCardsByAdress(req, res);
  }

  res.status(405).json({ message: "Method Not Allowed" });
}