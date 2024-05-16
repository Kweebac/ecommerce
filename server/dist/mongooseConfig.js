"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
if (process.env.NODE_ENV !== "production")
    dotenv_1.default.config();
mongoose_1.default.connect(process.env.MONGO_PRIVATE_URL);
mongoose_1.default.connection.on("error", console.error.bind(console, "Mongo connection error"));
