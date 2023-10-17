import { useEffect, useState, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLikes, setSortedRecipes, setRecipes, setSelectedRecipes } from "state";
import { Box, Typography } from "@mui/material";
import LowerBar from "scenes/lowerBar";
import Ingredients from "scenes/ingredientPage";
import Flex from "components/Flex";
import Image from "components/ImageWrapper";
import {IconButton} from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useNavigate } from "react-router-dom";
import ActualLowerBar from "scenes/actualLowerBar";

const Recipes = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isIngredient, setRecipeToIngredient] = useState(false);
  const [theIngredientList, setIngredient] = useState([]);
  const recipes = useSelector((state) => state.recipes);
//   const selectedRecipes = useSelector((state) => state.selectedRecipes);
  const getUser = useSelector((state) => state.user);
  const likes = useSelector((state) => state.likes);
  const sortedRecipes = useSelector((state) => state.sortedRecipes);  
  const [forceUpdate, setForceUpdate] = useState(false);
  const [startFlag, setStartFlag] = useState(false);

  useEffect(() => {

    const scrollToTopButton = document.getElementById('LowerBar');
    if(!startFlag){
      setStartFlag(true);
      scrollToTopButton.scrollIntoView()
    }
  
  },[])

  
  const getAllRecipes = async () => {
    const response = await fetch("http://localhost:3001/backend/recipes/", {
      method: "GET",
    });
    const data = await response.json();
    dispatch(setRecipes({ recipes: data }));
  };


  function stableSort(arr, compareFn) {
    if (arr.length <= 1) {
      return arr.slice();
    }
  
    const middle = Math.floor(arr.length / 2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);
  
    return merge(stableSort(left, compareFn), stableSort(right, compareFn), compareFn);
  }
  
  function merge(left, right, compareFn) {
    const result = [];
    let leftIndex = 0;
    let rightIndex = 0;
  
    while (leftIndex < left.length && rightIndex < right.length) {
      const comparison = compareFn(left[leftIndex], right[rightIndex]);
  
      if (comparison <= 0) {
        result.push(left[leftIndex]);
        leftIndex++;
      } else {
        result.push(right[rightIndex]);
        rightIndex++;
      }
    }
  // Append remaining elements from left and right arrays
  return result.concat(left.slice(leftIndex), right.slice(rightIndex));
}


  useEffect(() => {
    getAllRecipes();
    const sorted = stableSort([...recipes], (a, b) => b.numLikes - a.numLikes);
    dispatch(setSortedRecipes({ sortedRecipes : sorted }));
    if (forceUpdate) {
      setForceUpdate(false);
    }
  }, [forceUpdate]); // eslint-disable-line react-hooks/exhaustive-deps


  try{


  const handleLikeButton = async (recipeName) => {
    const sanitizedIngredientName = recipeName.replace(/"/g, '');

        if(!likes.includes(recipeName)){
            const response = await fetch("http://localhost:3001/backend/recipes/addLike/", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Cache-Control": "no-store",
                },
                body: JSON.stringify({ user: getUser.email, recipe: sanitizedIngredientName}),
            });
            const data = await response.json();
            dispatch(setLikes({ likes: data, user: getUser, token: getUser._id }));
        }
        else{
            const sanitizedIngredientName = recipeName.replace(/"/g, '');

            const counterResponse = await fetch("http://localhost:3001/backend/recipes/removeLike/", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ user: getUser.email, recipe: sanitizedIngredientName}),
            });
            const data = await counterResponse.json();
            dispatch(setLikes({ likes: data, user: getUser, token: getUser._id }));
        }
        setForceUpdate(true);
  };

  // const handleStarButton = async (numOfStars, recipeName) => {
  //   const sanitizedName = numOfStars.replace(/"/g, '');
  //     if(!starTouched){
  //         const response = await fetch("http://localhost:3001/backend/recipes/addStar/", {
  //             method: "PATCH",
  //             headers: {
  //                 "Content-Type": "application/json",
  //                 "Cache-Control": "no-store",
  //             },
  //             body: JSON.stringify({ recipe: recipeName, numStar: sanitizedName, user:getUser.email }),
  //         });
  //         // const data = await response.json();
  //     }
  //     else{
  //         const sanitizedName = recipeName.replace(/"/g, '');
  //         const counterResponse = await fetch("http://localhost:3001/backend/recipes/removeStar/", {
  //             method: "PATCH",
  //             headers: {
  //                 "Content-Type": "application/json",
  //             },
  //             body: JSON.stringify({ recipe: recipeName, numStar: sanitizedName, user:getUser.email }),
  //         });
  //         // const data = await counterResponse.json();
  //     }
  // };

//   const getRecipesByIngredient = async (ingredientName) => {
//     const sanitizedIngredientName = ingredientName.replace(/"/g, '');
//     const response = await fetch(`http://localhost:3001/backend/recipes/${sanitizedIngredientName}`, {
//       method: "POST",
//       headers:{
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ingredientName: sanitizedIngredientName}),
//     });
//     const data = await response.json();
//     dispatch(setSelectedRecipes({ selectedRecipes: data }));
//   };

  const getRecipesByIngredientManual = (ingredientName) => {
    const sanitizedIngredientName = ingredientName.replace(/"/g, '');
    let currentRecipes = [];
    for(const rr in recipes){   
        for(const ll in recipes[rr].ingredientList)
        if(recipes[rr].ingredientList[ll] === sanitizedIngredientName){
            currentRecipes.push(recipes[rr]);
        }
    }
    return currentRecipes;
  };

  

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
    <Box
        sx={{
          display: 'flex',
          width: '100%',
          height: '550px',
          justifyContent:'space-between',
        }}
      >
        <img src='http://localhost:3000/assets/Vector 6.png' width='600px' height='280px' />
        <Box
        display='flex'
        alignItems='center'
        justifyContent='center'
        width='450px'
        flexDirection='column'
        >
          <img 
          style={{borderRadius:'30px'}}
          width='170px'
          height='170px'
          src={`http://localhost:3000/assets/Vector.png`} />
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
                 All Recipes
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
         <img  src='http://localhost:3000/assets/Vector 5.png' width='250px' height='310px' />
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
      {!isIngredient ? (sortedRecipes.map(
        (rr) => (
            <Box key={rr._id} style={{width:'400px',padding:'1% 0 1% 0'}} >
            <Box style={{ display:'flex', height:'92%' ,backgroundColor:'white',margin:'30px', borderRadius:'30px', flexDirection:'column'}}>
                <Box
                onClick={() => {dispatch(setSelectedRecipes({selectedRecipes : rr}));navigate(`/recipes/${rr.recipeName}`)}}
                 sx={{
                  '&:hover':{
                    cursor: 'pointer',
                  }
                }}
                >
                  <img                                         
                    src={`http://localhost:3001/backend/assets/${rr.imagePath}`} width={'100%'} height={'250px'} style={{ borderTopLeftRadius: '30px',borderTopRightRadius:'30px' , zIndex:'1'}} />                                                                                 
                </Box>                                        
                <Box
                  sx={{
                    padding: '5%',
                    display: 'flex',
                    justifyContent:'space-around',
                    Typography:{
                      fontFamily: 'Quicksand',
                      fontSize: '14px',
                    }
                  }}
                >
                  <Box>
                  <Typography
                  sx={{
                      fontFamily: 'Quicksand',
                      fontSize: '21px',
                      fontStyle: 'normal',
                      fontWeight: '700',
                      minWidth:'270px',
                      lineHeight: '139%'/* 38.92px */,
                  }}>
                    {rr.recipeName}
                  </Typography> 
                  <Typography
                  sx={{
                    fontFamily: 'Quicksand',
                    fontSize: '18px',
                    fontStyle: 'normal',
                    fontWeight: '400',
                    minWidth:'270px',
                    lineHeight: '139%'/* 38.92px */,
                  }}
                  >
                    {rr.cookingTime} Min.
                  </Typography> 
                  </Box>
                  {(likes.includes(rr.recipeName)) ? (                                               
                  <Box
                  onClick={() => {handleLikeButton(rr.recipeName);}}
                  sx={{
                    alignSelf:'center',
                    minWidth:'40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor:'rgba(242, 153, 74,1)',
                    borderRadius: '50%',
                    '&:hover':{
                      cursor:'pointer',
                      backgroundColor:'#E9F8EE',
                    },
                  }}>
                  <img width='32px' src='http://localhost:3000/assets/Heart.svg' />                                                                             
                </Box>
                ):(
                <Box
                  onClick={() => {handleLikeButton(rr.recipeName);}}
                  sx={{
                    alignSelf:'center',
                    minWidth:'40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%',
                    '&:hover':{
                      cursor:'pointer',
                      backgroundColor:'rgba(242, 153, 74,1)',
                    },
                  }}>
                    <img width='32px' src='http://localhost:3000/assets/Heart.svg' /> 
                    </Box>
                  )}                                                                               
                </Box>
            </Box>
            </Box>
          )
      )) : (
        <Flex sx={{ flexDirection: 'column' ,padding: '3%', justifyContent: 'center', backgroundColor:'#FFFFFF'}} onClick={() => {setRecipeToIngredient(!isIngredient)}}>
            { isIngredient &&
                (theIngredientList.map(
                    (currentIngredient) => {
                        const currentRecipes = getRecipesByIngredientManual(currentIngredient);
                        return (
                            <Flex sx={{ flexDirection: 'column' ,padding: '3%', justifyContent: 'center', backgroundColor:'#FFFFFF'}} key={Math.random()}>
                            <Ingredients key={Math.random()} ingredientN={JSON.stringify(currentIngredient)} size={'70%'}  title={currentIngredient} />
                            <Box sx={recipeFinderFromIngredientStyles}>
                            {(currentRecipes.map(
                                (rr) => (
                                  (rr) => (
                                    <Box key={rr._id} style={{width:'400px',padding:'1% 0 1% 0'}} >
                                    <Box style={{ display:'flex', height:'92%' ,backgroundColor:'white',margin:'30px', borderRadius:'30px', flexDirection:'column'}}>
                                        <Box
                                        onClick={() => {dispatch(setSelectedRecipes({selectedRecipes : rr}));navigate(`/recipes/${rr.recipeName}`)}}
                                         sx={{
                                          '&:hover':{
                                            cursor: 'pointer',
                                          }
                                        }}
                                        >
                                          <img                                         
                                            src={`http://localhost:3001/backend/assets/${rr.imagePath}`} width={'100%'} height={'250px'} style={{ borderTopLeftRadius: '30px',borderTopRightRadius:'30px' , zIndex:'1'}} />                                                                                 
                                        </Box>                                        
                                        <Box
                                          sx={{
                                            padding: '5%',
                                            display: 'flex',
                                            justifyContent:'space-around',
                                            Typography:{
                                              fontFamily: 'Quicksand',
                                              fontSize: '14px',
                                            }
                                          }}
                                        >
                                          <Box>
                                          <Typography
                                          sx={{
                                              fontFamily: 'Quicksand',
                                              fontSize: '21px',
                                              fontStyle: 'normal',
                                              fontWeight: '700',
                                              minWidth:'270px',
                                              lineHeight: '139%'/* 38.92px */,
                                          }}>
                                            {rr.recipeName}
                                          </Typography> 
                                          <Typography
                                          sx={{
                                            fontFamily: 'Quicksand',
                                            fontSize: '18px',
                                            fontStyle: 'normal',
                                            fontWeight: '400',
                                            minWidth:'270px',
                                            lineHeight: '139%'/* 38.92px */,
                                          }}
                                          >
                                            {rr.cookingTime} Min.
                                          </Typography> 
                                          </Box>
                                          {(likes.includes(rr.recipeName)) ? (                                               
                                          <Box
                                          onClick={() => {handleLikeButton(rr.recipeName);}}
                                          sx={{
                                            alignSelf:'center',
                                            minWidth:'40px',
                                            height: '40px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            backgroundColor:'rgba(242, 153, 74,1)',
                                            borderRadius: '50%',
                                            '&:hover':{
                                              cursor:'pointer',
                                              backgroundColor:'#E9F8EE',
                                            },
                                          }}>
                                          <img width='32px' src='http://localhost:3000/assets/Heart.svg' />                                                                             
                                        </Box>
                                        ):(
                                        <Box
                                          onClick={() => {handleLikeButton(rr.recipeName);}}
                                          sx={{
                                            alignSelf:'center',
                                            minWidth:'40px',
                                            height: '40px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderRadius: '50%',
                                            '&:hover':{
                                              cursor:'pointer',
                                              backgroundColor:'rgba(242, 153, 74,1)',
                                            },
                                          }}>
                                            <img width='32px' src='http://localhost:3000/assets/Heart.svg' /> 
                                            </Box>
                                          )}                                                                               
                                        </Box>
                                    </Box>
                                </Box>
                                  )
                                )
                            ))}
                            </Box>
                        </Flex>
                        );
                    }
                ))
            }
        </Flex>
      )}
      </Box>
      <ActualLowerBar />
    </>
    
  );
}
catch(err){
    console.log(err);
}
}  

export default Recipes;
