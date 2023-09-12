import express from "express";
import {
  getUser, getAllLiked, addRemoveLike, getUserHistory
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* POST */
router.post("/allLiked", getAllLiked)
router.post("/getUser", getUser);

/* UPDATE */
router.patch("/:email/:recipeName", verifyToken, addRemoveLike);
router.patch("/getHistory", getUserHistory)


export default router;
