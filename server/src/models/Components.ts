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
    color: { type: String, enum: ["Black", "White"], required: true },
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
    integratedGraphics: { type: String, enum: ["Yes", "None"], required: true },
    socket: { type: String, required: true },
    tdp: { type: Number, required: true },
  })
);

const Motherboard = mongoose.model(
  "Motherboard",
  new Schema({
    url: { type: String, required: true },
    price: { type: Number, required: true },
    name: { type: String, required: true },

    chipset: { type: String, required: true },
    formFactor: { type: String, required: true },
    cpuSocket: { type: String, required: true },
    ram: {
      type: {
        ddr: { type: String, required: true },
        ddrSpeeds: { type: [Number], required: true },
        slots: { type: Number, required: true },
      },
      required: true,
    },
    m2Mkey: { type: Number, required: true },
    pcie: {
      type: {
        x16: { type: Number, required: true },
        x8: { type: Number, required: true },
        x4: { type: Number, required: true },
        x1: { type: Number, required: true },
      },
      required: true,
    },
    wifi: { type: String, required: true },
    color: { type: String, required: true },
  })
);

const RAM = mongoose.model(
  "RAM",
  new Schema({
    url: { type: String, required: true },
    price: { type: Number, required: true },
    pricePerGb: { type: Number, required: true },
    name: { type: String, required: true },

    ddr: { type: String, required: true },
    ddrSpeed: { type: Number, required: true },
    modules: { type: String, required: true },
    fwl: { type: Number, required: true },
    cl: { type: Number, required: true },
    color: { type: String, required: true },
  })
);

const Storage = mongoose.model(
  "Storage",
  new Schema({
    url: { type: String, required: true },
    price: { type: Number, required: true },
    pricePerGb: { type: Number, required: true },
    name: { type: String, required: true },

    type: { type: String, required: true },
    capacity: { type: Number, required: true },
  })
);

const PSU = mongoose.model(
  "PSU",
  new Schema({
    url: { type: String, required: true },
    price: { type: Number, required: true },
    name: { type: String, required: true },

    rating: { type: String, required: true },
    wattage: { type: Number, required: true },
    color: { type: String, required: true },
  })
);

const Case = mongoose.model(
  "Case",
  new Schema({
    url: { type: String, required: true },
    price: { type: Number, required: true },
    name: { type: String, required: true },

    type: { type: String, required: true },
    motherboardFormFactors: { type: [String], required: true },
    maxGpuLength: { type: Number, required: true },
    dimensions: { type: String, required: true },
    color: { type: String, enum: ["Black", "White"], required: true },
  })
);

const CPUCooler = mongoose.model(
  "CPUCooler",
  new Schema({
    url: { type: String, required: true },
    price: { type: Number, required: true },
    name: { type: String, required: true },

    rpm: { type: String, required: true },
    noise: { type: String, required: true },
    cpuSockets: { type: [String], required: true },
    waterCooled: { type: String, enum: ["Yes", "None"], required: true },
    height: { type: Number, required: true },
    color: { type: String, enum: ["Black", "White"], required: true },
  })
);

const Fans = mongoose.model(
  "Fans",
  new Schema({
    url: { type: String, required: true },
    price: { type: Number, required: true },
    name: { type: String, required: true },

    quantity: { type: Number, required: true },
    size: { type: Number, required: true },
    rpm: { type: String, required: true },
    airflow: { type: String, required: true },
    noise: { type: String, required: true },
    color: { type: String, enum: ["Black", "White"], required: true },
  })
);

const OS = mongoose.model(
  "OS",
  new Schema({
    url: { type: String, required: true },
    price: { type: Number, required: true },
    name: { type: String, required: true },
  })
);

export { GPU, CPU, Motherboard, RAM, Storage, PSU, Case, CPUCooler, Fans, OS };
