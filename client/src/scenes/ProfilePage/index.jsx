import { Box, useMediaQuery, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import LowerBar from "scenes/lowerBar";
import {Typography, InputBase} from "@mui/material";
import { red } from "@mui/material/colors"
import Image from "components/ImageWrapper";
import { useEffect, useState } from "react";
import { setLikes, setRecipes, setIngredients, setSelectedRecipes, setSelectedIngredient } from "state";
import { useNavigate } from "react-router-dom";
import ActualLowerBar from "scenes/actualLowerBar";



const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const [searchText, setSearchText] = useState("");
  const sortedRecipes = useSelector((state => state.sortedRecipes));
  const [showPopup, setShowPopup] = useState(false);
  const likes = useSelector((state) => state.likes);
  const recipes = useSelector((state) => state.recipes);
  const getUser = useSelector((state) => state.user);
  const [forceUpdate, setForceUpdate] = useState(false);


  function stableSort(arr, compareFn) {
    if (arr.length <= 1) {
      return arr.slice();
    }
  
    const middle = Math.floor(arr.length / 2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);
  
    return merge(stableSort(left, compareFn), stableSort(right, compareFn), compareFn);
  }


  const handleUserHistory = async(addedThing) => {
    try{
      const response = await fetch(
        "https://onlygunicorn.xyz/backend/user/getHistory",
        {
          method: 'PATCH',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user: user, toAdd: addedThing }),
        }
      );  
      const data = await response.json();
    }
    catch(err){
      console.log(err)
    }
  };

  const handleSearchInputChange = (event) => {
    const { value } = event.target;
    setSearchText(value);
    setShowPopup(value.length > 0); // Show the popup if the search text has content
  };
  
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
  
    return result.concat(left.slice(leftIndex), right.slice(rightIndex));
  }

    const getAllIngredients = async () => {
      const response = await fetch(`https://onlygunicorn.xyz/backend/recipes/getAllIngredients`, {
        method: "GET",
      });
      const data = await response.json();
      dispatch(setIngredients({ingredients: data}));
    };

  const recipePill = {
      width: '100vw',
      margin: '0.5% 0',
      backgroundColor:'#e9f8ee',
  };  

  const recipeInfoPillRecipe = {
      borderRadius: '8%',
      height:'100%',
      marginBottom: '30px',
      display:'flex',
      width:'100vw',
      flexWrap: 'wrap',
      scrollbarWidth: 'none',
      justifyContent: 'center',
      "&::WebkitScrollbar": { 
          width:'0',
          hieght:'0',
      },
  };

  const recipeInfoPill = {
    borderRadius: '8%',
    padding: '2%',
    height:'350px',
    marginBottom: '30px',
    display:'flex',
    overflowY: 'hidden',
    scrollbarWidth: 'none',
    "&::WebkitScrollbar": { 
        width:'0',
        hieght:'0',
    },
};

  const currentRecipePill = {
      width: '350px',
      height: '350px',
      flexShrink: '0',
  };

  const handleLikeButton = async (recipeName) => {
    const sanitizedIngredientName = recipeName.replace(/"/g, '');

        if(!likes.includes(recipeName)){
            const response = await fetch("https://onlygunicorn.xyz/backend/recipes/addLike/", {
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

            const counterResponse = await fetch("https://onlygunicorn.xyz/backend/recipes/removeLike/", {
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

  const getAllLikes = async (UserEmail) => {
    const sanitizedName = UserEmail.replace(/"/g, '');
    const response = await fetch("https://onlygunicorn.xyz/backend/user/allLiked", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: sanitizedName }),
    });
    const data = await response.json();
    dispatch(setLikes({ user: getUser,likes: data, token: getUser._id }));
  };

  const getAllRecipes = async () => {
    const response = await fetch("https://onlygunicorn.xyz/backend/recipes/", {
      method: "GET",
    });
    const data = await response.json();
    dispatch(setRecipes({ recipes: data }));
  };


  const recipeStyle ={
    padding: '2%',
    backgroundColor:'#d6e6d5',
    display: 'flex',
    borderTop: '1px solid black',
    display:'flex',
};


  const likesHeadingStyle = {
    padding: '2%',
    alignItems: 'center',
    fontFamily: 'sans-serif',
    display:'flex',
    fontSize: '30px',
  };

  const getRespectiveLike = (like) => {
    let data = {};
    recipes.map(
        (rr) => {
            if(rr.recipeName === like){
                data = rr;
                return rr;
            }
        }
    )
    return data;
  }

//   const sanitizedIngredientName = like.replace(/"/g, '');
//   const response = await fetch(`https://onlygunicorn.xyz/backend/recipes/getRecipeByLike/${sanitizedIngredientName}`,{
//       method : "POST",
//       headers: {
//           "Content-Type" : "application/json"
//       },
//       body: JSON.stringify({requiredRecipe: sanitizedIngredientName})
//   })
//   const data = await response.json();

  useEffect(() => {
    getAllRecipes();
    getAllLikes(getUser.email)
  }, [])

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
          <img src='https://onlygunicorn.xyz/assets/Heart.png' width='170px' height='170px' />
          <Typography
            sx={{
              color: 'var(--Dark-green, #105B27)',
              textAlign: 'center',
              fontFamily: 'Quicksand',
              fontSize: '50px',
              fontStyle: 'normal',
              fontWeight: '700',
              lineHeight: '82.44px',
              letterSpacing: '-0.274px',
            }}
          >
            Liked Recipes
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
        display='flex'
        width='100%'
        minHeight='100%'
        justifyContent='center'
        flexDirection='column'
        backgroundColor= '#e9f8ee'
        style={{ overflowY: 'visible' }}
      >
        <Box
        sx={{
          display: 'flex',
          width:'100%',
          height: '180px',
          zIndex: '5',
          justifyContent:'center',
        }}
        >
          <Box sx={
                {
                  display: 'flex',
                  marginTop: '60px',
                  backgroundColor: '#fff',
                  border: '3px solid #d4d4d4',
                  borderRadius: '10px',
                  height: '50px',
                  padding: '5px',
                  width: '500px', // Adjust the width as needed
                }}>
              <img width='60px' src='https://onlygunicorn.xyz/assets/magnify.svg' />
              <Box
                width= '100%'
                maxWidth= '450px'
                display='flex'     
                left='50px'        
                >
              <InputBase 
              value={searchText}
              onChange={handleSearchInputChange}
              sx={{
                minWidth:'393px',
                border: 'none',
                outline: 'none',
                padding: '8px 0px',
                fontSize: '16px',
              }
              } placeholder="Search your liked recipes" />
              <Box
              display='flex'
              height= '50px'
              alignSelf= 'center'
               >
              <IconButton position='absolute' onClick={() => navigate(`/camera`)}>
              <img width='32px' src='https://onlygunicorn.xyz/assets/Group 47.svg' />
            </IconButton>
              </Box>
              {showPopup && (
                  <Box
                    style={{
                      position: "relative",
                      width: "100%",
                      bottom:'-65px',
                      left: '-450px',
                      minWidth: '80%',
                      zIndex: 5,
                      Typography:{
                        paddingLeft: '50px',
                      }
                    }}
                  >
                    {
                      sortedRecipes.map((rr) => {
                        if (rr.recipeName.toLowerCase().startsWith(searchText.toLowerCase())) {
                          return (
                            <Box key={rr.recipeName} variant="body1" onClick={() => {
                              handleUserHistory({date:new Date().toLocaleString('en-US', {
                              day: '2-digit',
                              month: '2-digit',
                              hour: '2-digit',
                              minute: '2-digit',
                              hour12: false,
                            }), name: rr.recipeName,type: 'recipe'} );
                            dispatch(setSelectedRecipes({ selectedRecipes : rr })); 
                            navigate(`/recipes/${rr.recipeName}`);
                            }} 
                            sx={{ fontFamily: 'sans-serif', fontWeight: 'normal', fontSize: '1.5rem' ,
                            fontFamily: 'Quicksand',
                            fontWeight: '600',
                            background: "#fff",
                            borderRadius: '10px',
                            margin:'8px',
                            boxShadow: "0px 4px 9px rgba(0, 0, 0, 0.25)",
                            "&:hover": {
                              cursor: "pointer",
                              background: 'rgba(207, 208, 209,1)',
                              borderRadius: '10px',
                            }, }}>
                              <div key={Math.random()} style={{ padding:'2% 5%' }}>{rr.recipeName}</div><div key={rr.recipeName} style={{color: 'grey', fontSize:'15px', padding:`10px 10px 10px ${rr.recipeName.length * 13}px`}}> -Recipe</div>
                            </Box>
                          );
                          
                        }
                        return null;
                      })
                    }
                  </Box>
                )}
            </Box>
          </Box>
          </Box>
          <Box style={recipeInfoPillRecipe}>
             {
              (likes.length !== 0) ? (
                  likes.map((like) => {
                      const rr = getRespectiveLike(like);
                      return(
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
                                src={`https://onlygunicorn.xyz/backend/assets/${rr.imagePath}`} width={'100%'} height={'250px'} style={{ borderTopLeftRadius: '30px',borderTopRightRadius:'30px' , zIndex:'1'}} />                                                                                 
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
                              onClick={() => {setForceUpdate(true);handleLikeButton(rr.recipeName);}}
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
                                },
                              }}>
                              <img width='32px' src='https://onlygunicorn.xyz/assets/Heart2.svg' />                                                                             
                            </Box>
                            ):(
                            <Box
                              onClick={() => {setForceUpdate(true);handleLikeButton(rr.recipeName);}}
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
                                },
                              }}>
                                <img width='32px' src='https://onlygunicorn.xyz/assets/Heart.svg' /> 
                                </Box>
                              )}                                                                               
                            </Box>
                        </Box>
                    </Box>
                );
            })
              ) : (
                  <Box style={{ minWidth: '100vw', minHeight: '100vh' ,display: 'flex', justifyContent: 'center', paddingTop: '10%' }} key={Math.random()}>
                      <Typography               
                          onClick={() => {navigate('/recipes')}}
                          sx={{
                            minWidth:'100px',
                            borderRadius: '30px',
                            padding: '1% 2%',
                            margin: '1%',
                            fontSize: '17px',
                            display: 'flex',
                            justifyContent: 'center',
                            height: '55px',
                            color: '#ffffff',
                            fontFamily: 'Quicksand', 
                            backgroundColor: '#105B27',
                            transition: 'opacity 0.3s',
                            "&:hover" : {
                              cursor: 'pointer',
                              opacity: '50%',
                            }
                          }}
                      >
                          Likes are empty :&#40;<br />
                          Find new Recipes?
                      </Typography>
                  </Box>
              )
            }                
            </Box>
       </Box>  
       <ActualLowerBar />  
    </>
  );
};

export default ProfilePage;
