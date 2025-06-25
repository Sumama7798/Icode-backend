import { connectDB } from "../../../utils/db.js";
import {
  Login,
  Logout,
  refreshToken,
  Signup,
} from "../../../controllers/auth.controllers.js";

export default async function handler(req, res) {
  await connectDB();

  const { method, url } = req;
  const cleanUrl = url.split("?")[0];

  try {
    if (method === "POST" && cleanUrl.endsWith("/signup")) {
      return Signup(req, res);
    }

    if (method === "POST" && cleanUrl.endsWith("/login")) {
      return Login(req, res);
    }

    if (method === "POST" && cleanUrl.endsWith("/logout")) {
      return Logout(req, res);
    }

    if (method === "POST" && cleanUrl.endsWith("/refreshToken")) {
      return refreshToken(req, res);
    }

    return res.status(404).json({ message: "Route not found" });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
}

