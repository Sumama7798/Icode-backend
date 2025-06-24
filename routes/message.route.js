import express from "express";
import { sendEmail } from "../controllers/message.controller.js";


const router = express.Router();


router.post("/sendEmail" , sendEmail);

export default router;