import { RequestHandler } from "express";
import { Prebuilt } from "../models/Prebuilt";

const getPrebuilts: RequestHandler = async (req, res) => {
  const items = await Prebuilt.find().populate(
    "components.gpu components.cpu components.motherboard components.ram components.storage components.psu components.case components.cpuCooler"
  );
  res.json(items);
};

export { getPrebuilts };
