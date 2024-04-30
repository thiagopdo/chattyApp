import express from "express";
import {
  createChat,
  findUserChats,
  findChat,
} from "../Controller/chatController.js";

export const chatRoute = express.Router();

chatRoute.post("/", createChat);
chatRoute.get("/:userId", findUserChats);
chatRoute.get("/find/:firstId/:secondId", findChat);
