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
  getGpuItem,
  getMotherboardItem,
  getRamItem,
  getStorageItem,
  getPsuItem,
  getCaseItem,
  getCpuCoolerItem,
  getFansItem,
  getOsItem,
  getCpuItem,
} from "../controllers/components";

const router = express.Router();

router.get("/gpu", getGpuList);
router.get("/gpu/:id", getGpuItem);

router.get("/cpu", getCpuList);
router.get("/cpu/:id", getCpuItem);

router.get("/motherboard", getMotherboardList);
router.get("/motherboard/:id", getMotherboardItem);

router.get("/ram", getRamList);
router.get("/ram/:id", getRamItem);

router.get("/storage", getStorageList);
router.get("/storage/:id", getStorageItem);

router.get("/psu", getPsuList);
router.get("/psu/:id", getPsuItem);

router.get("/case", getCaseList);
router.get("/case/:id", getCaseItem);

router.get("/cpu-cooler", getCpuCoolerList);
router.get("/cpu-cooler/:id", getCpuCoolerItem);

router.get("/fans", getFansList);
router.get("/fans/:id", getFansItem);

router.get("/os", getOsList);
router.get("/os/:id", getOsItem);

export default router;
