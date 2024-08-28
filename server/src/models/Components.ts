import mongoose, { Schema } from "mongoose";

const GPU = mongoose.model(
  "GPU",
  new Schema({
    url: { type: String, required: true },

    name: { type: String, required: true },
    chipset: { type: String, required: true },
    memory: { type: Number, required: true },
    coreClock: { type: Number, required: true },
    boostClock: { type: Number, required: true },
    color: { type: String, required: true },
    length: { type: Number, required: true },
    tdp: { type: Number, required: true },

    price: { type: Number, required: true },
  })
);

export { GPU };
