import pkg from "express";
import {
  registerUser,
  loginUser,
  findUser,
  getUsers,
} from "../Controller/userController.js";
const { Express } = pkg;

export const userRoute = pkg.Router();

userRoute.post("/register", registerUser);
userRoute.post("/login", loginUser);
userRoute.get("/find/:userId", findUser);
userRoute.get("/", getUsers);
