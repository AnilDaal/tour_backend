import Review from "../models/reviewModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

export const getReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.find();
  res.status(200).json({
    status: "success",
    results: reviews.length,
    data: {
      reviews,
    },
  });
});

export const getReview = catchAsync(async (req, res, next) => {
  const review = await Review.findById(req.params.id);
  if (!review) {
    return next(new AppError("No review found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      review,
    },
  });
});

export const createReview = catchAsync(async (req, res, next) => {
  const newReview = await Review.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      review: newReview,
    },
  });
});

export const updateReview = catchAsync(async (req, res, next) => {
  const { Name, Tour } = req.body;
  if (!req.params.id) {
    return next(new AppError("Please Enter Review ID", 404));
  }
  const review = await Review.findByIdAndUpdate(
    req.params.id,
    { Name, Tour },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!review) {
    return next(new AppError("No review found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      review,
    },
  });
});

export const deleteReview = catchAsync(async (req, res, next) => {
  if (!req.params.id) {
    return next(new AppError("Please Enter Review ID", 404));
  }
  const review = await Review.findByIdAndDelete(req.params.id);
  if (!review) {
    return next(new AppError("No review found with that ID", 404));
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
});

// Path: routes\reviewRoutes.js
