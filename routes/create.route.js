import express from "express";

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
  getCardsByAdress,
  getCardsByPage,
  updateCard,
} from "../controllers/card.controller.js";
import { protectRoute, adminRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/upload", protectRoute, adminRoute, Upload);

router.get("/profile/:id", protectRoute, adminRoute, getUserProfile);

router.put("/updateProfile/:id", protectRoute, updateUserProfile);

router.put("/updatePassword/:id", protectRoute, updatePassword);

router.post("/createCard", protectRoute, adminRoute, createCard);

router.get("/getAllCards", protectRoute, adminRoute, getAllCards);

router.get("/page/:page", protectRoute, adminRoute, getCardsByPage);

router.put("/update/cards/:id", protectRoute, adminRoute, updateCard);

router.delete("/delete/:id", protectRoute, adminRoute, deleteCard);

export default router;
