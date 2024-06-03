import { GoogleGenerativeAI } from "@google/generative-ai";
import { PromptModel } from "../models/promptsModel.js";

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
