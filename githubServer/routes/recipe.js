import express from "express";
import { getAllRecipes, getIngredient, getRecipesByIngredient, addLike, removeLike } from "../controllers/recipes.js";
import { getAllLiked } from "../controllers/users.js";

const router = express.Router();

/* READ */
router.get("/", getAllRecipes);

/*POST */
router.post("/:ingredientName", getRecipesByIngredient)
router.post("/ingredient/:ingredientName", getIngredient)

/* PATCH */
router.patch("/addLike", addLike)
router.patch("/removeLike", removeLike)



export default router;

