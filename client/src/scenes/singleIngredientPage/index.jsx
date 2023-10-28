import { useEffect,useState,useRef } from "react";
import { useSelector } from "react-redux";
import Flex from "components/Flex";
import { useDispatch } from "react-redux";
import { Box, IconButton, InputBase, Typography } from "@mui/material";
import Ingredients from "scenes/ingredientPage";
import Image from "components/ImageWrapper";
import { setRecipes,setIngredients, setSelectedIngredient, setLikes, setSelectedRecipes } from "state";
import LowerBar from "scenes/lowerBar";
import { useNavigate } from "react-router-dom";
import CancelIcon from '@mui/icons-material/Cancel';
import {useMediaQuery} from "@mui/material";
import ActualLowerBar from "scenes/actualLowerBar";


let currentRecipes;



const SingleIngredient = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const ingredients = useSelector((state) => state.ingredients);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const [searchText, setSearchText] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const likes = useSelector((state) => state.likes);
  const recipes = useSelector((state) => state.recipes);
  const getUser = useSelector((state) => state.user);
  const selectedIngredient = useSelector((state) => state.selectedIngredient);
  const [extraIngredients, setExtraIngredients] = useState([selectedIngredient]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [startFlag, setStartFlag] = useState(false);

  const recipeFinderFromIngredientStyles = { 
    margin: '3%' , 
    padding: '3%' , 
    minWidth: '100%' ,
    backgroundColor:'#d6e6d5',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
 };


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

  useEffect(() => {
    //getAllRecipes();
    // getAllIngredients();
    currentRecipes = getRecipesByIngredientManual(selectedIngredient.name);
    setFilteredRecipes(currentRecipes);
    handleFilteredRecipes();

  }, [extraIngredients,showPopup]); // eslint-disable-line react-hooks/exhaustive-deps



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

  const handleFilteredRecipes = () => {
    if(extraIngredients.length !== 0){
      extraIngredients.map(
        (yy) => {
          currentRecipes.map(
            (gg) => {
              if(!gg.ingredientList.includes(yy.name)){
                currentRecipes = currentRecipes.filter((hh) => hh !== gg)
                setFilteredRecipes(currentRecipes);
              }
              return("nice");
            }
          )
          return('nice');
        }
      )
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

  const descriptionStyle = {
    padding: "4% 2% 4% 2%",
    fontFamily: 'sans-serif',
    lineHeight: '250%',
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
    const scrollToTopButton = document.getElementById('LowerBar');
      if(!startFlag){
        setStartFlag(true);
        scrollToTopButton.scrollIntoView()
      }
  }, [])

  return (
    <>
      <LowerBar />
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          height: '600px',
          justifyContent:'space-between',
        }}
      >
        <img src='https://onlygunicorn.xyz/assets/Vector 6.png' width='550px' height='280px' />
        <Box
              display='flex'
              justifyContent='center'
              flexDirection='column'
              >       
              <Box
                sx={{
                  display:'flex',
                  alignItems:'center',
                  justifyContent:'center',
                  maxWidth:'450px',
                  margin:"50px 0",                   
                }}
                >   
                <Typography                
                sx={{
                  width:'450px',
              color: '#105B27',
              textAlign: 'center',
              fontFamily: 'Quicksand',
              fontSize: '38px',
              fontStyle: 'normal',
              fontWeight: '700',
              position:'absolute',
              lineHeight: '49px' /* 272.222% */,
                }}>
                  Selected ingredient(s)
                </Typography>
                </Box>  
              {(extraIngredients.length !== 1) ? (
            <Box
            sx={{
              display:'flex',
              alignItems:'center',
              overflowX:'scroll',
              overflowY:'visible',
              position:'relative',
              width: '1200px',
              minHeight:'450px',
              right:'350px',
              backdropFilter:'blur(10px)',
              zIndex:'50',
            }}>         

                {extraIngredients.map((ee) => (
                <Box
                sx={{
                  display:'flex',
                  alignItems:'center',
                  justifyContent:'center',
                  width:'550px',
                  maxHeight:'350px',
                }}
                >   
                <Box
                key={ee._id} 
                sx={{
                  zIndex: '5',
                  marginRight: '60px',
                  paddingBottom: '30px',
                  boxShadow: '0 0 20px rgba(0,0,0,0.10)',
                  borderRadius: '30px',
                  height:'350px',
                }}>
                  <Box key={ee._id} sx={currentRecipePill} >
                      <Box style={{ display:'flex', height:'315px', margin:'30px',backgroundColor:'white', alignItems:'center', justifyContent:'center', borderRadius:'20px'}}>
                          <Image image={ee.imagePath} width={'234px'} height={'224px'} title={ee.name} />     
                      </Box>
                  </Box>
                  </Box>
              </Box>
              ))}
               </Box>
              )
              :(
                <Box
                sx={{
                  display:'flex',
                  alignItems:'center',
                  width:'350px',
                  justifyContent:'center',
                }}
                >   
                <Box
                key={selectedIngredient._id} 
                sx={{
                  zIndex: '5',
                  paddingBottom: '30px',
                  boxShadow: '0 0 20px rgba(0,0,0,0.10)',
                  borderRadius: '30px',
                  height:'350px',
                }}>
                  <Box key={selectedIngredient._id} sx={currentRecipePill} >
                      <Box style={{ display:'flex', height:'315px', margin:'30px',backgroundColor:'white', alignItems:'center', justifyContent:'center', borderRadius:'20px'}}>
                          <Image image={selectedIngredient.imagePath} width={'234px'} height={'224px'} title={selectedIngredient.name} />     
                      </Box>
                  </Box>                  
                </Box>
                </Box>
              )
            }
            </Box>                    
        <Box
          display= 'flex'
          alignItems= 'flex-end'
          justifyContent='flex-end'
          zIndex='1'
          height='110%'
          width= '600px'
          top= '-100px'
          position= 'relative'
        >
         <img  src='https://onlygunicorn.xyz/assets/Vector 5.png' width='250px' height='310px' />
        </Box>
      </Box>
      <Box
             sx={{
              marginTop:'35px',
              width:'100%',
              color: '#105B27',
              textAlign: 'center',
              fontFamily: 'Quicksand',
              fontSize: '15px',
              fontStyle: 'normal',
              fontWeight: '400',
              lineHeight: '49px' /* 272.222% */,
            }}>
                Add more ingredients:
            </Box>
      <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        height: '120px',
        justifyContent: 'center',
      }}>

      <Box sx={
                {
                  display: 'flex',
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
                fontFamily: 'Quicksand',
              }
              } placeholder="Search for more ingredients" />
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
                      zIndex: 6,
                      Typography:{
                        paddingLeft: '50px',
                      }
                    }}
                  >
                    {
                      ingredients.map((ii) => {
                        if (ii.name.toLowerCase().startsWith(searchText.toLowerCase())) {
                          return (
                            <Box key={ii.name} variant="body1" onClick={async() => {
                              await handleUserHistory({date:new Date().toLocaleString('en-US', {
                              day: '2-digit',
                              month: '2-digit',
                              hour: '2-digit',
                              minute: '2-digit',
                              hour12: false,
                            }), name: ii.name,type: 'ingredient'});
                              let updated = extraIngredients;
                              if (!updated.includes(ii)) {
                                updated.push(ii);
                              }
                              setExtraIngredients(updated);
                              setShowPopup(false);
                              handleFilteredRecipes();
                              setSearchText("");
                           }} 
                            sx={{ fontFamily: 'sans-serif', fontWeight: 'normal', fontSize: '1.5rem' ,
                            fontFamily: 'Quicksand',
                            fontWeight: '600',
                            background: "#fff",
                            margin:'8px',
                            borderRadius: '10px',
                            boxShadow: "0px 4px 9px rgba(0, 0, 0, 0.25)",
                            "&:hover": {
                              cursor: "pointer",
                              background: 'rgba(207, 208, 209,1)',
                              borderRadius: '10px'
                            }, }}>
                              <div style={{ padding:'2% 5%' }}>{ii.name}</div> <div  key={ii.name} style={{color: 'grey', fontSize:'15px', padding:`10px ${ii.name.length * 13}px`}}> -Ingredient</div>
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
        {
                  (extraIngredients.length > 0) && (
                    <Box 
                    style={{
                      display:'flex',
                      width: '100%',
                      height:'80px',
                      justifyContent: 'center',
                    }}>
                    {extraIngredients.map(

                    (uu) => (
                      <Box 
                      sx={{
                        borderRadius: '30px',
                        display: 'flex',
                        width: '120px',
                        padding: '10px 5px', 
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '20px',
                        color:'#fff',
                        fontSize: '16px',
                        fontFamily: 'quicksand',
                        backgroundColor: 'green',
                        margin: '0 10px',
                        transition:'opacity 0.3s',
                      "&:hover" : {
                        cursor: 'pointer',
                        opacity: '50%',
                      }
                      }} key={uu.name}
                      onClick={() => {
                        const updated=extraIngredients.filter((pp) => pp !== uu);
                        if(updated.length === 0){
                          navigate("/ingredients");
                        }
                        else if(updated.length === 1 && updated[0].name !== selectedIngredient.name){
                          dispatch(setSelectedIngredient({ selectedIngredient: updated[0] }));
                          navigate(`/ingredients/${updated[0].name}`);
                        }
                        setExtraIngredients(updated);
                        handleFilteredRecipes();
                        setFilteredRecipes(currentRecipes);
                      }}
                      >
                        {uu.name}
                      </Box>
                    )
                  )
                  }
                  </Box>
                  )
                }

      <Box
        display='flex'
        width='100%'
        minHeight='100%'
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
          {filteredRecipes.length === 0 ? (
                <Box style={{ color: 'red', fontSize:'20px', marginTop:'20px', fontFamily:'Quicksand' }}>
                  No Recipes Found :&#40;
                </Box>
              ):(
                <Box style={{ color: '#105B27', fontSize:'40px', marginTop:'20px', fontFamily:'Quicksand', fontWeight:'700', marginTop:'55px' }}>
                  {filteredRecipes.length} Recipes found!
                </Box>
              )} 
          </Box>
          
          <Box style={recipeInfoPillRecipe}>
            {(filteredRecipes.map(
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
                                            {rr.numLikes} Likes
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
                          borderRadius: '50%',
                          '&:hover':{
                            cursor:'pointer',
                          },
                        }}>
                        <img width='32px' src='https://onlygunicorn.xyz/assets/Heart2.svg' />                                                                             
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
                          },
                        }}>
                          <img width='32px' src='https://onlygunicorn.xyz/assets/Heart.svg' /> 
                          </Box>
                        )}                                                                               
                      </Box>
                  </Box>
              </Box>
                )
            ))}  
            </Box>
       </Box>    
       <ActualLowerBar />
    </>
  );
};

export default SingleIngredient;
