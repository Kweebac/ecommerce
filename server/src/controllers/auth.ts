// @ts-nocheck

import { ValidationError, body, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import passport from "passport";
import asyncHandler from "express-async-handler";
import { RequestHandler } from "express-serve-static-core";

import User from "../models/User";

class AuthError {
  name = "AuthError";
  json: [{ msg: string; path: string }] | ValidationError[];

  constructor(json: [{ msg: string; path: string }] | ValidationError[]) {
    this.json = json;
  }
}

const register = [
  body("email")
    .escape()
    .trim()
    .custom(async (email) => {
      if (await User.findOne({ email })) throw new Error("Already exists");
    }),
  body("password")
    .escape()
    .trim()
    .isLength({ min: 8 })
    .withMessage("Must be at least 8 characters"),
  body("firstName").escape().trim().isAlpha().withMessage("Can only contain letters"),

  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      const { email, password, firstName } = req.body;

      await User.create({
        email,
        password: await bcrypt.hash(password, 10),
        firstName,

        build: {},
      });

      res.end();
    } else {
      throw new AuthError(errors.array());
    }
  }),
];

const login = [
  body("email").escape(),
  body("password").escape(),
  passport.authenticate("local", {
    successRedirect: "/api/auth/login/success",
    failureRedirect: "/api/auth/login/failure",
    failureMessage: true,
  }),
];
// const login = [
//   body("email").escape(),
//   body("password").escape(),
//   passport.authenticate("local", {
//     failureRedirect: "/api/auth/login/failure",
//     failureMessage: true,
//   }),
//   (req, res, next) => {
//     console.log("login should've worked?");
//     console.log("req.isAuthenticated()", req.isAuthenticated());
//     res.end();
//   },
// ];

const logout: RequestHandler = (req, res, next) => {
  req.logout((err) => {
    err ? next(err) : res.end();
  });
};

const loginSuccess: RequestHandler = (req, res) => {
  res.end();
};

const loginFailure: RequestHandler = (req, res) => {
  // @ts-expect-error
  const [msg, path] = req.session.messages.at(-1).split(" | ");
  throw new AuthError([{ msg, path }]);
};

const isAuth: RequestHandler = (req, res, next) => {
  req.isAuthenticated() ? next() : res.sendStatus(401);
};

const isNotAuth: RequestHandler = (req, res, next) => {
  req.isAuthenticated() ? res.sendStatus(403) : next();
};

export { register, login, logout, loginSuccess, loginFailure, isAuth, isNotAuth };
