"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const dotenv_1 = __importDefault(require("dotenv"));
if (process.env.NODE_ENV !== "production")
    dotenv_1.default.config();
const auth_1 = __importDefault(require("./routes/auth"));
const user_1 = __importDefault(require("./routes/user"));
const app = (0, express_1.default)();
require("./mongooseConfig");
require("./passportConfig");
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    credentials: true,
    origin: true,
}));
app.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use("/api/auth", auth_1.default);
app.use("/api/user", user_1.default);
const errorHandler = (err, req, res, next) => {
    if (err.name === "AuthError")
        res.status(err.status).json(err.json);
    else
        res.status(500).json(err.message);
};
app.use(errorHandler);
app.listen(process.env.PORT || 3000);
