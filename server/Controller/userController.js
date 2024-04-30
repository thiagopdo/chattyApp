import { userModel } from "../Models/userModel.js";
import validator from "validator";
import * as bcrypt from "bcrypt";
import pkg from "jsonwebtoken";

const { Jwt } = pkg;

const createToken = (_id) => {
  const jwtKey = process.env.JWT_SECRET_KEY;

  return pkg.sign({ _id }, jwtKey, { expiresIn: "3d" });
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await userModel.findOne({ email });

    //if user exists return msg
    if (user) return res.status(400).json("User already exists");
    if (!name || !email || !password)
      return res.status(400).json("All fields required");

    if (!validator.isEmail(email))
      return res.status(400).json("Must be a valid email");

    if (!validator.isStrongPassword(password))
      return res.status(400).json("Must be a correct password");

    //if no previous user, create new obj user
    user = new userModel({ name, email, password });

    //hasshing the password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    //create token
    const token = createToken(user._id);
    //sends data to client
    res.status(200).json({ _id: user._id, name, email, token });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export async function loginUser(req, res) {
  const { email, password } = req.body;

  try {
    let user = await userModel.findOne({ email });

    if (!user) return res.status(400).json("Invalid email or password...");

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword)
      return res.status(400).json("Invalid email or password...");

    const token = createToken(user._id);
    //sends data to client
    res.status(200).json({ _id: user._id, name: user.name, email, token });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

/**
 * get user with req.params.userId
 * @param {*} req
 * @param {*} res
 */

export async function findUser(req, res) {
  const userId = req.params.userId;

  try {
    const user = await userModel.findById(userId);

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

export async function getUsers(req, res) {
  try {
    const users = await userModel.find();

    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}
