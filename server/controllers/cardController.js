import CardModel from "../models/cardModel.js";

//create card
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
//update card
export const updateCardController = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, description, status } = req.body;
    //validation
    if (!name || !description || !status) {
      return res.send({ message: "All the fields are required!" });
    }
    const card = await CardModel.findByIdAndUpdate(id, {
      name,
      description,
      status,
    });

    if (!card) {
      return res.send({ message: "Error with updating card!" });
    }
    res.status(201).send({
      success: true,
      message: "Card updated sucessfully!",
      card,
    });
  } catch (error) {
    console.log(`Error with update card ${error}`);
    res.status(400).send({
      success: false,
      message: "Error with updating card",
      error,
    });
  }
};
//delete card
export const deleteCardController = async (req, res) => {
  try {
    const id = req.params.id;
    const card = await CardModel.findByIdAndDelete(id);
    res.status(201).send({
      success: true,
      message: "Card deleted sucessfully!",
      card,
    });
  } catch (error) {
    console.log(`Error with delete card ${error}`);
    res.status(400).send({
      success: false,
      message: "Error with delete card",
      error,
    });
  }
};
