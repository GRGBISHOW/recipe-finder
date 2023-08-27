import mongoose from "mongoose";

const recipeSchema = mongoose.Schema(
  {
    recipeName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    preparationSteps:{
      type: String,
      required: true,
      max: 2000
    },
    cookingTime: {
      type: Number,
      required: true,
    },
    servings: {
      type: Number,
      requried: true,
    },
    imagePath: {
      type: String,
      default: "",
    },
    ingredientList: {
      type: Array,
      required: true,
    },
    otherDetails: {
      type: Array,
      default: [],
    }
  },
  { timestamps: true }
);

const Recipe = mongoose.model("recipe", recipeSchema);

export default Recipe;
