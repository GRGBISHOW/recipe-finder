import { useEffect,useState } from "react";
import { useSelector } from "react-redux";
import Flex from "components/Flex";
import { useDispatch } from "react-redux";
import { Box, Typography } from "@mui/material";
import Image from "components/ImageWrapper";
import { setRecipes } from "state";
import LowerBar from "scenes/lowerBar";
import Ingredients from "scenes/ingredientPage";


const SingleRecipe = () =>{
    const dispatch = useDispatch();
    const recipes = useSelector((state) => state.recipes);
    const selectedRecipe = useSelector((state) => state.selectedRecipes);
    
      const descriptionStyle = {
            padding: "4% 2% 4% 2%",
            lineHeight: '250%',
            fontFamily:'Quicksand',
      };

      const getAllRecipes = async () => {
        const response = await fetch("https://onlygunicorn.xyz/backend/recipes/", {
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
            <Box
        sx={{
          display: 'flex',
          width: '100%',
          height: '550px',
          justifyContent:'space-between',
        }}
      >
        <img src='https://onlygunicorn.xyz/assets/Vector 6.png' width='600px' height='280px' />
        <Box
        display='flex'
        alignItems='center'
        justifyContent='center'
        width='450px'
        flexDirection='column'
        >
          <img 
          style={{borderRadius:'30px'}}
          width='360px'
          height='360px'
          src={`https://onlygunicorn.xyz/backend/assets/${selectedRecipe.imagePath}`} />
          <Typography
                sx={{
                  marginTop: '15px',
                    color: 'var(--Dark-green, #105B27)',
                    fontFamily: 'Quicksand',
                    fontSize: '40px',
                    fontStyle: 'normal',
                    fontWeight: '700',
                    lineHeight: '82.44px',
                    letterSpacing: '-0.274px',
                }}
                >
                {selectedRecipe.recipeName} 
                </Typography>
        </Box>
        <Box
          display= 'flex'
          alignItems= 'flex-end'
          justifyContent='flex-end'
          zIndex='1'
          height='110%'
          width= '600px'
          top= '50px'
        >
         <img  src='https://onlygunicorn.xyz/assets/Vector 5.png' width='250px' height='310px' />
        </Box>
      </Box>

            <Box
              sx={{
                width: '100%',
                display: 'flex',
                flexWrap:'wrap',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#E9F8EE',
                borderRadius: '30px',
              }}
            >
            <Flex sx={{ flexDirection: 'column' ,padding: '3%', justifyContent: 'center',}} key={Math.random()}>
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
          </Flex>
          </Box>
            </>
        );
    }


export default SingleRecipe;