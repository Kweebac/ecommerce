// @ts-nocheck
import { RequestHandler } from "express";
import User from "../models/User";
import { body, validationResult } from "express-validator";
import asyncHandler from "express-async-handler";

const getUser: RequestHandler = async (req, res) => {
  const user = await User.findById(req.user?._id, "build").populate(
    "build.gpu build.cpu build.motherboard build.ram build.storage build.psu build.case build.cpuCooler build.fans build.os"
  );

  res.json(user);
};

const editBuild: RequestHandler = [
  body("componentType").escape().trim().isString(),
  body("id").escape().trim().isString(),

  asyncHandler(async (req, res) => {
    const { componentType, id } = req.body;
    const user = req.user;

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      if (req.user) {
        user.build[componentType] = id;

        await user.save();
      }

      res.end();
    } else {
      throw new Error("Either componentType or id is invalid");
    }
  }),
];

const deleteBuild: RequestHandler = [
  body("componentType").escape().trim().isString(),

  asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      if (req.user) {
        req.user.build = { ...req.user.build, [req.body.componentType]: undefined };

        await req.user.save();
      }

      res.end();
    } else {
      throw new Error("ComponentType is invalid");
    }
  }),
];

export { getUser, editBuild, deleteBuild };
