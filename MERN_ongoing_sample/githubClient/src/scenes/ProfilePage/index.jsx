import { Box, useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import LowerBar from "scenes/lowerBar";
import {Typography} from "@mui/material";
import { red } from "@mui/material/colors"
import Image from "components/ImageWrapper";
import { useEffect } from "react";
import { setLikes, setRecipes } from "state";



const ProfilePage = () => {
  const dispatch = useDispatch();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const likes = useSelector((state) => state.likes);
  const recipes = useSelector((state) => state.recipes);
  const getUser = useSelector((state) => state.user);

  const getAllLikes = async (UserEmail) => {
    const sanitizedName = UserEmail.replace(/"/g, '');
    const response = await fetch("http://localhost:3001/user/allLiked", {
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
    const response = await fetch("http://localhost:3001/recipes/", {
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
//   const response = await fetch(`http://localhost:3001/recipes/getRecipeByLike/${sanitizedIngredientName}`,{
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
      <LowerBar />{
        (likes.length !== 0) ? (
            likes.map((like) => {
                const { recipeName, imagePath, cookingTime } = getRespectiveLike(like);
                return(
                    <Box style={recipeStyle} key={like}>
                        <Box key= {like}  display= "flex" justifyContent= "center">
                            <Image image={imagePath} width={"200px"} height={"200px"}  title={"Time: " + cookingTime + " min."} />
                        </Box>
                        <Box style={likesHeadingStyle}>
                            <p>{recipeName}</p>
                            <br />
                            <br />
                        </Box>
                    </Box>
                );
            })
        ) : (
            <Box style={{ minWidth: '100vw', minHeight: '100vh' ,display: 'flex', justifyContent: 'center', paddingTop: '10%' }} key={Math.random()}>
                <Typography               
                
                    sx={{
                        color: red[200],
                        fontSize: "200%"
                    }}
                >
                    Likes are empty :&#40;
                </Typography>
            </Box>
        )
      }
    </>
  );
};

export default ProfilePage;
