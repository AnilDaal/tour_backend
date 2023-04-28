import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
  User: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  Tour: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tour",
  },
});

export default mongoose.model("Wishlist", wishlistSchema);
