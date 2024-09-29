import mongoose, { Schema } from "mongoose";

const Monitor = mongoose.model(
  "Monitor",
  new Schema({
    url: { type: String, required: true },
    price: { type: Number, required: true },
    name: { type: String, required: true },

    screenSize: { type: Number, required: true },
    resolution: { type: String, required: true },
    refreshRate: { type: Number, required: true },
    responseTime: { type: Number, required: true },
    panelType: { type: String, required: true },
    brightness: { type: Number, required: true },
    frameSync: { type: [String], required: true },
    speakers: { type: String, required: true },
    curved: { type: String, required: true },
  })
);

const Keyboard = mongoose.model(
  "Keyboard",
  new Schema({
    url: { type: String, required: true },
    price: { type: Number, required: true },
    name: { type: String, required: true },

    style: { type: String, required: true },
    mechanical: { type: String, required: true },
    rgb: { type: String, required: true },
    tenkeyless: { type: String, required: true },
    wireless: { type: [String], required: true },
    color: { type: String, required: true },
  })
);

const Mice = mongoose.model(
  "Mice",
  new Schema({
    url: { type: String, required: true },
    price: { type: Number, required: true },
    name: { type: String, required: true },

    wireless: { type: [String], required: true },
    maxDpi: { type: Number, required: true },
    color: { type: String, required: true },
  })
);

const Headphones = mongoose.model(
  "Headphones",
  new Schema({
    url: { type: String, required: true },
    price: { type: Number, required: true },
    name: { type: String, required: true },

    microphone: { type: String, required: true },
    wireless: { type: String, required: true },
    frequencyResponse: { type: String, required: true },
    color: { type: String, required: true },
  })
);

const Webcam = mongoose.model(
  "Webcam",
  new Schema({
    url: { type: String, required: true },
    price: { type: Number, required: true },
    name: { type: String, required: true },

    resolutions: { type: [String], required: true },
    focusType: { type: String, required: true },
  })
);

const Speakers = mongoose.model(
  "Speakers",
  new Schema({
    url: { type: String, required: true },
    price: { type: Number, required: true },
    name: { type: String, required: true },

    configuration: { type: Number, required: true },
    frequencyResponse: { type: String, required: true },
    wattage: { type: Number, required: true },
    power: { type: Number, required: true },
    color: { type: String, required: true },
  })
);
export { Monitor, Keyboard, Mice, Headphones, Webcam, Speakers };
