import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLikes, setSortedRecipes, setRecipes } from "state";
import { Box, Icon } from "@mui/material";
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
  const [theIngredientList, setIngredient] = useState([]);
  const recipes = useSelector((state) => state.recipes);
//   const selectedRecipes = useSelector((state) => state.selectedRecipes);
  const getUser = useSelector((state) => state.user);
  const likes = useSelector((state) => state.likes);
  const sortedRecipes = useSelector((state) => state.sortedRecipes);  
  const [forceUpdate, setForceUpdate] = useState(false);
  
  const getAllRecipes = async () => {
    const response = await fetch("http://localhost:3001/recipes/", {
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
            const response = await fetch("http://localhost:3001/recipes/addLike/", {
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
        setForceUpdate(true);
  };

  // const handleStarButton = async (numOfStars, recipeName) => {
  //   const sanitizedName = numOfStars.replace(/"/g, '');
  //     if(!starTouched){
  //         const response = await fetch("http://localhost:3001/recipes/addStar/", {
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
  //         const counterResponse = await fetch("http://localhost:3001/recipes/removeStar/", {
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
//     const response = await fetch(`http://localhost:3001/recipes/${sanitizedIngredientName}`, {
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
      {!isIngredient ? (sortedRecipes.map(
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
          numLikes,
        }) => (
            (<Box style={recipeStyle} key= {_id} id={recipeName}>
                <Box style={{display: 'flex', flexDirection: 'column', padding: '2%', lineHeight: '200%'}}>
                <Image image={imagePath} width={'400px'} height={'100%'} title={recipeName} />  
                {(numLikes === 0 || numLikes === null || numLikes === undefined) ? (
                      <span>Number of Likes: 0 people</span>
                  ): (
                      <span>Number of Likes: {numLikes} people</span>
                  )}
                </Box>
                <Box style={descriptionStyle} onClick={() => {setRecipeToIngredient(!isIngredient); setIngredient(ingredientList);}}>
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
                <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center',flexGrow: '1'}}>
                    <IconButton onClick={() => {setForceUpdate(true);handleLikeButton(recipeName);}} >
                        {(likes.includes(recipeName) ? (
                            <FavoriteIcon sx={{ fontSize: '200%' }} />
                        ) : (
                            <FavoriteBorderIcon sx={{ fontSize: '200%' }} />
                        ))}
                    </IconButton>
                </Box>
                {/* <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexGrow: '1', flexDirection: 'column' }}>
                  {ArrayOfUsers != undefined || ArrayOfUsers.length != 0 || ArrayOfUsers != null ? (
                    ArrayOfUsers.map((rr) => {
                      if (rr.email === getUser.email) {
                        const starButtons = [];
                        for (let i = 1; i < rr.numStar; i++) {
                          starButtons.push(
                            <IconButton key={i} onClick={() => { handleStarButton(i, recipeName); }}>
                              <StarIcon sx={{ fontSize: '200%' }} />
                            </IconButton>
                          );
                        }
                        for (let i = rr.numStar + 1; i < 5 + rr.numStar; i++) {
                          starButtons.push(
                            <IconButton key={i} onClick={() => { handleStarButton(i, recipeName); }}>
                              <StarBorderIcon sx={{ fontSize: '200%' }} />
                            </IconButton>
                          );
                        }
                        return starButtons;
                      } else {
                        const starButtons = [];
                        for (let i = 1; i < 6; i++) {
                          starButtons.push(
                            <IconButton key={i} onClick={() => { handleStarButton(i, recipeName); }}>
                              <StarBorderIcon sx={{ fontSize: '200%' }} />
                            </IconButton>
                          );
                        }
                        return starButtons;
                      }
                    })
                  ) : (
                    console.log(ArrayOfUsers)

                    [1, 2, 3, 4, 5].map((i) => { 
                      const starButtons = [];
                      starButtons.push(
                      <IconButton key={i} onClick={() => { handleStarButton(i, recipeName); }}>
                        <StarBorderIcon sx={{ fontSize: '200%' }} />
                      </IconButton>
                      )
                      return starButtons;
                    })
                  )}
                </Box> */}
                </Box>)
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
                                    (<Box style={recipeStyle} key= {_id} onClick={() => {setRecipeToIngredient(!isIngredient);}}>
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
                                    </Box>)
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


    </>
    
  );
}
catch(err){
    console.log(err);
}
}  

export default Recipes;
