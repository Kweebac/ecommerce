import express from "express";
import { getPrebuiltItem, getPrebuilts } from "../controllers/prebuilt";

const router = express.Router();

router.get("/", getPrebuilts);
router.get("/:id", getPrebuiltItem);

export default router;
