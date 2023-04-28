import mongoose from "mongoose";

const citySchema = new mongoose.Schema({
  Name: {
    type: String,
    required: [true, "A city must have a name"],
    unique: true,
    trim: true,
    maxlength: [40, "A city name must have less or equal then 40 characters"],
  },
  Adventures: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Adventure",
    },
  ],
  Desc: {
    type: String,
  },
  Image: {
    type: String,
  },
});

export default mongoose.model("City", citySchema);
