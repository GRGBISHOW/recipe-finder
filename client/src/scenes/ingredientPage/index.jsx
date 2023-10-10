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
    const response = await fetch(`https://onlygunicorn.xyz/recipes/getAllIngredients`, {
      method: "GET",
    });
    const data = await response.json();
    dispatch(setIngredients({ingredients: data}));
  };


  const titleStyle = {
    marginTop:'20px',
    color: 'var(--Dark-green, #105B27)',
    textAlign: 'center',
    fontFamily: 'Quicksand',
    fontSize: '42px',
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: '28.069px; /* 77.968% *',
    letterSpacing: '1.053px',
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
      <Box key= {currentIngredient._id}  display= "flex" flexDirection='column' justifyContent="center">
        <img style={{ borderRadius: "5%",}} src={`https://onlygunicorn.xyz/backend/assets/${currentIngredient.imagePath}`} width={size} height={size}/>
        <Box style={titleStyle}>{title}</Box>
      </Box>
    </>
  );
};

export default Ingredients;
