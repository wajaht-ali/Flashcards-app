import express from "express";
import {
  chatController,
  deleteChaController,
} from "../controllers/chatContoller.js";
import { requireSignedIn } from "../middlewares/userMiddleware.js";

const router = express.Router();

//generate a prompt
router.post("/", requireSignedIn, chatController);

//delete the prompt
router.delete("/delete-chat/:id", deleteChaController);
export { router as chatRouter };
