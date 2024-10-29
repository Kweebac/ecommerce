import mongoose from "mongoose";
import dotenv from "dotenv";
if (process.env.NODE_ENV !== "production") dotenv.config();

// @ts-expect-error
mongoose.connect(process.env.MONGO_URL);
mongoose.connection.on("error", console.error.bind(console, "Mongo connection error"));
