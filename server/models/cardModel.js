import mongoose from "mongoose";

const CardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    status: {
      type: String,
      require: true,
      default: "public",
    },
    content: {
      type: String,
      require: true,
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      require: true,
    },
    subject: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const CardModel = mongoose.model("cards", CardSchema);

export default CardModel;
