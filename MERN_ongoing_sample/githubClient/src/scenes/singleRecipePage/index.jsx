import { useEffect,useState } from "react";
import { useSelector } from "react-redux";
import Flex from "components/Flex";
import { useDispatch } from "react-redux";
import { Box } from "@mui/material";
import Ingredients from "scenes/ingredientPage";
import Image from "components/ImageWrapper";
import { setRecipes } from "state";
import LowerBar from "scenes/lowerBar";



const SingleRecipe = () =>{
    const dispatch = useDispatch();
    const recipes = useSelector((state) => state.recipes);
    const selectedRecipe = useSelector((state) => state.selectedRecipes);

    const recipeFinderFromIngredientStyles = { 
        padding: '3%' , 
        minWidth: '100%' ,
        backgroundColor:'#d6e6d5',
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',
     };
    
       const recipeStyle ={
            padding: '0 2% 0 2%',
            backgroundColor:'#d6e6d5',
            display: 'flex',
            borderTop: '1px solid black',  
      };
    
      const descriptionStyle = {
            padding: "4% 2% 4% 2%",
            fontFamily: 'sans-serif',
            lineHeight: '250%',
      };

      const getAllRecipes = async () => {
        const response = await fetch("http://localhost:3001/recipes/", {
          method: "GET",
        });
        const data = await response.json();
        dispatch(setRecipes({ recipes: data }));
      };
    
      useEffect(() => {
        getAllRecipes();
      }, []); // eslint-disable-line react-hooks/exhaustive-deps
    
      const {
        _id,
        recipeName,
        description,
        preparationSteps,
        imagePath,
        cookingTime,
        servings,
        ingredientList,
        otherDetails,
        } = selectedRecipe;

        return (
            <>
            <LowerBar />
            <Flex sx={{ flexDirection: 'column' ,padding: '3%', justifyContent: 'center', backgroundColor:'#FFFFFF'}} key={Math.random()}>
            <Box sx={recipeFinderFromIngredientStyles}>
                <Box style={recipeStyle} key= {_id} /*onClick={() => {setRecipeToIngredient(!isIngredient);}}*/>
                    <Image image={imagePath} width={'40%'} height={'40%'} title={recipeName}/>  
                    <Box style={descriptionStyle}>
                        <b>Description:-<br /></b>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{description}<br />
                        <b>Preparation Steps:-<br /></b>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{preparationSteps}<br />
                        <b>Cooking Time:-<br /></b>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{cookingTime}<br />
                        <b>Servings:-<br /></b>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{servings}<br />
                        <b>Ingredients List:-<br /></b>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{ingredientList.join(', ')}<br />
                        <b>Extra Information:-<br /></b>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{otherDetails}<br />
                    </Box>
                </Box>
            </Box>
        </Flex>
            </>
        );
    }


export default SingleRecipe;