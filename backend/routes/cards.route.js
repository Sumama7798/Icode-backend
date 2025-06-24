import express from 'express'
import { getCardsByAdress } from '../controllers/card.controller.js';


const router = express.Router()

router.get("/getCardsByAdress/:page/:section", getCardsByAdress);





export default router;
