import express from "express";

import { isAuth } from "../controllers/auth";
import { getUser } from "../controllers/user";

const router = express.Router();

router.get("/", isAuth, getUser);

export default router;
