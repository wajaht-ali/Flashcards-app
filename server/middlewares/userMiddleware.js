import jwt from "jsonwebtoken";
import UserModel from "../models/userModel.js";

export const requireSignedIn = async (req, res, next) => {
  try {
    // const token = req.header("Authorization").replace("Bearer ", "");
    const token = await req.headers.authorization;
    // console.log("req.headers: ", req.headers);
    if (!token) {
      return res.status(400).send({
        success: false,
        message: "Token is required",
      });
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decode;
    await next();
  } catch (error) {
    console.log(`Error with signin middleware ${error}`);
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const id = req.user._id;
    const user = await UserModel.findById(id);
    if (user.role === 1) {
      next();
    } else {
      return res.status(400).send({
        success: false,
        message: "Unauthorized access",
      });
    }
  } catch (error) {
    console.log(`Error with admin middleware ${error}`);
  }
};
