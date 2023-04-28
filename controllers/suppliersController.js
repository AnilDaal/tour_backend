import Suppliers from "../models/suppliersModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

export const getSuppliers = catchAsync(async (req, res, next) => {
  const suppliers = await Suppliers.find();
  res.status(200).json({
    status: "success",
    results: suppliers.length,
    data: {
      suppliers,
    },
  });
});

export const getSupplier = catchAsync(async (req, res, next) => {
  const supplier = await Suppliers.findById(req.params.id);
  if (!supplier) {
    return next(new AppError("No supplier found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      supplier,
    },
  });
});

export const createSupplier = catchAsync(async (req, res, next) => {
  const newSupplier = await Suppliers.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      supplier: newSupplier,
    },
  });
});

export const updateSupplier = catchAsync(async (req, res, next) => {
  const { Name, Tour } = req.body;
  if (!req.params.id) {
    return next(new AppError("Please Enter Supplier ID", 404));
  }
  const supplier = await Suppliers.findByIdAndUpdate(
    req.params.id,
    { Name, Tour },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!supplier) {
    return next(new AppError("No supplier found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      supplier,
    },
  });
});

export const deleteSupplier = catchAsync(async (req, res, next) => {
  const supplier = await Suppliers.findByIdAndDelete(req.params.id);
  if (!supplier) {
    return next(new AppError("No supplier found with that ID", 404));
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
});
