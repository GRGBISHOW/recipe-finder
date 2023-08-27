import express from "express";
import {
  getUser, getAllLiked, addRemoveLike
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/:email", verifyToken, getUser);

/* POST */
router.post("/allLiked", getAllLiked)

/* UPDATE */
router.patch("/:email/:recipeName", verifyToken, addRemoveLike);

export default router;
