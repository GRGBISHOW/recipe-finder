import LowerBar from "scenes/lowerBar";
import { Box } from "@mui/system";
import Flex from "components/Flex";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRecipes,setIngredients, setSelectedRecipes, setSelectedIngredient, setCategories, setSelectedCategory } from "state";
import Image from "components/ImageWrapper";

const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const ingredients = useSelector((state) => state.ingredients);
    const recipes = useSelector((state) => state.recipes);
    const categories = useSelector((state) => state.categories);

    const getAllRecipes = async () => {
        const response = await fetch("http://localhost:3001/recipes/", {
          method: "GET",
        });
        const data = await response.json();
        dispatch(setRecipes({ recipes: data }));
      };


      const getAllIngredients = async () => {
        const response = await fetch(`http://localhost:3001/recipes/getAllIngredients`, {
          method: "GET",
        });
        const data = await response.json();
        dispatch(setIngredients({ingredients: data}));
      };

    const recipePill = {
        width: '100vw',
        margin: '0.5% 0',
    };  

    const recipeInfoPill = {
        backgroundColor:'#d6e6d5',
        borderRadius: '8%',
        padding: '2%',
        height:'300px',
        marginBottom: '30px',
        display:'flex',
        overflowX: 'scroll',
        overflowY: 'hidden',
        scrollbarWidth: 'none',
        "&::WebkitScrollbar": { 
            width:'0',
            hieght:'0',
        },
    };

    const currentRecipePill = {
        height: '98%',
        margin: '0 2%',
        minWidth: '350px',
        borderRadius: '6%',
        boxShadow: '1px 2px 3px rgba(0,0,0,0.5)',        
    };

    const getIngredientsByCategory = async (selCategory) => {
        const sanitizedIngredientName = selCategory.replace(/"/g, '');
        const something= { categoryName: sanitizedIngredientName }
        const response = await fetch(`http://localhost:3001/category/${selCategory}`, {
          method: 'POST',
          headers: {
            "Content-Type" : "application/json",
          },
          body: JSON.stringify(something),
        });
        const data = await response.json();
        dispatch(setSelectedCategory({ selectedCategory: data }));
      };

      const getAllCategories = async() => {
        const response = await fetch(`http://localhost:3001/category/`,{
          method: 'GET'
        });
        const data = await response.json();
        dispatch(setCategories({categories : data}));
      };  
    

    useEffect(() => {
        getAllIngredients();
        getAllRecipes();
        getAllCategories();
    }, []);  // eslint-disable-line react-hooks/exhaustive-deps

    return(
        <>
        <LowerBar />
        <Flex sx={{overflowX: 'scroll',
        scrollbarWidth: 'none',
      }}>
      {
        categories.map(
          (cc) => {
            return(
              <Box key={cc._id} sx={{
                width: '60%',
                borderRadius: '50%',
                padding: '1%',
                margin: '1%',
                fontSize: '20px',
                display: 'flex',
                justifyContent: 'center',
                backgroundColor: 'green',
                "&:hover" : {
                  cursor: 'pointer',
                  backgroundColor: 'grey',
                }
              }}
              
              onClick={
                async() => {
                  await getIngredientsByCategory(cc.name);
                  navigate(`/category/${cc.name}`);
                }
              }
              >
                {cc.name}
              </Box>
            );
          }
        )
      }
    </Flex>
        <Box style={recipePill}>
            <Box style={{ display: 'flex',fontSize:'25px', padding:'1% 2%', fontWeight: 'bold' }}> Recipes <Box onClick={() => navigate("/recipes")} sx={{
                marginLeft: 'auto',
                fontSize:'20px',
                padding:'0% 2%', 
                fontWeight: 'bold',
                "&:hover": {
                    cursor: "pointer",
                    color: "rgb(222, 222, 222)",
                 },
                }}><u>See All</u></Box></Box>
            <Box style={recipeInfoPill}>
                {
                    recipes.slice(0,8).map(
                        (rr) => {
                            return(
                                <Box key={rr._id} style={currentRecipePill} onClick={() => {dispatch(setSelectedRecipes({selectedRecipes : rr}));navigate(`/recipes/${rr.recipeName}`)}} >
                                    <Box style={{ display:'flex', height:'100%'}}>
                                        <Image image={rr.imagePath} width={'90%'} height={'90%'} title={rr.recipeName} />     
                                    </Box>
                                </Box>
                            );
                        }
                    )
                }
            </Box>
        </Box>
        
        <Box style={recipePill}>
            <Box style={{ display: 'flex',fontSize:'25px', padding:'1% 2%', fontWeight: 'bold' }}> Ingredients <Box onClick={() => navigate("/ingredients")} sx={{ 
                marginLeft: 'auto',
                fontSize:'20px',
                padding:'0% 2%', 
                fontWeight: 'bold',
                "&:hover": {
                    cursor: "pointer",
                    color: "rgb(222, 222, 222)",
                },
        }}><u>See All</u></Box></Box>
            <Box style={recipeInfoPill}>
                {
                    ingredients.slice(0,8).map(
                        (ii) => {
                            return(
                                <Box key={ii._id} style={currentRecipePill} onClick={() => {dispatch(setSelectedIngredient({selectedIngredient : ii }));navigate(`/ingredients/${ii.name}`)}} >
                                    <Box style={{ display:'flex', height:'100%'}}>
                                        <Image image={ii.imagePath} width={'90%'} height={'90%'} title={ii.name} />     
                                    </Box>
                                </Box>
                            );
                        }
                    )
                }   
            </Box>
        </Box>
        </>
    );

};

export default Home;