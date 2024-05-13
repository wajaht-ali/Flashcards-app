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
