import User from "../models/userModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

export const getUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      users,
    },
  });
});

export const getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new AppError("No user found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

export const createUser = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      user: newUser,
    },
  });
});

export const updateUser = catchAsync(async (req, res, next) => {
  const { Name, Email, Password } = req.body;
  if (!req.params.id) {
    return next(new AppError("Please Enter User ID", 404));
  }
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { Name, Email, Password },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!user) {
    return next(new AppError("No user found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

export const deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    return next(new AppError("No user found with that ID", 404));
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
});

export const login = catchAsync(async (req, res, next) => {
  const { Email, Password } = req.body;
  if (!Email || !Password) {
    return next(new AppError("Please provide email and password!", 400));
  }

  const userData = await User.findOne({ Email }).select("+Password");
  if (
    !userData ||
    !(await userData.correctPassword(Password, userData.Password))
  ) {
    return next(new AppError("Incorrect email or password", 401));
  }
  res.status(200).json({
    status: "success",
    data: {
      userData,
    },
  });
});

export const logout = catchAsync(async (req, res, next) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({
    status: "success",
  });
});
