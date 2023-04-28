import Order from "../models/orderModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

export const getOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.find();
  res.status(200).json({
    status: "success",
    results: orders.length,
    data: {
      orders,
    },
  });
});

export const getOrder = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new AppError("No order found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      order,
    },
  });
});

export const createOrder = catchAsync(async (req, res, next) => {
  const newOrder = await Order.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      order: newOrder,
    },
  });
});
