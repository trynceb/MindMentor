import express from "express";
import {career, motivate, nutrition} from "../controllers/openai.js";

const router = express.Router();

router.post("/career", career);
router.post("/motivate", motivate);
router.post("/nutrition", nutrition);

export default router;
