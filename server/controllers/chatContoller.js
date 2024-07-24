import { GoogleGenerativeAI } from "@google/generative-ai";
import { PromptModel } from "../models/promptsModel.js";

//genrate a text
export const chatController = async (req, res) => {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const prompt = req.body.prompt;
    const id = req.user._id;
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    //saving to the database
    const save = new PromptModel({
      title: prompt,
      prompt: text,
      user: id,
    }).save();

    return res.status(201).send({ success: true, text: text });
  } catch (error) {
    console.log(`Error with ask ${error}`);
    res.status(404).send({
      success: false,
      message: "Error with ask controller",
      error,
    });
  }
};

// get single prompt by id
export const getSinglePromptController = async (req, res) => {
  try {
    const { id } = req.params;
    const output = await PromptModel.findById(id);
    if (output) {
      return res.status(201).send({
        success: true,
        message: "Prompt fetched successfully",
        output,
      });
    } else {
      return res.status(404).send({
        success: false,
        message: "Error with fetching prompt",
      });
    }
  } catch (error) {
    console.log(`Error with finding prompt: ${error}`);
    res.status(404).send({
      success: false,
      message: "Error with fetching prompt",
    });
  }
};

//get all chats
export const getPromptsController = async (req, res) => {
  try {
    const output = await PromptModel.find().select("_id title createdAt updatedAt");
    if(output) {
      res.status(201).send({
        success: true,
        message: "Data fetched successfully!",
        output
      })
    } else {
      return res.status(404).send({
        success: false,
        message: "Error with fetching prompts",
      })
    }
  } catch (error) {
    console.log(`Error with finding prompts: ${error}`);
    res.status(404).send({
      success: false,
      message: "Error with fetching prompts",
    })
  }
}

//delete the text
export const deleteChaController = async (req, res) => {
  try {
    const { id } = req.params;
    const chat = await PromptModel.findByIdAndDelete(id);
    if (chat) {
      return res.status(200).send({
        success: true,
        message: "Chat deleted successfully",
      });
    }
  } catch (error) {
    console.log(`Error with chat delete controller ${error}`);
    res.status(404).send({
      success: false,
      message: "Error with chat delete controller",
      error,
    });
  }
};