import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import { userRoute } from "./Routes/userRoute.js";
import { chatRoute } from "./Routes/chatRoute.js";
import { messageRoute } from "./Routes/messageRoute.js";

const app = express();

//middlewares
app.use(express.json());
app.use(cors());
app.use("/api/users", userRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);

app.get("/", (req, res) => {
  res.send("Welcome our chat API");
});

const PORT = process.env.PORT || 5000;
const URI = process.env.ATLAS_URI;

app.listen(PORT, (req, res) => {
  console.log(`Server running on  PORT: ${PORT}`);
});

mongoose
  .connect(URI)
  .then(() => {
    console.log("✅✅DB connection successful.");
  })
  .catch((err) => {
    console.log(`🚨🚨DB connection error:${err}`);
  });
