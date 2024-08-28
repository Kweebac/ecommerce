import { RequestHandler } from "express";
import { GPU } from "../models/Components";

const getGPUList: RequestHandler = async (req, res) => {
  const gpuList = await GPU.find();

  res.json(gpuList);
};

export { getGPUList };
