import City from "../models/cityModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

export const getCities = catchAsync(async (req, res, next) => {
  const cities = await City.find();
  res.status(200).json({
    status: "success",
    results: cities.length,
    data: {
      cities,
    },
  });
});

export const getCity = catchAsync(async (req, res, next) => {
  const city = await City.findById(req.params.id);
  if (!city) {
    return next(new AppError("No city found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      city,
    },
  });
});

export const createCity = catchAsync(async (req, res, next) => {
  const { Adventures, Name, Desc } = req.body;
  if (!Name || !Desc) {
    return next(new AppError("Please Enter All Fields", 401));
  }
  const newCity = await City.create({
    Adventures,
    Name,
    Desc,
    Image: req.files.Image[0].filename,
  });
  res.status(201).json({
    status: "success",
    data: {
      city: newCity,
    },
  });
});

export const updateCity = catchAsync(async (req, res, next) => {
  const { Name, Adventures } = req.body;
  if (!req.params.id) {
    return next(new AppError("Please Enter City ID", 404));
  }
  const city = await City.findByIdAndUpdate(
    req.params.id,
    { Name, Adventures },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!city) {
    return next(new AppError("No city found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      city,
    },
  });
});

export const deleteCity = catchAsync(async (req, res, next) => {
  if (!req.params.id) {
    return next(new AppError("Please Enter City ID", 404));
  }
  const city = await City.findByIdAndDelete(req.params.id);
  if (!city) {
    return next(new AppError("No city found with that ID", 404));
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
});

// Compare this snippet from routes\wishlistRoutes.js:
