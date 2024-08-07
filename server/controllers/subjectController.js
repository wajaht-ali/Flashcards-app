import SubjectModel from "../models/subjectModel.js";

//create subject
export const createSubjectController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(404).send({
        success: false,
        message: "Name is required!",
      });
    }
    const subject = await new SubjectModel({
      name: name,
    }).save();
    res.status(201).send({
      success: true,
      message: "Subject created sucessfully!",
      subject,
    });
  } catch (error) {
    console.log(`Error with create subject ${error}`);
    res.status(404).send({
      success: false,
      message: "Error with create subject",
      error,
    });
  }
};

//get all subjects 
export const getAllSubjectsController = async (req, res) => {
  try {
    const output = await SubjectModel.find();
    return res.status(201).send({
      success: true,
      message: "Subjects fetched sucessfully!",
      output,
    });
  } catch (error) {
    console.log(`Error with get all subjects ${error}`);
    res.status(404).send({
      success: false,
      message: "Error with get all subjects",
      error,
    });
  }
};

// get subject by id
export const getSubjectByIdController = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(400).send({
        success: false,
        message: "No subject ID provided",
      });
      return;
    }
    const subject = await SubjectModel.findById(id);
    return res.status(201).send({
      success: true,
      message: "Subject fetched sucessfully!",
      subject,
    });
  } catch (error) {
    console.log(`Error with get subject by id ${error}`);
    res.status(404).send({
      success: false,
      message: "Error with get subject by id",
      error,
    });
  }
};

//delete subject
export const deleteSubjectController = async (req, res) => {
  try {
    const id = req.params.id;
    const subject = await SubjectModel.findByIdAndDelete(id);
    return res.status(201).send({
      success: true,
      message: "Subject deleted sucessfully!",
      subject,
    });
  } catch (error) {
    console.log(`Error with delete subject ${error}`);
    res.status(404).send({
      success: false,
      message: "Error with delete subject",
      error,
    });
  }
};
