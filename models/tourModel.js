import mongoose from "mongoose";

const tourSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: [true, "A tour must have a name"],
    unique: true,
    trim: true,
    maxlength: [40, "A tour name must have less or equal then 40 characters"],
  },
  Tags: [
    {
      type: String,
    },
  ],
  Category: {
    type: String,
    required: [true, "A tour must have a category"],
    enum: {
      values: ["adventure", "nature", "culture", "food", "history"],
      message: "Category is either: adventure, nature, culture, food, history",
    },
  },
  Latitude: {
    type: Number,
  },
  Longitude: {
    type: Number,
  },
  Duration: {
    type: String,
    required: [true, "A tour must have a duration"],
  },
  Price: {
    type: Number,
    required: [true, "A tour must have a price"],
  },
  Rating: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Rating",
    },
  ],
  Desc: [{ type: String }],
  Image: [
    {
      type: String,
    },
  ],
});

tourSchema.pre("save", function (next) {
  // capitalize
  this.name.charAt(0).toUpperCase() + this.name.slice(1);
  next();
});

export default mongoose.model("Tour", tourSchema);
