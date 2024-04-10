import express from "express";
import {
  createUserController,
  loginUserController,
  updateUserController,
} from "../controllers/userControllers.js";
import { requireSignedIn, isAdmin } from "../middlewares/userMiddleware.js";
const router = express.Router();

router.post("/signup", createUserController);
router.post("/login", loginUserController);
router.put("/update-user/:id", requireSignedIn, updateUserController);

export { router as userRouter };
