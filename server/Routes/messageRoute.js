import express from "express";
import { createMessage, getMessage } from "../Controller/messageController.js";

export const messageRoute = express.Router();

messageRoute.post("/", createMessage);
messageRoute.get("/:chatId", getMessage)
