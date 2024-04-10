import mongoose from "mongoose";

const CardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    status: {
      type: String,
      require: true,
      default: "private",
    },
    description: {
      type: String,
      require: true,
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      require: true,
    },
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "subjects",
    },
  },
  { timestamps: true }
);

const CardModel = mongoose.model("cards", CardSchema);

export default CardModel;
