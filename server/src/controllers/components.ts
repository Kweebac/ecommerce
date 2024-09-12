import { RequestHandler } from "express";
import { CPU, GPU, Motherboard, RAM, Storage, PSU, Case, CPUCooler, Fans, OS } from "../models/Components";

const getGpuList: RequestHandler = async (req, res) => {
  const gpuList = await GPU.find();
  res.json(gpuList);
};

const getCpuList: RequestHandler = async (req, res) => {
  const cpuList = await CPU.find();
  res.json(cpuList);
};

const getMotherboardList: RequestHandler = async (req, res) => {
  const motherboardList = await Motherboard.find();
  res.json(motherboardList);
};

const getRamList: RequestHandler = async (req, res) => {
  const ramList = await RAM.find();
  res.json(ramList);
};

const getStorageList: RequestHandler = async (req, res) => {
  const storageList = await Storage.find();
  res.json(storageList);
};

const getPsuList: RequestHandler = async (req, res) => {
  const psuList = await PSU.find();
  res.json(psuList);
};

const getCaseList: RequestHandler = async (req, res) => {
  const caseList = await Case.find();
  res.json(caseList);
};

const getCpuCoolerList: RequestHandler = async (req, res) => {
  const cpuCoolerList = await CPUCooler.find();
  res.json(cpuCoolerList);
};

const getFansList: RequestHandler = async (req, res) => {
  const fansList = await Fans.find();
  res.json(fansList);
};

const getOsList: RequestHandler = async (req, res) => {
  const osList = await OS.find();
  res.json(osList);
};

export { getGpuList, getCpuList, getMotherboardList, getRamList, getStorageList, getPsuList, getCaseList, getCpuCoolerList, getFansList, getOsList };
