import express from "express";
import { getCpuList, getGpuList } from "../controllers/components";

const router = express.Router();

router.get("/gpu", getGpuList);
router.get("/cpu", getCpuList);

export default router;
