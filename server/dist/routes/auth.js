"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../controllers/auth");
const router = express_1.default.Router();
router.post("/register", auth_1.isNotAuth, auth_1.register);
router.post("/login", auth_1.isNotAuth, auth_1.login);
router.get("/login/success", auth_1.loginSuccess);
router.get("/login/failure", auth_1.loginFailure);
router.post("/logout", auth_1.isAuth, auth_1.logout);
router.get("/status", auth_1.getAuthStatus);
exports.default = router;
