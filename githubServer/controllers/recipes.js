import Recipe from "../models/Recipe.js";
import Ingredients from "../models/Ingredients.js";
import User from "../models/User.js";

/* READ */
export const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({});
    res.status(200).json(recipes);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getRecipesByIngredient = async(req, res) => {
    try{
        const { ingredientName } = req.body;
        const ingredient = await Ingredients.findOne({ name: ingredientName });
        const recipes = await Recipe.find({});
        let response = [];
        for(let i in recipes){
          if(recipes[i].recipeName == ingredient.name){
            response.push(recipes[i]);
          }
        }
        res.status(200).json(response)
    }catch(err){
        res.status(404).json({ message: err.message });
    }
};

export const getIngredient = async(req,res) => {
  try{
    const { ingredientName } = req.body;
    const ingredient = await Ingredients.findOne({ name: ingredientName });
    res.status(200).json(ingredient)
  }catch(err){
      res.status(404).json({ message: err.message });
  }
};



export const addLike = async(req,res) => {
  try{
    let { recipe, user } = req.body;
    const currentUser = await User.findOneAndUpdate(
      { email: user },
      { $push: { likes: recipe } },
      { new: true } // This option returns the updated document
    );
    res.status(200).json(currentUser.likes)
  }catch(err){
      res.status(404).json({ message: err.message });
  }
};


export const removeLike = async(req,res) => {
  try{
    let { recipe, user } = req.body;
    const currentUser = await User.findOneAndUpdate(
      { email: user },
      { $pull: { likes: recipe } },
      { new: true } // This option returns the updated document
    );
    res.status(200).json(currentUser.likes)
  }catch(err){
      res.status(404).json({ message: err.message });
  }
};