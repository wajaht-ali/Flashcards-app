import express from "express";
import {
  createUserController,
  deleteUserController,
  forgotPasswordController,
  getUserByIdController,
  getUsersController,
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
router.delete("/delete-user/:id",requireSignedIn, isAdmin, deleteUserController);

//user Auth
router.get("/user-Auth", requireSignedIn, (req, res) => {
  res.status(201).send({ ok: true });
});

//admin auth
router.get("/admin-auth", requireSignedIn, isAdmin, (req, res) => {
  res.status(201).send({ ok: true });
});

//get all users
router.get("/get-all-users", getUsersController);

// get user by id
router.get("/get-user/:id", requireSignedIn, getUserByIdController);

export { router as userRouter };
