import CardModel from "../models/cardModel.js";

export const createCardController = async (req, res) => {
  try {
    const { name, status, description, subject, creator } = req.body;
    //validation
    if (!name || !status || !description || !subject || !creator) {
      return res.status(400).send({
        success: false,
        message: "All fields are required",
      });
    }
    //create card
    const card = await new CardModel({
      name,
      status,
      description,
      subject,
      creator,
    }).save();

    res.status(201).send({
      success: true,
      message: "Card created sucessfully!",
      card,
    });
  } catch (error) {
    console.log(`Error with create card ${error}`);
    res.status(400).send({
      success: false,
      message: "Error with creating card",
      error,
    });
  }
};
