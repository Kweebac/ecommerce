import express from "express";
import { getPrebuilts } from "../controllers/prebuilt";

const router = express.Router();

router.get("/", getPrebuilts);

export default router;
