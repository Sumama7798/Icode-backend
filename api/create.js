import { connectDB } from "../utils/db.js";
import { Upload } from "../controllers/upload.controller.js";
import {
  getUserProfile,
  updatePassword,
  updateUserProfile,
} from "../controllers/profile.controller.js";
import {
  createCard,
  deleteCard,
  getAllCards,
  getCardsByPage,
  updateCard,
} from "../controllers/card.controller.js";
import { protectRoute, adminRoute } from "../middleware/auth.middleware.js";

export default async function handler(req, res) {
  await connectDB();

  const { method, url } = req;
  const cleanUrl = url.split("?")[0];

  try {
    if (method === "POST" && cleanUrl.endsWith("/upload")) {
      return protectRoute(req, res, () =>
        adminRoute(req, res, () => Upload(req, res))
      );
    }

    if (method === "GET" && cleanUrl.startsWith("/api/route/create/profile")) {
      const id = req.query.id;
      return protectRoute(req, res, () =>
        adminRoute(req, res, () => getUserProfile(req, res, id))
      );
    }

    if (method === "PUT" && cleanUrl.startsWith("/api/route/create/updateProfile")) {
      const id = req.query.id;
      return protectRoute(req, res, () => updateUserProfile(req, res, id));
    }

    if (method === "PUT" && cleanUrl.startsWith("/api/route/create/updatePassword")) {
      const id = req.query.id;
      return protectRoute(req, res, () => updatePassword(req, res, id));
    }

    if (method === "POST" && cleanUrl.endsWith("/createCard")) {
      return protectRoute(req, res, () =>
        adminRoute(req, res, () => createCard(req, res))
      );
    }

    if (method === "GET" && cleanUrl.endsWith("/getAllCards")) {
      return protectRoute(req, res, () =>
        adminRoute(req, res, () => getAllCards(req, res))
      );
    }

    if (method === "GET" && cleanUrl.includes("/page/")) {
      const page = cleanUrl.split("/page/")[1];
      return protectRoute(req, res, () =>
        adminRoute(req, res, () => getCardsByPage(req, res, page))
      );
    }

    if (method === "PUT" && cleanUrl.includes("/update/cards/")) {
      const id = cleanUrl.split("/update/cards/")[1];
      return protectRoute(req, res, () =>
        adminRoute(req, res, () => updateCard(req, res, id))
      );
    }

    if (method === "DELETE" && cleanUrl.includes("/delete/")) {
      const id = cleanUrl.split("/delete/")[1];
      return protectRoute(req, res, () =>
        adminRoute(req, res, () => deleteCard(req, res, id))
      );
    }

    return res.status(404).json({ message: "Route not found" });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
}
