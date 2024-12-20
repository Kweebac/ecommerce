// @ts-nocheck

import dotenv from "dotenv";
if (process.env.NODE_ENV !== "production") dotenv.config();
import express, { ErrorRequestHandler } from "express";
import morgan from "morgan";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import authRouter from "./routes/auth";
import userRouter from "./routes/user";
import componentsRouter from "./routes/components";
import accessoriesRouter from "./routes/accessories";
import prebuiltRouter from "./routes/prebuilt";

const app = express();

require("./mongooseSetup");
require("./passportSetup");

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));

app.use(
  session({
    // @ts-expect-error
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/components", componentsRouter);
app.use("/api/accessories", accessoriesRouter);
app.use("/api/prebuilt", prebuiltRouter);

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err.name === "AuthError") res.status(400).json(err.json);
  else res.status(500).json(err.message);
};

app.use(errorHandler);

app.listen(process.env.PORT || 3000, "0.0.0.0");
