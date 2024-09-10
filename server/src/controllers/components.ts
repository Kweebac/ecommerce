import { RequestHandler } from "express";
import { CPU, GPU } from "../models/Components";

const getGpuList: RequestHandler = async (req, res) => {
  const gpuList = await GPU.find();

  res.json(gpuList);
};

const getCpuList: RequestHandler = async (req, res) => {
  const cpuList = await CPU.find();

  res.json(cpuList);
};

export { getGpuList, getCpuList };
