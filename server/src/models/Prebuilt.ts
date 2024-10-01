import mongoose, { Schema } from "mongoose";

const Prebuilt = mongoose.model(
  "Prebuilt",
  new Schema({
    name: { type: String, required: true },
    type: { type: String, enum: ["amd", "intel"], required: true },

    components: {
      type: {
        gpu: { type: Schema.Types.ObjectId, ref: "GPU", required: true },
        cpu: { type: Schema.Types.ObjectId, ref: "CPU", required: true },
        motherboard: { type: Schema.Types.ObjectId, ref: "Motherboard", required: true },
        ram: { type: Schema.Types.ObjectId, ref: "RAM", required: true },
        storage: { type: Schema.Types.ObjectId, ref: "Storage", required: true },
        psu: { type: Schema.Types.ObjectId, ref: "PSU", required: true },
        case: { type: Schema.Types.ObjectId, ref: "Case", required: true },
        cpuCooler: { type: Schema.Types.ObjectId, ref: "CPUCooler" },
      },
      required: true,
    },
  })
);

export { Prebuilt };
