import CardModel from "../models/cardModel.js";

//create card
export const createCardController = async (req, res) => {
  try {
    const { title, status, content, subject, creator } = req.body;
    //validation
    if (!title || !status || !content || !subject || !creator) {
      return res.status(404).send({
        success: false,
        message: "All fields are required",
      });
    }
    //create card
    const card = await new CardModel({
      title,
      status,
      content,
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
    res.status(404).send({
      success: false,
      message: "Error with creating card",
      error,
    });
  }
};
//update card
export const updateCardController = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, status } = req.body;

    //validation
    if (!name || !description || !status) {
      return res.send({ message: "All the fields are required!" });
    }

    //existing card
    const card = await CardModel.findById(id);

    if (!card) {
      return res.status(404).send({
        success: false,
        message: "Card not found",
      });
    }

    const updatedCard = await CardModel.findByIdAndUpdate(
      id,
      {
        name: name || card.name,
        description: description || card.description,
        status: status || card.status,
      },
      { new: true }
    );

    res.status(201).send({
      success: true,
      message: "Card updated sucessfully!",
      updatedCard,
    });
  } catch (error) {
    console.log(`Error with update card ${error}`);
    res.status(404).send({
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
    res.status(404).send({
      success: false,
      message: "Error with delete card",
      error,
    });
  }
};
