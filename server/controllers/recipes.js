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
          if(recipes[i].ingredientList.includes(ingredient.name)){
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


export const getAllIngredients = async(req,res) => {
  try{
    const ingredients = await Ingredients.find({});
    res.status(200).json(ingredients)
  }catch(err){
      res.status(404).json({ message: err.message });
  }
};


export const addLike = async(req,res) => {
  try{
    let { recipe, user } = req.body;
    const currentRecipe = await Recipe.findOneAndUpdate(
      { recipeName: recipe },
      { $inc: { numLikes : 1 } },
      { new: true }
    );
    const currentUser = await User.findOneAndUpdate(
      { email: user },
      { $push: { likes: recipe } },
      { new: true } 
    );
    res.status(200).json(currentUser.likes)
  }catch(err){
      res.status(404).json({ message: err.message });
  }
};


export const removeLike = async(req,res) => {
  try{
    let { recipe, user } = req.body;
    const currentRecipe = await Recipe.findOneAndUpdate(
      { recipeName: recipe },
      { $inc: { numLikes : -1 } },
      { new: true }
    );
    const currentUser = await User.findOneAndUpdate(
      { email: user },
      { $pull: { likes: recipe } },
      { new: true } 
    );
    res.status(200).json(currentUser.likes)
  }catch(err){
      res.status(404).json({ message: err.message });
  }
};

export const getRecipeByLike= async(req,res) => {
  try{
    let { requiredRecipe } = req.body;
    const currentRecipe = await Recipe.findOne({ recipeName: requiredRecipe })
    res.status(200).json(currentRecipe);
  }catch(err){
    res.status(404).json({ message: err });
  } 
};

// export const addStar = async(req,res) => {
//   try{
//     let { recipe, numStar,email } = req.body;
//     const currentRecipe = await Recipe.fineOne({ recipeName : recipe});
//     currentRecipe.numOfRatings += 1;
//     currentRecipe.totalRating = (currentRecipe.totalRating + numStar);
//     currentRecipe.ArrayOfUsers.push({ email: email, numStar: numStar });
//     await currentRecipe.save();
//     res.status(200).json("Added star successfully");
//   }catch(err){
//     res.status(404).json({ message: err });
//   }
// };

// export const removeStar = async(req,res) => {
//   try{
//     let { recipe, numStar, email } = req.body;
//     const currentRecipe = await Recipe.fineOne({ recipeName : recipe});
//     currentRecipe.numOfRatings -= 1;
//     currentRecipe.totalRating = (currentRecipe.totalRating - numStar);
//     currentRecipe.ArrayOfUsers = currentRecipe.ArrayOfUsers.filter(
//       (user) => user.email !== email
//     );    
//     await currentRecipe.save();
//     res.status(200).json("Removed Star successfully");
//   }catch(err){
//     res.status(404).json({ message: err });
//   }
// };