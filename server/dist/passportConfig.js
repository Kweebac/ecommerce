"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_local_1 = require("passport-local");
const bcrypt_1 = __importDefault(require("bcrypt"));
const passport_1 = __importDefault(require("passport"));
const User_1 = __importDefault(require("./models/User"));
passport_1.default.use(new passport_local_1.Strategy({ usernameField: "email" }, async (email, password, done) => {
    try {
        const user = await User_1.default.findOne({ email }).exec();
        if (user === null)
            done(null, false, { message: "No user with that email | email" });
        else if (!(await bcrypt_1.default.compare(password, user.password)))
            done(null, false, { message: "Incorrect password | password" });
        else
            done(null, user);
    }
    catch (err) {
        done(err);
    }
}));
passport_1.default.serializeUser((user, done) => {
    done(null, user.id);
});
passport_1.default.deserializeUser(async (id, done) => {
    try {
        const user = await User_1.default.findById(id).exec();
        done(null, user);
    }
    catch (error) {
        done(error);
    }
});
