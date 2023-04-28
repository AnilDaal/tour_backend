import Admin from "../models/adminModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import jwt from "jsonwebtoken";

const signupAdmin = catchAsync(async (req, res, next) => {
  const { Email, Password, Name, PasswordConfirm } = req.body;
  const adminData = await Admin.create({
    Email,
    Password,
    Name,
    PasswordConfirm,
  });
  const token = jwt.sign(
    { id: adminData._id, Role: adminData.Role },
    process.env.JWT_SECRET,
    {
      expiresIn: "2h",
    }
  );
  console.log(adminData);
  res.status(201).json({
    status: "success",
    token,
  });
});

const loginAdmin = catchAsync(async (req, res, next) => {
  const { Email, Password } = req.body;
  if (!Email || !Password) {
    return next(new AppError("Please provide Email and Password", 400));
  }
  const adminData = await Admin.findOne({ Email }).select("+Password");
  console.log(adminData);
  if (
    !adminData ||
    !(await adminData.correctPassword(Password, adminData.Password))
  ) {
    return next(new AppError("Incorrect Email or Password", 401));
  }
  const token = jwt.sign(
    { id: adminData._id, Role: "Admin" },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
  res.status(200).json({
    status: "success",
    token,
    data: {
      adminData,
    },
  });
});

export { loginAdmin, signupAdmin };
