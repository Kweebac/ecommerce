"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNotAuth = exports.isAuth = exports.getAuthStatus = exports.loginFailure = exports.loginSuccess = exports.logout = exports.login = exports.register = void 0;
const express_validator_1 = require("express-validator");
const bcrypt_1 = __importDefault(require("bcrypt"));
const passport_1 = __importDefault(require("passport"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const User_1 = __importDefault(require("../models/User"));
class AuthError {
    constructor(json) {
        this.name = "AuthError";
        this.status = 400;
        this.json = json;
    }
}
const register = [
    (0, express_validator_1.body)("email")
        .escape()
        .trim()
        .custom(async (email) => {
        if (await User_1.default.findOne({ email }))
            throw new Error("Already exists");
    }),
    (0, express_validator_1.body)("password")
        .escape()
        .trim()
        .isLength({ min: 8 })
        .withMessage("Must be at least 8 characters"),
    (0, express_validator_1.body)("firstName").escape().trim().isAlpha().withMessage("Can only contain letters"),
    (0, express_async_handler_1.default)(async (req, res) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (errors.isEmpty()) {
            const { email, password, firstName } = req.body;
            await User_1.default.create({
                email,
                password: await bcrypt_1.default.hash(password, 10),
                firstName,
            });
        }
        else {
            throw new AuthError(errors.array());
        }
    }),
];
exports.register = register;
const login = [
    (0, express_validator_1.body)("email").escape(),
    (0, express_validator_1.body)("password").escape(),
    passport_1.default.authenticate("local", {
        successRedirect: "/api/auth/login/success",
        failureRedirect: "/api/auth/login/failure",
        failureMessage: true,
    }),
];
exports.login = login;
const logout = (req, res, next) => {
    req.logout((err) => {
        err ? next(err) : res.end();
    });
};
exports.logout = logout;
const loginSuccess = (req, res) => {
    res.end();
};
exports.loginSuccess = loginSuccess;
const loginFailure = (req, res) => {
    const [msg, path] = req.session.messages.at(-1).split(" | ");
    throw new AuthError([{ msg, path }]);
};
exports.loginFailure = loginFailure;
const getAuthStatus = (req, res) => {
    res.json(req.isAuthenticated());
};
exports.getAuthStatus = getAuthStatus;
const isAuth = (req, res, next) => {
    req.isAuthenticated() ? next() : res.sendStatus(401);
};
exports.isAuth = isAuth;
const isNotAuth = (req, res, next) => {
    req.isAuthenticated() ? res.sendStatus(403) : next();
};
exports.isNotAuth = isNotAuth;
