import express from "express";

import {
  getAdventures,
  getAdventure,
  createAdventure,
  updateAdventure,
  deleteAdventure,
} from "../controllers/adventureController.js";

const router = express.Router();

router.route("/").get(getAdventures).post(createAdventure);
router
  .route("/:id")
  .get(getAdventure)
  .patch(updateAdventure)
  .delete(deleteAdventure);

export default router;
