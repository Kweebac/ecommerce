import { RequestHandler } from "express";
import mongoose from "mongoose";
import { Headphones, Keyboard, Mice, Monitor, Speakers, Webcam } from "../models/Accessories";

const getMonitorList: RequestHandler = async (req, res) => {
  const items = await Monitor.find();
  res.json(items);
};
const getMonitorItem: RequestHandler = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) res.sendStatus(404);
  else {
    const item = await Monitor.findById(id);
    res.json(item);
  }
};

const getKeyboardList: RequestHandler = async (req, res) => {
  const items = await Keyboard.find();
  res.json(items);
};
const getKeyboardItem: RequestHandler = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) res.sendStatus(404);
  else {
    const item = await Keyboard.findById(id);
    res.json(item);
  }
};

const getMiceList: RequestHandler = async (req, res) => {
  const items = await Mice.find();
  res.json(items);
};
const getMiceItem: RequestHandler = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) res.sendStatus(404);
  else {
    const item = await Mice.findById(id);
    res.json(item);
  }
};

const getHeadphonesList: RequestHandler = async (req, res) => {
  const items = await Headphones.find();
  res.json(items);
};
const getHeadphonesItem: RequestHandler = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) res.sendStatus(404);
  else {
    const item = await Headphones.findById(id);
    res.json(item);
  }
};

const getWebcamList: RequestHandler = async (req, res) => {
  const items = await Webcam.find();
  res.json(items);
};
const getWebcamItem: RequestHandler = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) res.sendStatus(404);
  else {
    const item = await Webcam.findById(id);
    res.json(item);
  }
};

const getSpeakersList: RequestHandler = async (req, res) => {
  const items = await Speakers.find();
  res.json(items);
};
const getSpeakersItem: RequestHandler = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) res.sendStatus(404);
  else {
    const item = await Speakers.findById(id);
    res.json(item);
  }
};

export {
  getMonitorList,
  getMonitorItem,
  getKeyboardList,
  getKeyboardItem,
  getMiceList,
  getMiceItem,
  getHeadphonesList,
  getHeadphonesItem,
  getWebcamList,
  getWebcamItem,
  getSpeakersList,
  getSpeakersItem,
};
