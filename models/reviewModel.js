import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  Review: {
    type: String,
    required: [true, "A review must have a review"],
  },
  Rating: {
    type: Number,
    required: [true, "A review must have a rating"],
  },
  Tour: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tour",
  },
  User: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

export default mongoose.model("Review", reviewSchema);
