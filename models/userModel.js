import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: [true, "A user must have a name"],
    unique: true,
    trim: true,
    maxlength: [40, "A user name must have less or equal then 40 characters"],
  },
  Email: {
    type: String,
    required: [true, "A user must have an email"],
    validate: [validator.isEmail, "Please provide a valid email"],
    unique: true,
    trim: true,
    maxlength: [40, "A user email must have less or equal then 40 characters"],
  },
  Phone: {
    type: String,
    unique: true,
    trim: true,
    maxlength: [
      40,
      "A user phone number must have less or equal then 40 characters",
    ],
  },
  Password: {
    type: String,
    required: [true, "A user must have a password"],
    trim: true,
    maxlength: [
      40,
      "A user password must have less or equal then 40 characters",
    ],
    select: false,
  },
  PasswordConfirm: {
    type: String,
    required: [true, "A user must have a password confirmation"],
    trim: true,
    maxlength: [
      40,
      "A user password confirmation must have less or equal then 40 characters",
    ],
  },
  PasswordChangedAt: Date,
  PasswordResetToken: String,
  PasswordResetExpires: Date,
  Active: {
    type: Boolean,
    default: true,
    select: false,
  },
  Wishlist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Wishlist",
  },
  Order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
  },
  Latitude: {
    type: Number,
  },
  Longitude: {
    type: Number,
  },
  Role: {
    type: String,
    default: "User",
  },
});

userSchema.pre("save", async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified("Password")) return next();

  // Hash the password with cost of 12
  this.Password = await bcrypt.hash(this.Password, 12);

  // Delete passwordConfirm field
  this.PasswordConfirm = undefined;
  next();
});

userSchema.pre("save", function (next) {
  if (!this.isModified("Password") || this.isNew) return next();

  this.PasswordChangedAt = Date.now() - 1000;
  next();
});

userSchema.pre(/^find/, function (next) {
  // this points to the current query
  this.find({ Active: { $ne: false } });
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.PasswordChangedAt) {
    const changedTimestamp = parseInt(
      this.PasswordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }

  // False means NOT changed
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.PasswordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.PasswordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

export default mongoose.model("User", userSchema);
