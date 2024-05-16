import mongoose, { Schema } from "mongoose";

export default mongoose.model(
  "User",
  new Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
  })
);
