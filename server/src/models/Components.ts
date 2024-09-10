import mongoose, { Schema } from "mongoose";

const GPU = mongoose.model(
  "GPU",
  new Schema({
    url: { type: String, required: true },
    price: { type: Number, required: true },

    name: { type: String, required: true },
    chipset: { type: String, required: true },
    memory: { type: Number, required: true },
    coreClock: { type: Number, required: true },
    boostClock: { type: Number, required: true },
    color: { type: String, required: true },
    length: { type: Number, required: true },
    tdp: { type: Number, required: true },
  })
);

const CPU = mongoose.model(
  "CPU",
  new Schema({
    url: { type: String, required: true },
    price: { type: Number, required: true },

    name: { type: String, required: true },
    series: { type: String, required: true },
    cores: { type: Number, required: true },
    pCoreClock: { type: Number, required: true },
    pBoostClock: { type: Number, required: true },
    integratedGraphics: { type: String, required: true },
    tdp: { type: Number, required: true },
  })
);

export { GPU, CPU };
