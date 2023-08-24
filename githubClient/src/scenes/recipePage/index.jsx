import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLikes, setRecipes, setSelectedRecipes } from "state";
import { Box } from "@mui/material";
import LowerBar from "scenes/lowerBar";
import Ingredients from "scenes/ingredientPage";
import Flex from "components/Flex";
import Image from "components/ImageWrapper";
import {IconButton} from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const Recipes = () => {
  const dispatch = useDispatch();
  const [isIngredient, setRecipeToIngredient] = useState(false);
  const [theIngredient, setIngredient] = useState("");
  const recipes = useSelector((state) => state.recipes);
  const selectedRecipes = useSelector((state) => state.selectedRecipes);
  const [isLiked, setLiked] = useState(false);
  const getUser = useSelector((state) => state.user);
  const [isActive, setIsActive] = useState(false);

  const getAllRecipes = async () => {
    const response = await fetch("http://localhost:3001/recipes/", {
      method: "GET",
    });
    const data = await response.json();
    dispatch(setRecipes({ recipes: data }));
  };

  const handleLikeButton = async (recipeName) => {
    const sanitizedIngredientName = recipeName.replace(/"/g, '');

        if(!isLiked){
            const something = await fetch("http://localhost:3001/recipes/addLike/", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Cache-Control": "no-store",
                },
                body: JSON.stringify({ user: getUser.email, recipe: sanitizedIngredientName}),
            });
            const data = await something.json();
            dispatch(setLikes({ likes: data, user: getUser, token: getUser._id }));
        }
        else{
            const sanitizedIngredientName = recipeName.replace(/"/g, '');

            const counterResponse = await fetch("http://localhost:3001/recipes/removeLike/", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ user: getUser.email, recipe: sanitizedIngredientName}),
            });
            const data = await counterResponse.json();
            dispatch(setLikes({ likes: data, user: getUser, token: getUser._id }));
        }
  };


  const getRecipesByIngredient = async (ingredientName) => {
    const sanitizedIngredientName = ingredientName.replace(/"/g, '');
    const response = await fetch(`http://localhost:3001/recipes/${sanitizedIngredientName}`, {
      method: "POST",
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ingredientName: sanitizedIngredientName}),
    });
    const data = await response.json();
    dispatch(setSelectedRecipes({ selectedRecipes: data }));
  };

  

    if(!recipes){
        getAllRecipes();
    };


  useEffect(() => {
    getAllRecipes();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps


  const recipeFinderFromIngredientStyles = { 
    margin: '3%' , 
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

  return (
    <>
    <LowerBar />
      {!isIngredient ? (recipes.map(
        ({
          _id,
          recipeName,
          description,
          preparationSteps,
          imagePath,
          cookingTime,
          servings,
          ingredientList,
          otherDetails
        }) => (
            (<Box style={recipeStyle} key= {_id}>
                <Image image={imagePath} width={'40%'} height={'40%'} title={recipeName} />  
                <Box style={descriptionStyle} onClick={() => {setRecipeToIngredient(!isIngredient); setIngredient(recipeName);  getRecipesByIngredient(recipeName)}}>
                    <b>Description:-<br /></b>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{description}<br />
                    <b>Preparation Steps:-<br /></b>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{preparationSteps}<br />
                    <b>Cooking Time:-<br /></b>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{cookingTime}<br />
                    <b>Servings:-<br /></b>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{servings}<br />
                    <b>Ingredients List:-<br /></b>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{ingredientList}<br />
                    <b>Extra Information:-<br /></b>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{otherDetails}<br />
                </Box>
                <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center',flexGrow: '1'}}>
                    <IconButton onClick={() => {setLiked(!isLiked); handleLikeButton(recipeName);}} >
                        {isLiked ? (
                            <FavoriteIcon sx={{ fontSize: '200%' }} />
                        ) : (
                            <FavoriteBorderIcon sx={{ fontSize: '200%' }} />
                        )}
                    </IconButton>
                </Box>
                </Box>)
        )
      )) : (
        <Flex sx={{ flexDirection: 'column' ,padding: '3%', justifyContent: 'center', backgroundColor:'#FFFFFF'}} onClick={() => {setRecipeToIngredient(!isIngredient)}}>
            <Ingredients key={Math.random()} ingredientN={JSON.stringify(theIngredient)} size={'70%'} />
            <Box sx={recipeFinderFromIngredientStyles}>
            {(selectedRecipes.map(
                ({
                _id,
                recipeName,
                description,
                preparationSteps,
                imagePath,
                cookingTime,
                servings,
                ingredientList,
                otherDetails,
                }) => (
                    (<Box style={recipeStyle} key= {_id} onClick={() => {setRecipeToIngredient(!isIngredient); setIngredient(recipeName);}}>
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
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{ingredientList}<br />
                            <b>Extra Information:-<br /></b>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{otherDetails}<br />
                        </Box>
                    </Box>)
                )
            ))}
            </Box>
        </Flex>
      )}


    </>
    
  );
};

export default Recipes;
