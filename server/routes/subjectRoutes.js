import express from "express";
import {
  createSubjectController,
  deleteSubjectController,
  getAllSubjectsController,
} from "../controllers/subjectController.js";

const router = express.Router();

//create subject
router.post("/create-subject", createSubjectController);

// get all subjects
router.get("/get-all-subjects", getAllSubjectsController);
//delete subject
router.delete("/delete-subject/:id", deleteSubjectController);

export { router as subjectRouter };
