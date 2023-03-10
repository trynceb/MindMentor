import express from "express";
import {text, coach, assist} from "../controllers/openai.js";

const router = express.Router();

router.post("/text", text);
router.post("/coach", coach);
router.post("/assist", assist);

export default router;
