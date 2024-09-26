import express from "express";
import {
  getMonitorList,
  getMonitorItem,
  getKeyboardList,
  getKeyboardItem,
  getMiceList,
  getMiceItem,
  getHeadphonesList,
  getHeadphonesItem,
  getWebcamList,
  getWebcamItem,
  getSpeakersList,
  getSpeakersItem,
} from "../controllers/accessories";

const router = express.Router();

router.get("/monitors", getMonitorList);
router.get("/monitors/:id", getMonitorItem);

router.get("/keyboards", getKeyboardList);
router.get("/keyboards/:id", getKeyboardItem);

router.get("/mice", getMiceList);
router.get("/mice/:id", getMiceItem);

router.get("/headphones", getHeadphonesList);
router.get("/headphones/:id", getHeadphonesItem);

router.get("/webcams", getWebcamList);
router.get("/webcams/:id", getWebcamItem);

router.get("/speakers", getSpeakersList);
router.get("/speakers/:id", getSpeakersItem);

export default router;
