import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIngredients, setSelectedIngredient } from "state";
import { Box } from "@mui/material";
import Image from "components/ImageWrapper";

const Ingredients = ({ ingredientN, size='60%' }) => {
  const dispatch = useDispatch();
  const ingredient = useSelector((state) => state.ingredients);

  const getIngredient = async ( ingredientName ) => {
    const sanitizedIngredientName = ingredientName.replace(/"/g, '');
    const response = await fetch(`http://localhost:3001/recipes/ingredient/${sanitizedIngredientName}`, {
      method: "POST",
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ingredientName: sanitizedIngredientName}),
    });
    const data = await response.json();
    dispatch(setIngredients({ingredients: data}));
  };


  if(ingredient == null){
    getIngredient(ingredientN);
  }

    useEffect(() => {
        getIngredient(ingredientN);
      // getIngredient(JSON.stringify(ingredientN.ingredientN));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Box key= {ingredient._id}  display= "flex" justifyContent= "center">
        <Image image={ingredient.imagePath} width={size} height={size} title={'something'}/>
      </Box>
    </>
  );
};

export default Ingredients;
