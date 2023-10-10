import express from "express";
import { getCategories, getIngredientsByCategory } from "../controllers/categories.js";


const router = express.Router();

/* READ */
router.get("/", getCategories);

/*POST */
router.post("/:categoryName", getIngredientsByCategory);

export default router;
