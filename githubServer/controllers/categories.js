import Category from "../models/Category.js";
import Ingredients from "../models/Ingredients.js";

/* READ */
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(200).json(categories);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getIngredientsByCategory = async(req, res) => {
    try{
        const { categoryName } = req.body;
        const allIngredients = await Ingredients.find({});
        let ingredientsList = [];
        for(let i = 0; i < allIngredients.length ;i++){
            if(allIngredients[i].name == categoryName){
                ingredientsList.push(allIngredients[i]);
            }   
        }
        res.status(200).json(ingredientsList)
    }catch(err){
        res.status(404).json({ message: err.message });
    }
};