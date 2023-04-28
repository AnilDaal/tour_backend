import mongoose from "mongoose";

const adventureSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: [true, "An adventure must have a name"],
    unique: true,
    trim: true,
    maxlength: [
      40,
      "An adventure name must have less or equal then 40 characters",
    ],
  },
  Tour: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tour",
    },
  ],
  Image: {
    type: String,
  },
});

export default mongoose.model("Adventure", adventureSchema);
