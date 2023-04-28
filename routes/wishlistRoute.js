import express from "express";

import {
  getWishlists,
  getWishlist,
  createWishlist,
  updateWishlist,
  deleteWishlist,
} from "../controllers/wishlistController.js";

const router = express.Router();

router.route("/").get(getWishlists).post(createWishlist);
router
  .route("/:id")
  .get(getWishlist)
  .patch(updateWishlist)
  .delete(deleteWishlist);

export default router;
