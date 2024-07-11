import mongoose from "mongoose";

const SubjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      default: "Computer Science",
    },
  },
  { timestamps: true }
);

const SubjectModel = mongoose.model("subjects", SubjectSchema);

export default SubjectModel;
