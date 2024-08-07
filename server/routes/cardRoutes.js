import express from "express";
import {
  createCardController,
  deleteCardController,
  getAllCardsController,
  getSingleCardController,
  searchCardsController,
  updateCardController,
} from "../controllers/cardController.js";
const router = express.Router();

//create card
router.post("/create-card", createCardController);

//get all cards
router.get("/all-cards", getAllCardsController );

//get card by id
router.get("/get-single-card/:id", getSingleCardController);
//delete card
router.delete("/delete-card/:id", deleteCardController);

//update card
router.put("/update-card/:id", updateCardController);

//search cards 
router.get("/search/:keyword", searchCardsController);


export { router as cardRouter };
