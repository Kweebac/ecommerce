import { RequestHandler } from "express";
import {
  CPU,
  GPU,
  Motherboard,
  RAM,
  Storage,
  PSU,
  Case,
  CPUCooler,
  Fans,
  OS,
} from "../models/Components";
import mongoose from "mongoose";

const getGpuList: RequestHandler = async (req, res) => {
  const items = await GPU.find();
  res.json(items);
};
const getGpuItem: RequestHandler = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) res.sendStatus(404);
  else {
    const item = await GPU.findById(id);
    res.json(item);
  }
};

const getCpuList: RequestHandler = async (req, res) => {
  const items = await CPU.find();
  res.json(items);
};
const getCpuItem: RequestHandler = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) res.sendStatus(404);
  else {
    const item = await CPU.findById(id);
    res.json(item);
  }
};

const getMotherboardList: RequestHandler = async (req, res) => {
  const items = await Motherboard.find();
  res.json(items);
};
const getMotherboardItem: RequestHandler = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) res.sendStatus(404);
  else {
    const item = await Motherboard.findById(id);
    res.json(item);
  }
};

const getRamList: RequestHandler = async (req, res) => {
  const items = await RAM.find();
  res.json(items);
};
const getRamItem: RequestHandler = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) res.sendStatus(404);
  else {
    const item = await RAM.findById(id);
    res.json(item);
  }
};

const getStorageList: RequestHandler = async (req, res) => {
  const items = await Storage.find();
  res.json(items);
};
const getStorageItem: RequestHandler = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) res.sendStatus(404);
  else {
    const item = await Storage.findById(id);
    res.json(item);
  }
};

const getPsuList: RequestHandler = async (req, res) => {
  const items = await PSU.find();
  res.json(items);
};
const getPsuItem: RequestHandler = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) res.sendStatus(404);
  else {
    const item = await PSU.findById(id);
    res.json(item);
  }
};

const getCaseList: RequestHandler = async (req, res) => {
  const items = await Case.find();
  res.json(items);
};
const getCaseItem: RequestHandler = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) res.sendStatus(404);
  else {
    const item = await Case.findById(id);
    res.json(item);
  }
};

const getCpuCoolerList: RequestHandler = async (req, res) => {
  const items = await CPUCooler.find();
  res.json(items);
};
const getCpuCoolerItem: RequestHandler = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) res.sendStatus(404);
  else {
    const item = await CPUCooler.findById(id);
    res.json(item);
  }
};

const getFansList: RequestHandler = async (req, res) => {
  const items = await Fans.find();
  res.json(items);
};
const getFansItem: RequestHandler = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) res.sendStatus(404);
  else {
    const item = await Fans.findById(id);
    res.json(item);
  }
};

const getOsList: RequestHandler = async (req, res) => {
  const items = await OS.find();
  res.json(items);
};
const getOsItem: RequestHandler = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) res.sendStatus(404);
  else {
    const item = await OS.findById(id);
    res.json(item);
  }
};

export {
  getGpuList,
  getGpuItem,
  getCpuList,
  getCpuItem,
  getMotherboardList,
  getMotherboardItem,
  getRamList,
  getRamItem,
  getStorageList,
  getStorageItem,
  getPsuList,
  getPsuItem,
  getCaseList,
  getCaseItem,
  getCpuCoolerList,
  getCpuCoolerItem,
  getFansList,
  getFansItem,
  getOsList,
  getOsItem,
};
