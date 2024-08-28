import express from "express";
import { getGPUList } from "../controllers/components";

const router = express.Router();

router.get("/gpu", getGPUList);

export default router;
