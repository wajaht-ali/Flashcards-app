import express from 'express';
import { createCardController } from '../controllers/cardController.js';
const router = express.Router();

router.post("/create-card", createCardController);

export {router as cardRouter};