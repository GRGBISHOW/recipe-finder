import LowerBar from "scenes/lowerBar";
import ActualLowerBar from "scenes/actualLowerBar";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRecipes,setIngredients, setSelectedRecipes, setSelectedIngredient, setUserHistory, setCategories, setSelectedCategory, setSortedRecipes, setLikes } from "state";
import Image from "components/ImageWrapper";
import { Typography, InputBase, IconButton } from "@mui/material";


const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const ingredients = useSelector((state) => state.ingredients);
    const recipes = useSelector((state) => state.recipes);
    const categories = useSelector((state) => state.categories);
    const [searchText, setSearchText] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [startFlag, setStartFlag] = useState(false);
    const user = useSelector((state) => state.user);
    const getUser = user;
    const sortedRecipes = useSelector((state => state.sortedRecipes));
    const likes = useSelector((state) => state.likes);
    const [forceUpdate, setForceUpdate] = useState(false);
    const userHistory = useSelector((state) => state.userHistory);


    function stableSort(arr, compareFn) {
      if (arr.length <= 1) {
        return arr.slice();
      }
    
      const middle = Math.floor(arr.length / 2);
      const left = arr.slice(0, middle);
      const right = arr.slice(middle);
    
      return merge(stableSort(left, compareFn), stableSort(right, compareFn), compareFn);
    }

    const getUserr = async() => {
      const sanitizedName = user.email.replace(/"/g, '');
      const response = await fetch(
      `https://onlygunicorn.xyz/backend/user/getUser`,
      {
          method: "POST",
          headers: {
          "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: sanitizedName }),
      }
      );  
      const data = await response.json();
      dispatch(setUserHistory({ userHistory : data.history }))
  };


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

    const getAllRecipes = async () => {
        const response = await fetch("https://onlygunicorn.xyz/backend/recipes/", {
          method: "GET",
        });
        const data = await response.json();
        dispatch(setRecipes({ recipes: data }));
      };


      const getAllIngredients = async () => {
        const response = await fetch(`https://onlygunicorn.xyz/backend/recipes/getAllIngredients`, {
          method: "GET",
        });
        const data = await response.json();
        dispatch(setIngredients({ingredients: data}));
      };

    const recipePill = {
        width: '100%',
        paddingBottom: '50px',
        backgroundColor:'#e9f8ee',
        borderRadius: '30px',
    };  

    const recipeInfoPillRecipe = {
        borderRadius: '8%',
        height:'100%',
        marginBottom: '30px',
        display:'flex',
        width:'100%',
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
      marginLeft:'5%',
      height:'350px',
      marginBottom: '30px',
      display:'flex',
      overflowY: 'hidden',
      "&::WebkitScrollbar": { 
          width:'0',
          hieght:'0',
      },
  };

    const currentRecipePill = {
        width: '350px',
        height: '350px',
        flexShrink: '0',
        '&:hover': {
          cursor: 'pointer',
        },
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
    
    
    const getAllCategories = async() => {
      const response = await fetch(`https://onlygunicorn.xyz/backend/category/`,{
        method: 'GET'
      });
      const data = await response.json();
      dispatch(setCategories({categories : data}));
    };  

    useEffect(() => {
        const sorted = stableSort([...recipes], (a, b) => b.numLikes - a.numLikes);
        dispatch(setSortedRecipes({ sortedRecipes : sorted }));
        getAllIngredients();
        getUserr();
        getAllCategories();
        const scrollToTopButton = document.getElementById('LowerBar');
      if(!startFlag){
        setStartFlag(true);
        scrollToTopButton.scrollIntoView()
      }
    }, []);  // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
      getAllRecipes();
      const sorted = stableSort([...recipes], (a, b) => b.numLikes - a.numLikes);
      dispatch(setSortedRecipes({ sortedRecipes : sorted }));
      if (forceUpdate) {
        setForceUpdate(false);
      }
    }, [forceUpdate]); // eslint-disable-line react-hooks/exhaustive-deps

    return(
        <>
        <LowerBar />
        <Box
          display='flex'
          width='100%'
          justifyContent= 'space-between'
        >
          <Box
            paddingTop='200px'
          >
            <img width='300px' height='500px' src='https://onlygunicorn.xyz/assets/Group 2.png' />
          </Box>
          <Box 
            width='940px'
            paddingTop='108px'
            display='flex'
            flexDirection='column'
            alignItems= 'center'
          >
            <Typography
            
            sx={{
              color: 'var(--Dark-green, #105B27)',
              textAlign: 'center',
              fontFamily: 'Quicksand',
              fontSize: '64px',
              fontStyle: 'normal',
              fontWeight: '700',
              lineHeight: '82.44px', /* 128.812% */
              letterSpacing: '-0.274px',
            }}
            >
              Cook with What You Have.
            </Typography>
            <Typography
              sx={{
                width: '650px',
                color: 'var(--Dark-Blue, #263238)',
                textAlign: 'center',
                fontFamily: 'Quicksand',
                fontSize: '32px',
                fontStyle: 'normal',
                fontWeight: '400',
                lineHeight: '49px' /* 153.125% */,
              }}
            >
              Just enter what's in your fridge, and we'll find recipes tailored to you.
            </Typography>
            <Box sx={
                {
                  display: 'flex',
                  marginTop: '30px',
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
              } placeholder="Search..." />
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
                              handleUserHistory(({ date:new Date().toLocaleString('en-US', {
                              day: '2-digit',
                              month: '2-digit',
                              hour: '2-digit',
                              minute: '2-digit',
                              hour12: false,
                            }), name: rr.recipeName, type: 'recipe'}));
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
                            }) , name: ii.name, type: 'ingredient'});
                            dispatch(setSelectedIngredient({ selectedIngredient : ii}));
                            navigate(`/ingredients/${ii.name}`);
                            navigate(0);
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

                    {(!sortedRecipes.some((rr) => rr.recipeName.toLowerCase().startsWith(searchText.toLowerCase())) && !ingredients.some((ii) => ii.name.toLowerCase().startsWith(searchText.toLowerCase()))) && (
                      <Typography variant="body1" sx={{ width:'250px',
                      color: '#105B27',
                      textAlign: 'center',
                      fontFamily: 'Quicksand',
                      fontSize: '15px',
                      fontStyle: 'normal',
                      background: "#fff",
                      borderRadius: '10px',
                      margin:'8px',
                      boxShadow: "0px 4px 9px rgba(0, 0, 0, 0.25)",
                      fontWeight: '400',
                      lineHeight: '49px' /* 272.222% */, }}>
                        Empty :&#40;
                      </Typography>
                      )
                    }
                  </Box>
                )}
            </Box>
            </Box>
            <Box
             sx={{
              width:'250px',
              color: '#105B27',
              textAlign: 'center',
              fontFamily: 'Quicksand',
              fontSize: '15px',
              fontStyle: 'normal',
              fontWeight: '400',
              lineHeight: '49px' /* 272.222% */,
            }}>
                Recent History
            </Box>
            <Box
              sx={{
                width: '500px',
                display: 'flex',
                flexWrap:'wrap',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
            {
              (userHistory.slice().reverse().slice(0,5)).map(
                (cc) => {
                  return(
                    <Box key={cc._id} sx={{
                      borderRadius: '30px',
                      padding: '1.5% 5%',
                      margin: '1%',
                      fontSize: '17px',
                      display: 'flex',
                      justifyContent: 'center',
                      color: '#ffffff',
                      fontFamily: 'Quicksand', 
                      backgroundColor: '#105B27',
                      transition:'opacity 0.3s',
                      "&:hover" : {
                        cursor: 'pointer',
                        opacity: '50%',
                      }
                    }}
                    
                    onClick={() =>{
                      if(cc.type === 'recipe'){
                        recipes.map((ii) => {
                          if(ii.recipeName === cc.name){
                            dispatch(setSelectedRecipes({selectedRecipes: ii}));
                            navigate(`/recipes/${cc.name}`);    
                          }                          
                        })                                         
                      }else{
                        ingredients.map((ii) => {
                          if(ii.name === cc.name){
                            dispatch(setSelectedIngredient({selectedIngredient: ii}));
                          navigate(`/ingredients/${cc.name}`);    
                          navigate(0);
                          }                          
                        })                          
                        
                      }}
                    }
                    >
                      {cc.name}
                      </Box>
                    );
                  }
                )
              }
            </Box>
          </Box>
          <Box
            paddingBottom='200px'
          >
            <img width='300px' height='500px' src='https://onlygunicorn.xyz/assets/Group 1.png' />
          </Box>
        </Box>
        <Box style={recipePill}>
        <Box
        display='flex'
        paddingRight='50px'
        alignItems='center'> 
         <Typography
         sx={{
          color: 'var(--Dark-green, #105B27)',
          fontFamily: 'Quicksand',
          fontSize: '54px',
          fontStyle: 'normal',
          fontWeight: '700',
          lineHeight: '82.44px; /* 128.812% *',
          letterSpacing: '-0.274px',
         }}
           margin='50px 10px 10px 60px'
         >
          Categories
          </Typography> 
          <Box onClick={() => navigate("/category")} 
            sx={{
              minWidth:'100px',
                      borderRadius: '30px',
                      padding: '1% 2%',
                      margin:'50px 10px 10px 60px',
                      fontSize: '17px',
                      display: 'flex',
                      width:'230px',
                      justifyContent: 'center',
                      color: '#ffffff',
                      fontFamily: 'Quicksand', 
                      backgroundColor: '#105B27',
                      transition:'opacity 0.3s',
                      "&:hover" : {
                        cursor: 'pointer',
                        opacity: '50%',
                      }

            }}
            >
               View more Categories
              </Box></Box>
                <Box style={recipeInfoPill}>
                    {
                    categories.slice(0,8).map(
                        (ii) => {
                            return(
                                <Box key={ii._id} sx={currentRecipePill} onClick={() => {dispatch(setSelectedCategory({selectedCategory : ii }));navigate(`/category/${ii.name}`)}} >
                                    <Box style={{ display:'flex', height:'90%', margin:'30px',backgroundColor:'white', alignItems:'center', justifyContent:'center', borderRadius:'20px'}}>
                                        <Image image={ii.imagePath} width={'90%'} height={'85%'} title={ii.name} />     
                                    </Box>
                                </Box>
                            );
                        }
                    )
                }   
            </Box>
        <Box
        display='flex'
        paddingRight='50px'
        alignItems='center'> 
         <Typography
         sx={{
          color: 'var(--Dark-green, #105B27)',
          fontFamily: 'Quicksand',
          fontSize: '54px',
          fontStyle: 'normal',
          fontWeight: '700',
          lineHeight: '82.44px; /* 128.812% *',
          letterSpacing: '-0.274px',
         }}
           margin='50px 10px 10px 60px'
         >
          Ingredients
          </Typography> 
          <Box onClick={() => navigate("/ingredients")} 
            sx={{
              minWidth:'100px',
                      borderRadius: '30px',
                      padding: '1% 2%',
                      margin:'50px 10px 10px 60px',
                      fontSize: '17px',
                      display: 'flex',
                      justifyContent: 'center',
                      width:'230px',
                      color: '#ffffff',
                      fontFamily: 'Quicksand', 
                      backgroundColor: '#105B27',
                      transition:'opacity 0.3s',
                      "&:hover" : {
                        cursor: 'pointer',
                        opacity: '50%',
                      }

            }}
            >
               View more Ingredients
              </Box></Box>
                <Box style={recipeInfoPill}>
                    {
                    ingredients.slice(0,8).map(
                        (ii) => {
                            return(
                                <Box key={ii._id} sx={currentRecipePill} onClick={() => {dispatch(setSelectedIngredient({selectedIngredient : ii }));navigate(`/ingredients/${ii.name}`)}} >
                                    <Box style={{ display:'flex', height:'90%', margin:'30px',backgroundColor:'white', alignItems:'center', justifyContent:'center', borderRadius:'20px'}}>
                                        <Image image={ii.imagePath} width={'90%'} height={'85%'} title={ii.name} />     
                                    </Box>
                                </Box>
                            );
                        }
                    )
                }   
            </Box>
            <Box
        display='flex'
        paddingRight='50px'
        alignItems='center'> 
         <Typography
         sx={{
          margin:'50px 10px 10px 60px',
          color: 'var(--Dark-green, #105B27)',
          fontFamily: 'Quicksand',
          fontSize: '54px',
          fontStyle: 'normal',
          fontWeight: '700',
          lineHeight: '82.44px; /* 128.812% *',
          letterSpacing: '-0.274px',
         }}
           margin='10px 10px 10px 60px'
         >
          Popular Recipes
          </Typography> 
          <Box onClick={() => navigate("/recipes")} 
            sx={{
              minWidth:'100px',
                      borderRadius: '30px',
                      padding: '1% 2%',
                      margin:'50px 10px 10px 60px',
                      fontSize: '17px',
                      width:'230px',
                      display: 'flex',
                      justifyContent: 'center',
                      color: '#ffffff',
                      fontFamily: 'Quicksand', 
                      backgroundColor: '#105B27',
                      transition:'opacity 0.3s',
                      "&:hover" : {
                        cursor: 'pointer',
                        opacity: '50%',
                      }
            }}
            >
               View more Recipes
              </Box></Box>
            <Box style={recipeInfoPillRecipe}>
                {
                    recipes.slice(0,6).map(
                        (rr) => {
                            return(
                                <Box key={rr._id} style={{width:'400px',padding:'1% 0 1% 0', margin: '1% 0'}} >
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
                        }
                    )
                }
            </Box>
        </Box>
        <ActualLowerBar />
        </>
    );

};

export default Home;