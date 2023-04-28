import Adventure from "../models/adventureModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

export const getAdventures = catchAsync(async (req, res, next) => {
  const adventures = await Adventure.find();
  res.status(200).json({
    status: "success",
    results: adventures.length,
    data: {
      adventures,
    },
  });
});

export const getAdventure = catchAsync(async (req, res, next) => {
  const adventure = await Adventure.findById(req.params.id);
  if (!adventure) {
    return next(new AppError("No adventure found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      adventure,
    },
  });
});

export const createAdventure = catchAsync(async (req, res, next) => {
  const newAdventure = await Adventure.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      adventure: newAdventure,
    },
  });
});

export const updateAdventure = catchAsync(async (req, res, next) => {
  const { Name, Tour } = req.body;
  if (!req.params.id) {
    return next(new AppError("Please Enter Adventure ID", 404));
  }
  const adventure = await Adventure.findByIdAndUpdate(
    req.params.id,
    { Name, Tour },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!adventure) {
    return next(new AppError("No adventure found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      adventure,
    },
  });
});

export const deleteAdventure = catchAsync(async (req, res, next) => {
  if (!req.params.id) {
    return next(new AppError("Please Enter Adventure ID", 404));
  }
  const adventure = await Adventure.findByIdAndDelete(req.params.id);
  if (!adventure) {
    return next(new AppError("No adventure found with that ID", 404));
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
});

// Compare this snippet from routes\adventureRoutes.js:
