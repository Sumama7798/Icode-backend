import mongoose from "mongoose";

const cardSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    default: "",
  },
  blog: {
    type: String,
    content: String,
    default: "",
  },
  header: {
    type: String,
    default: "",
  },
  footer: {
    type: String,
    default: "",
  },
  page: {
    type: String,
    required: true,
  },
  section: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Card", cardSchema);
