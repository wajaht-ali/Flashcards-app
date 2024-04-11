import express from "express";
import {
  createSubjectController,
  deleteSubjectController,
} from "../controllers/subjectController.js";

const router = express.Router();

//create subject
router.post("/create-subject", createSubjectController);
//delete subject
router.delete("/delete-subject/:id", deleteSubjectController);

export { router as subjectRouter };
