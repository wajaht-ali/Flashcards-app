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
      expiresIn: "7d",
    });

    res.status(201).send({
      success: true,
      message: "Login sucessfully!",
      user: {
        name: user.name,
        id: user._id,
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

//forgot password
export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    //validation
    if (!email) {
      return res.status(400).send({
        success: false,
        message: "Please provide email address",
      });
    }
    if (!answer) {
      return res.status(400).send({
        success: false,
        message: "Please provide valid answer",
      });
    }
    if (!newPassword) {
      return res.status(400).send({
        success: false,
        message: "Please provide new password",
      });
    }

    //existing user
    const user = await UserModel.findOne({ email, answer });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or answer",
      });
    }

    const hashed = await hashedPasswordFtn(newPassword);
    await UserModel.findByIdAndUpdate(
      user._id,
      {
        password: hashed,
      },
      { new: true }
    );
    res.status(201).send({
      success: true,
      message: "Password updated successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error with forgot password controller",
    });
  }
};

//update user
export const updateUserController = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, gender, answer, password } = req.body;

    //validation
    // if (!name || !email || !password || !gender || !answer) {
    //   return res
    //     .status(400)
    //     .send({ message: "Please provide all required fields." });
    // }
    const user = await UserModel.findById(id);
    const hashedPassword = await hashedPasswordFtn(password);
    const updateUser = await UserModel.findByIdAndUpdate(
      id,
      {
        name: name || user.name,
        email: email || user.email,
        answer: answer || user.answer,
        gender: gender || user.gender,
        password: hashedPassword || user.password,
      },
      { new: true }
    );
    if (!updateUser) {
      return res.status(404).send({ message: "User not found." });
    }
    
    res.status(201).send({
      success: true,
      message: "User updated sucessfully!",
      updateUser,
    });
  } catch (error) {
    console.log(`Error with update user ${error}`);
  }
};

//delete User
export const deleteUserController = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await UserModel.findByIdAndDelete(id);
    return res.status(201).send({
      success: true,
      message: "User deleted sucessfully!",
      user,
    });
  } catch (error) {
    console.log(`Error with delete card ${error}`);
    res.status(400).send({
      success: false,
      message: "Error with delete card",
      error,
    });
  }
};

//get all users
export const getUsersController = async (req, res) => {
  try {
    const users = await UserModel.find().select("-password -updatedAt");
    if (users) {
      res.status(200).send({
        success: true,
        message: "All users fetched successfully!",
        users,
      });
    } else {
      res.status(404).send({
        success: false,
        message: "No users found!",
      });
    }
  } catch (error) {
    console.log(`Errro with sending users data ${error}`);
    res.status(400).send({
      success: false,
      message: "Error with sending users data",
      error,
    });
  }
};

// get user by id
export const getUserByIdController = async (req, res) => {
  try {
    console.log(req.params); // Log the request parameters to see what's being passed
    const id = req.params._id;
    if (!id) {
      res.status(400).send({
        success: false,
        message: "No user ID provided",
      });
      return;
    }
    const user = await UserModel.findById(id);
    if (user) {
      res.status(200).send({
        success: true,
        message: "User fetched successfully!",
        user,
      });
    } else {
      res.status(404).send({
        success: false,
        message: "No user found",
      });
    }
  } catch (error) {
    console.log(`Error with fetching user by id ${error}`);
    res.status(400).send({
      success: false,
      message: "Error with fetching user by id",
      error,
    });
  }
}
