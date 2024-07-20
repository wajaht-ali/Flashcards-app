import express from "express";
import {
  createSubjectController,
  deleteSubjectController,
  getAllSubjectsController,
  getSubjectByIdController,
} from "../controllers/subjectController.js";

const router = express.Router();

//create subject
router.post("/create-subject", createSubjectController);

// get all subjects
router.get("/get-all-subjects", getAllSubjectsController);

//get subject by id
router.get("/get-subject/:id", getSubjectByIdController);

//delete subject
router.delete("/delete-subject/:id", deleteSubjectController);

export { router as subjectRouter };
