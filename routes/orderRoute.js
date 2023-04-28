import express from "express";
import {
  getOrders,
  getOrder,
  createOrder,
} from "../controllers/orderController.js";

const router = express.Router();

router.route("/").get(getOrders).post(createOrder);
router.route("/:id").get(getOrder);

export default router;
