import express from "express";
import {
  createCardController,
  deleteCardController,
  getAllCardsController,
  updateCardController,
} from "../controllers/cardController.js";
const router = express.Router();

//create card
router.post("/create-card", createCardController);

//get all cards
router.get("/all-cards", getAllCardsController );

//delete card
router.delete("/delete-card/:id", deleteCardController);

//update card
router.put("/update-card/:id", updateCardController);
export { router as cardRouter };
