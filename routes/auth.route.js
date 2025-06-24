import express from "express";
import {
  Login,
  Logout,
  refreshToken,
  Signup,
} from "../controllers/auth.controllers.js";

const router = express.Router();

router.post("/signup", Signup);

router.post("/login", Login);

router.post("/logout", Logout);

router.post("/refreshToken", refreshToken);

export default router;
