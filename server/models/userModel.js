import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    gender: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    answer: {
      type: String,
      require: true,
    },
    role: {
      type: Boolean,
      require: true,
      default: 0,
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("users", UserSchema);

export default UserModel;
