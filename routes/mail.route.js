import express from "express";
import { sendMail } from "../controllers//mail.controller.js";
const router = express.Router();

router.post("/sendMail", sendMail)

export default router;
