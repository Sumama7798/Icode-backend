import { connectDB } from "../utils/db.js";
import {
  createAdmin,
  deleteUser,
  updateUserRole,
  getAllUsers,
} from "../controllers/user.controller.js";
import {
  protectRoute,
  superAdminRoute,
} from "../middleware/auth.middleware.js";

export default async function handler(req, res) {
  await connectDB();

  const { method, url } = req;
  const cleanUrl = url.split("?")[0];

  try {
    if (method === "POST" && cleanUrl.endsWith("/createAdmin")) {
      return protectRoute(req, res, () =>
        superAdminRoute(req, res, () => createAdmin(req, res))
      );
    }

    if (method === "POST" && cleanUrl.includes("/deleteUser/")) {
      const id = cleanUrl.split("/deleteUser/")[1];
      return protectRoute(req, res, () =>
        superAdminRoute(req, res, () => deleteUser(req, res, id))
      );
    }

    if (method === "POST" && cleanUrl.includes("/updateUserRole/")) {
      const id = cleanUrl.split("/updateUserRole/")[1];
      return protectRoute(req, res, () =>
        superAdminRoute(req, res, () => updateUserRole(req, res, id))
      );
    }

    if (method === "GET" && cleanUrl.endsWith("/getAllUsers")) {
      return protectRoute(req, res, () =>
        superAdminRoute(req, res, () => getAllUsers(req, res))
      );
    }

    return res.status(404).json({ message: "Route not found" });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
}
