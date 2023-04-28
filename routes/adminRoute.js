import express from "express";
import { authUser, restrictTo } from "../controllers/authController.js";
import { loginAdmin, signupAdmin } from "../controllers/adminController.js";

const router = express.Router();

router.route("/login").post(loginAdmin);
router.route("/signup").post(signupAdmin);

export default router;
