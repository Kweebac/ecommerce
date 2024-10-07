import express from "express";
import { isAuth } from "../controllers/auth";
import { deleteBuild, editBuild, getUser } from "../controllers/user";

const router = express.Router();

router.get("/", isAuth, getUser);
router.post("/build", isAuth, editBuild);
router.delete("/build", deleteBuild);

export default router;
