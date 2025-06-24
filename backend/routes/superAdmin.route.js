import express from "express";
import {
  createAdmin,
  deleteUser,
  updateUserRole,
  getAllUsers,
} from "../controllers/user.controller.js";
import {
  superAdminRoute,
  protectRoute,
} from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/createAdmin", protectRoute, superAdminRoute, createAdmin);

router.post("/deleteUser/:id", protectRoute, superAdminRoute, deleteUser);

router.post("/updateUserRole/:id",protectRoute,superAdminRoute,updateUserRole);

router.get("/getAllUsers",protectRoute,superAdminRoute,getAllUsers);

export default router;
