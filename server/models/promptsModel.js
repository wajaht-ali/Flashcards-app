import mongoose from "mongoose";

const PromptSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    prompt: {
      type: String,
      require: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

export const PromptModel = mongoose.model("prompts", PromptSchema);
