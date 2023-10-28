import express from "express";
import { getAllRecipes, getIngredient, getRecipesByIngredient, addLike, removeLike, getAllIngredients, getRecipeByLike } from "../controllers/recipes.js";

const router = express.Router();

/* READ */
router.get("/", getAllRecipes);
router.get("/getAllIngredients", getAllIngredients);

/*POST */
router.post("/:ingredientName", getRecipesByIngredient)
router.post("/ingredient/:ingredientName", getIngredient)
router.post("/getRecipeByLike/:requiredRecipe", getRecipeByLike);

/* PATCH */
router.patch("/addLike", addLike)
router.patch("/removeLike", removeLike)
// router.patch("/addStar", addStar)
// router.patch("/removeStar", removeStar)



export default router;

