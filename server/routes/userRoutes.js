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

//user Auth
router.post("/user-Auth", requireSignedIn, (req, res) => {
  res.status(201).send({ ok: true });
});

//admin auth
router.post("/admin-auth", requireSignedIn, isAdmin, (req, res) => {
  res.status(201).send({ ok: true });
});
export { router as userRouter };
