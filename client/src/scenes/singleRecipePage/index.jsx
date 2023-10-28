import { useEffect,useState } from "react";
import { useSelector } from "react-redux";
import Flex from "components/Flex";
import { useDispatch } from "react-redux";
import { Box, Typography } from "@mui/material";
import Image from "components/ImageWrapper";
import { setRecipes, setLikes } from "state";
import LowerBar from "scenes/lowerBar";
import Ingredients from "scenes/ingredientPage";
import ActualLowerBar from "scenes/actualLowerBar";


const SingleRecipe = () =>{
    const dispatch = useDispatch();
    const selectedRecipe = useSelector((state) => state.selectedRecipes);
    const [startFlag, setStartFlag] = useState(false);
    const likes = useSelector((state) => state.likes);
    const getUser = useSelector((state) => state.user);
    const [overFlag, setOverFlag] = useState(false);
    const [alwaysFlag, setAlwaysFlag] = useState(false);
    
      const descriptionStyle = {
            padding: "4% 2% 4% 2%",
            lineHeight: '250%',
            fontFamily:'Quicksand',
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

      const getAllRecipes = async () => {
        const response = await fetch("https://onlygunicorn.xyz/backend/recipes/", {
          method: "GET",
        });
        const data = await response.json();
        dispatch(setRecipes({ recipes: data }));
      };

      const handleHover = () => {
        setOverFlag(true);
      };
    
      const handleMouseLeave = () => {
        setOverFlag(false);
      };
    
      useEffect(() => {
        getAllRecipes();
        const scrollToTopButton = document.getElementById('LowerBar');
        if(!startFlag){
          setStartFlag(true);
          scrollToTopButton.scrollIntoView()
        }
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
        numLikes,
        } = selectedRecipe;

        return (
            <>
            <LowerBar />
            <Box
              sx={{
                display: 'flex',
                width: '100%',
                height: '600px',
                position:'relative',
                zIndex:'500',
                backgroundImage: `url(https://onlygunicorn.xyz/backend/assets/${selectedRecipe.imagePath})`,
                backgroundSize: 'cover',
                "&::before": {
                  content: "''",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background: "rgba(0, 0, 0, 0.5)",
                  zIndex: 1,
                }
              }}
            >
              <Box
              sx={{
                display:'flex',
                alignItems:'center',
                justifyContent: 'center',
                flexDirection: 'column',
                color: '#fff',
                zIndex:'4',
                width:'100%',
              }}>
                <Typography
                sx={{
                  fontFamily:'quicksand',
                  fontWeight:'700',
                  fontSize:'40px',
                }}>
                  {recipeName}
                </Typography>
                <Typography
                sx={{
                  fontFamily:'quicksand',
                  fontWeight:'700',
                  fontSize:'25px',
                }}>
                  {numLikes} Likes
                </Typography>
                <Typography
                sx={{
                  margin:'50px 0',
                  fontFamily:'quicksand',
                  fontWeight:'400',
                  fontSize:'20px',
                }}>
                  {description}
                </Typography>
                <Box
                sx={{
                  display:'flex',
                  marginTop:'30px',
                  alignItems:'center',
                  justifyContent: 'center',
                  color: '#fff',
                  zIndex:'4',
                  width:'100%',
                }}>
                 <Box
                 marginRight='30px'
                 >
                  <img width='100px'
                     height='100px' 
                     src={`https://onlygunicorn.xyz/assets/Vector88.svg`} />
                  <Typography
                  textAlign='center'
                  sx={{
                    fontFamily:'quicksand',
                    fontWeight:'600',
                    fontSize:'20px',                    
                  }}
                  >
                    Cook
                  </Typography><br />
                  <Typography
                  textAlign='center'
                  sx={{
                    fontFamily:'quicksand',
                    fontWeight:'600',
                    fontSize:'20px',                    
                  }}
                  >
                    {cookingTime} min.
                  </Typography>
                 </Box>
                 <Box
                   marginLeft='50px'                 
                 >
                  <img width='100px'
                     height='100px' 
                     src={`https://onlygunicorn.xyz/assets/Vector66.svg`} />
                     <Typography
                  textAlign='center'
                  sx={{
                    fontFamily:'quicksand',
                    fontWeight:'600',
                    fontSize:'20px',                    
                  }}
                  >
                    Serves
                  </Typography><br />
                  <Typography
                  textAlign='center'
                  sx={{
                    fontFamily:'quicksand',
                    fontWeight:'600',
                    fontSize:'20px',                    
                  }}
                  >
                    {servings} people
                  </Typography>
                 </Box>
                </Box>
                <Box
                onMouseEnter={handleHover}
                onMouseLeave={handleMouseLeave}
                sx={{
                  display:'flex',
                  alignItems:'center',
                  justifyContent: 'flex-end',
                  marginRight:'50px',
                  color: '#fff',
                  zIndex:'4',
                  width:'100%',
                  '&:hover':{
                    cursor:'pointer',
                  }
                }}
                >
                  <Box>
                 {(overFlag || alwaysFlag || (likes.includes(recipeName))) ? 
                 (                 
                  <Box
                  onClick={() => {
                    handleLikeButton(recipeName);
                    setAlwaysFlag(!alwaysFlag);
                  }}>
                 <img width='60px'
                 height='60px' 
                 src={`https://onlygunicorn.xyz/assets/Heart2.svg`} /> 
                 </Box>
                 ):
                 (
                  <Box
                  onClick={() => {
                    handleLikeButton(recipeName);
                    setAlwaysFlag(!alwaysFlag);
                  }}>
                  <img width='60px'
                 height='60px' 
                 src={`https://onlygunicorn.xyz/assets/Heart.svg`} />
                 </Box>
                 )}
                 </Box>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                zIndex:'10',
                flexWrap:'wrap',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#E9F8EE',
                position:'relative',
                borderRadius: '30px',
              }}
            >
            <Flex sx={{ flexDirection: 'column' ,padding: '3%', justifyContent: 'center',}} key={Math.random()}>
                    <Box style={descriptionStyle}>
                        <b>Description:-<br /></b>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{description}<br />
                        <b>Preparation Steps:-<br /></b>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{preparationSteps}<br />                        
                        <b>Ingredients List:-<br /></b>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{ingredientList.join(', ')}<br />
                        <b>Extra Information:-<br /></b>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{otherDetails}<br />
                    </Box>                              
          </Flex>
          </Box>
          <ActualLowerBar />
            </>
        );
    }


export default SingleRecipe;