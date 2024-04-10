import mongoose from "mongoose";

const SubjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      default: "CS",
    },
  },
  { timestamps: true }
);

const SubjectModel = mongoose.model("subjects", SubjectSchema);

export default SubjectModel;
