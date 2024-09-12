import express from "express";
import {
  getCpuList,
  getGpuList,
  getMotherboardList,
  getRamList,
  getStorageList,
  getPsuList,
  getCaseList,
  getCpuCoolerList,
  getFansList,
  getOsList,
} from "../controllers/components";

const router = express.Router();

router.get("/gpu", getGpuList);
router.get("/cpu", getCpuList);
router.get("/motherboard", getMotherboardList);
router.get("/ram", getRamList);
router.get("/storage", getStorageList);
router.get("/psu", getPsuList);
router.get("/case", getCaseList);
router.get("/cpu-cooler", getCpuCoolerList);
router.get("/fans", getFansList);
router.get("/os", getOsList);

export default router;
