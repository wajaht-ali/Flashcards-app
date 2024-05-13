import express from "express";
import {
  createCardController,
  deleteCardController,
  updateCardController,
} from "../controllers/cardController.js";
const router = express.Router();

//create card
router.post("/create-card", createCardController);

//delete card
router.delete("/delete-card/:id", deleteCardController);

//update card
router.put("/update-card/:id", updateCardController);
export { router as cardRouter };
