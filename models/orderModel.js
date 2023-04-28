import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  User: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  PurchaseDate: {
    type: Date,
    required: [true, "An order must have a purchase date"],
  },
  Tour: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tour",
  },
  Quantity: {
    type: Number,
    required: [true, "An order must have a quantity"],
  },
  TotalPrice: {
    type: Number,
    required: [true, "An order must have a total price"],
  },
  Status: {
    type: String,
    required: [true, "An order must have a status"],
    enum: {
      values: ["pending", "paid", "cancelled"],
      message: "Status is either: pending, paid, cancelled",
    },
  },
});

export default mongoose.model("Order", orderSchema);
