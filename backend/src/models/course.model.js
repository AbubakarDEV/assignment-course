import mongoose from "mongoose";
const courseSchema = new mongoose.Schema({
  // userId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User",
  //   required: true,
  // },
  // plantId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "plants",
  //   required: true,
  // },
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    trim: true,
  },
  contentType: {
    type: String,
    required: true,
  },
});

const Courses = mongoose.model("Course", courseSchema);

export default Courses;
