import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIngredients } from "state";
import { Box } from "@mui/material";
import Image from "components/ImageWrapper";

const Ingredients = ({ ingredientN, size='60%' ,title}) => {
  const dispatch = useDispatch();
  const ingredient = useSelector((state) => state.ingredients);

  // const getIngredient = async ( ingredientName ) => {
  //   const sanitizedIngredientName = ingredientName.replace(/"/g, '');
  //   const response = await fetch(`http://localhost:3001/recipes/ingredient/${sanitizedIngredientName}`, {
  //     method: "POST",
  //     headers:{
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ingredientName: sanitizedIngredientName}),
  //   });
  //   const data = await response.json();
  //   dispatch(setIngredients({ingredients: data}));
  // };

  const getAllIngredients = async () => {
    const response = await fetch(`http://localhost:3001/recipes/getAllIngredients`, {
      method: "GET",
    });
    const data = await response.json();
    dispatch(setIngredients({ingredients: data}));
  };

    useEffect(() => {
        // getIngredient(ingredientN);
        // getAllIngredients();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    let currentIngredient = ingredient[0];


    for(const ii in ingredient){
      const sanitizedIngredientName = ingredientN.replace(/"/g, '');
      if(ingredient[ii].name === sanitizedIngredientName){
        currentIngredient = ingredient[ii];
        break;
      }
    }

  return (
    <>
      <Box key= {currentIngredient._id}  display= "flex" justifyContent= "center">
        <Image image={currentIngredient.imagePath} width={size} height={size} title={title}/>
      </Box>
    </>
  );
};

export default Ingredients;
