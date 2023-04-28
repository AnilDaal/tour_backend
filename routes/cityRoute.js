import express from "express";
import { authUser, restrictTo } from "../controllers/authController.js";
import { upload } from "../utils/multerStorage.js";

import {
  getCities,
  getCity,
  createCity,
  updateCity,
  deleteCity,
} from "../controllers/cityController.js";

const router = express.Router();

router
  .route("/")
  .get(getCities)
  .post(
    authUser,
    restrictTo("Admin"),
    upload.fields([{ name: "Image", maxCount: 1 }]),
    createCity
  );
router
  .route("/:cityId")
  .get(getCity)
  .patch(authUser, restrictTo("Admin"), updateCity)
  .delete(authUser, restrictTo("Admin"), deleteCity);

export default router;
// Path: routes\orderRoute.js
