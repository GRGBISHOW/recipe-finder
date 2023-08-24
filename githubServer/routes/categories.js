import express from "express";
import { getCategories, getIngredientsByCategory } from "../controllers/categories.js";

const router = express.Router();

/* READ */
router.get("/", getCategories);
router.get("/:name", getIngredientsByCategory);

export default router;
