import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import AppError from "./utils/appError.js";
import globalErrorHandler from "./controllers/errorController.js";
import cityRoutes from "./routes/cityRoute.js";
import userRoutes from "./routes/userRoute.js";
import orderRoutes from "./routes/orderRoute.js";
import reviewRoutes from "./routes/reviewRoute.js";
import adminRoutes from "./routes/adminRoute.js";
import tourRoutes from "./routes/tourRoute.js";
import wishlistRoutes from "./routes/wishlistRoute.js";

dotenv.config({ path: "./config.env" });
const port = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

mongoose
  .connect(process.env.MONGO_DB)
  .then(() => console.log("Connected to mongo Successful"));

app.get("/", (req, res) => {
  res.send("Hello Boss!");
});

app.use("/api/v1/city", cityRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/order", orderRoutes);
app.use("/api/v1/review", reviewRoutes);
app.use("/api/v1/tour", tourRoutes);
app.use("/api/v1/wishlist", wishlistRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use(express.static("uploads"));

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

const server = app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
