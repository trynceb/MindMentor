import express from "express";
import {text, code, assist} from "../controllers/openai.js";

const router = express.Router();

router.post("/text", text);
router.post("/code", code);
router.post("/assist", assist);

export default router;
