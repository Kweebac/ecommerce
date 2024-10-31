// @ts-nocheck
import { RequestHandler } from "express";
import User from "../models/User";
import { body, validationResult } from "express-validator";
import asyncHandler from "express-async-handler";

const getUser: RequestHandler = async (req, res) => {
  const user = await User.findById(req.user?._id, "build").populate(
    "build.gpu build.cpu build.motherboard build.ram build.storage build.psu build.case build.cpuCooler build.fans build.os"
  );

  console.log("getUser route");
  console.log("user", user);
  console.log("req.user", req.user);
  res.json(user);
};

const editBuild: RequestHandler = [
  body("componentType").escape().trim().isString(),
  body("id").escape().trim().isString(),

  asyncHandler(async (req, res) => {
    const { componentType, componentTitle, id, limit } = req.body;
    const user = req.user;

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      if (req.user) {
        if (Array.isArray(user.build[componentType])) {
          if (user.build[componentType].length >= limit)
            return res
              .status(400)
              .json({ message: `You have reached the ${componentTitle} limit.` });

          user.build[componentType].push(id);
        } else {
          if (user.build[componentType])
            return res
              .status(400)
              .json({ message: `You have already selected a ${componentTitle}.` });

          user.build[componentType] = id;
        }

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
    const { componentType, id } = req.body;
    const user = req.user;

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      if (user) {
        if (Array.isArray(user.build[componentType])) {
          let finished = false;

          user.build[componentType] = user.build[componentType].filter((item) => {
            if (finished) return true;

            if (item.equals(id)) {
              finished = true;
              return false;
            } else {
              return true;
            }
          });
        } else {
          user.build = { ...user.build, [componentType]: undefined };
        }

        await user.save();
      }

      res.end();
    } else {
      throw new Error("ComponentType is invalid");
    }
  }),
];

export { getUser, editBuild, deleteBuild };
