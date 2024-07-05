import express from "express";

import {
  register,
  login,
  logout,
  loginSuccess,
  loginFailure,
  isNotAuth,
  isAuth,
} from "../controllers/auth";

const router = express.Router();

router.post("/register", isNotAuth, register);

router.post("/login", isNotAuth, login);
router.get("/login/success", loginSuccess);
router.get("/login/failure", loginFailure);

router.post("/logout", isAuth, logout);

export default router;
