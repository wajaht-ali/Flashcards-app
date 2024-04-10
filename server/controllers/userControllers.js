import UserModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { comparePassword, hashedPasswordFtn } from "../helpers/helpers.js";

//create user
export const createUserController = async (req, res) => {
  try {
    const { name, email, password, answer, gender } = req.body;
    //validation
    switch (true) {
      case !name:
        return res.status(400).send({ message: "User name is required!" });
      case !email:
        return res.status(400).send({ message: "User email is required!" });
      case !password:
        return res.status(400).send({ message: "User password is required!" });
      case !gender:
        return res.status(400).send({ message: "User gender is required!" });
      case !answer:
        return res.status(400).send({ message: "Answer field is required!" });
    }

    //user already register
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(201).send({
        success: false,
        message: "User already registered, please login!",
      });
    }

    //password hashing
    const hashedPassword = await hashedPasswordFtn(password);
    const user = await new UserModel({
      name,
      email,
      gender,
      answer,
      password: hashedPassword,
    }).save();

    res.status(200).send({
      success: true,
      message: "User register sucessfully!",
      user,
    });
  } catch (error) {
    console.log(`Error with create user ${error}`);
    res.status(400).send({
      success: false,
      message: "Error with create user",
      error,
    });
  }
};
//login user
export const loginUserController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email) {
      return res.status(400).send({ message: "Email is required!" });
    }
    if (!password) {
      return res.status(400).send({ message: "Password is required!" });
    }
    //user
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email not registered, please signup!",
      });
    }

    const comparedPassword = await comparePassword(password, user.password);
    if (!comparedPassword) {
      return res
        .status(200)
        .send({ success: false, message: "Incorrect Password!" });
    }

    //token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "5d",
    });

    res.status(201).send({
      success: true,
      message: "Login sucessfully!",
      user: {
        name: user.name,
        email: user.email,
        gender: user.gender,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(`Error with login user ${error}`);
    res.status(400).send({
      success: false,
      message: "Error with login user",
      error,
    });
  }
};
//update user
export const updateUserController = async (req, res) => {
  try {
    const { id } = req.param;
    const { name, email, gender, answer, password } = req.body;

    //validation
    if (!name || !email || !password || !gender || !answer) {
      return res
        .status(400)
        .send({ message: "Please provide all required fields." });
    }
    const hashedPassword = await hashedPasswordFtn(password);
    const updateUser = await UserModel.findByIdAndUpdate(
      id,
      { name, email, answer, gender, password: hashedPassword },
      { new: true }
    );
    if (!updateUser) {
      return res.status(404).send({ message: "User not found." });
    }
    // await updateUser.save();
    res.status(201).send({
      success: true,
      message: "User updated sucessfully!",
      updateUser,
    });
  } catch (error) {
    console.log(`Error with update user ${error}`);
  }
};
