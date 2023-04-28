import Wishlist from "../models/wishlistModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

export const getWishlist = catchAsync(async (req, res, next) => {
  const wishlist = await Wishlist.find();
  res.status(200).json({
    status: "success",
    results: wishlist.length,
    data: {
      wishlist,
    },
  });
});

export const createWishlist = catchAsync(async (req, res, next) => {
  const wishlist = await Wishlist.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      wishlist,
    },
  });
});

export const updateWishlist = catchAsync(async (req, res, next) => {
  const { Tour } = req.body;
  const wishlist = await Wishlist.findByIdAndUpdate(
    req.params.id,
    { Tour },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!wishlist) {
    return next(new AppError("No wishlist found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      wishlist,
    },
  });
});

export const deleteWishlist = catchAsync(async (req, res, next) => {
  const wishlist = await Wishlist.findByIdAndDelete(req.params.id);
  if (!wishlist) {
    return next(new AppError("No wishlist found with that ID", 404));
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
});

export const getWishlists = catchAsync(async (req, res, next) => {
  const wishlists = await Wishlist.find();
  res.status(200).json({
    status: "success",
    results: wishlists.length,
    data: {
      wishlists,
    },
  });
});
