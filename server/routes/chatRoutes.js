import express from "express";
import { chatController } from "../controllers/chatContoller.js";
import { requireSignedIn } from "../middlewares/userMiddleware.js";

const router = express.Router();

router.post("/",requireSignedIn, chatController);

export { router as chatRouter };
