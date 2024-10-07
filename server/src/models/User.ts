import mongoose, { Schema } from "mongoose";

export default mongoose.model(
  "User",
  new Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },

    build: {
      type: {
        gpu: { type: [Schema.Types.ObjectId], ref: "GPU" },
        cpu: { type: Schema.Types.ObjectId, ref: "CPU" },
        motherboard: {
          type: Schema.Types.ObjectId,
          ref: "Motherboard",
        },
        ram: { type: [Schema.Types.ObjectId], ref: "RAM" },
        storage: {
          type: [Schema.Types.ObjectId],
          ref: "Storage",
        },
        psu: { type: Schema.Types.ObjectId, ref: "PSU" },
        case: { type: Schema.Types.ObjectId, ref: "Case" },
        cpuCooler: {
          type: Schema.Types.ObjectId,
          ref: "CPUCooler",
        },
        fans: { type: [Schema.Types.ObjectId], ref: "Fans" },
        os: { type: Schema.Types.ObjectId, ref: "OS" },
      },
      required: true,
    },
  })
);
