import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const adminSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: [true, "A admin must have a name"],
    trim: true,
    maxlength: [40, "A admin name must have less or equal then 40 characters"],
  },
  Email: {
    type: String,
    required: [true, "A admin must have an email"],
    validate: [validator.isEmail, "Please provide a valid email"],
    unique: true,
    trim: true,
    maxlength: [40, "A admin email must have less or equal then 40 characters"],
  },
  Password: {
    type: String,
    required: [true, "A admin must have a password"],
    trim: true,
    maxlength: [
      40,
      "A admin password must have less or equal then 40 characters",
    ],
    select: false,
  },
  PasswordConfirm: {
    type: String,
    required: [true, "A admin must have a password confirmation"],
    trim: true,
    maxlength: [
      40,
      "A admin password confirmation must have less or equal then 40 characters",
    ],
  },
  Role: {
    type: String,
    default: "Admin",
  },
  PasswordChangedAt: Date,
  PasswordResetToken: String,
  PasswordResetExpires: Date,
});

adminSchema.pre("save", async function (next) {
  if (!this.isModified) {
    return next();
  }
  const salt = await bcrypt.genSalt(12);
  this.Password = await bcrypt.hash(this.Password, salt);
  this.PasswordConfirm = undefined;
  next();
});

adminSchema.pre("save", async function (next) {
  if (!this.isModified || this.isNew) {
    return next();
  }

  this.PasswordChangedAt = Date.now() - 1000;
  next();
});

adminSchema.methods.correctPassword = async function (
  currentPassword,
  userPassword
) {
  return await bcrypt.compare(currentPassword, userPassword);
};

adminSchema.methods.changedPasswordAfter = function (tokenExpireTime) {
  if (this.PasswordChangedAt) {
    const passwordChangedTime = parseInt(
      this.PasswordChangedAt.getTime() / 1000,
      10
    );
    return tokenExpireTime < passwordChangedTime;
  }
  return false;
};

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
