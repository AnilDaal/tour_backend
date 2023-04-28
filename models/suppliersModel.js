import mongoose from "mongoose";

const supplierSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: [true, "A supplier must have a name"],
    unique: true,
    trim: true,
    maxlength: [
      40,
      "A supplier name must have less or equal then 40 characters",
    ],
  },
  Email: {
    type: String,
    required: [true, "A supplier must have an email"],
    unique: true,
    trim: true,
    maxlength: [
      40,
      "A supplier email must have less or equal then 40 characters",
    ],
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  Phone: {
    type: String,
    unique: true,
    trim: true,
    maxlength: [
      40,
      "A supplier phone number must have less or equal then 40 characters",
    ],
  },
  ServiceName: {
    type: String,
    required: [true, "A supplier must have a service name"],
    unique: true,
  },
  Address: {
    type: String,
    required: [true, "A supplier must have an address"],
  },
  VerificationDocs: {
    type: String,
    required: [true, "A supplier must have a verification document"],
  },
});

export default mongoose.model("Supplier", supplierSchema);
