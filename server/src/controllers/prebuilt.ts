import { RequestHandler } from "express";
import { Prebuilt } from "../models/Prebuilt";
import mongoose from "mongoose";

const getPrebuilts: RequestHandler = async (req, res) => {
  const items = await Prebuilt.find().populate(
    "components.gpu components.cpu components.motherboard components.ram components.storage components.psu components.case components.cpuCooler"
  );
  res.json(items);
};

const getPrebuiltItem: RequestHandler = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.isValidObjectId(id)) res.sendStatus(404);
  else {
    const item = await Prebuilt.findById(id).populate(
      "components.gpu components.cpu components.motherboard components.ram components.storage components.psu components.case components.cpuCooler"
    );
    res.json(item);
  }
};

export { getPrebuilts, getPrebuiltItem };
