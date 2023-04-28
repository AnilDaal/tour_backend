import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import User from "../models/userModel.js";
import Admin from "../models/adminModel.js";
import jwt from "jsonwebtoken";
import { promisify } from "util";

export const authUser = catchAsync(async (req, res, next) => {
  if (
    !req.headers ||
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer")
  ) {
    return next(new AppError("user dont have any token or headers", 401));
  }
  const token = req.headers.authorization.split(" ")[1];
  if (token) {
    let tokenData = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    let freshData;
    if (tokenData.Role === "Admin") {
      freshData = await Admin.findById(tokenData.id);
      if (!freshData) {
        return next(
          new AppError(
            "The `${tokenData.Role}` belonging to this token does no longer exist",
            401
          )
        );
      }
    } else if (tokenData.Role === "User") {
      freshData = await User.findById(tokenData.id);
      if (!freshData) {
        return next(
          new AppError(
            "The `${tokenData.Role}` belonging to this token does no longer exist",
            401
          )
        );
      }
    } else {
      return next(new AppError("Please add user role in User Data", 400));
    }
    if (freshData.changedPasswordAfter(tokenData.iat)) {
      return next(
        new AppError(`${freshData.Role} recently changed password`, 401)()
      );
    }
    req.user = freshData;
  }
  next();
});

export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.Role)) {
      return next(
        new AppError("You do not have permission to perform this action ", 403)
      );
    }
    next();
  };
};
