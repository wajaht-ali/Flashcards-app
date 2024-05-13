import express from "express";
import {
  createUserController,
  deleteUserController,
  forgotPasswordController,
  loginUserController,
  updateUserController,
} from "../controllers/userControllers.js";
import { requireSignedIn, isAdmin } from "../middlewares/userMiddleware.js";
const router = express.Router();

//create user
router.post("/signup", createUserController);
//login user
router.post("/login", loginUserController);
//forgot password
router.put("/forgot-password", forgotPasswordController);
//update user
router.put("/update-user/:id", requireSignedIn, updateUserController);
//delete user
router.delete("/delete-user/:id", deleteUserController);

export { router as userRouter };
