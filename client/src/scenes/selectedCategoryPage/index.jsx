import { useSelector,useDispatch } from "react-redux";
import { Box } from "@mui/material";
import LowerBar from "scenes/lowerBar";
import Ingredients from "scenes/ingredientPage";
import { red } from "@mui/material/colors"
import {Typography} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { setSelectedIngredient, setIngredients } from "state";
import { useState, useEffect } from "react";


let currentRecipes;

const SelectedCategory = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const ingredient = useSelector((state) => state.ingredients)
    const selectedIngredient = useSelector((state) => state.selectedIngredient);
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [extraIngredients, setExtraIngredients] = useState([selectedIngredient]);
    const recipes = useSelector((state) => state.recipes);
    let selectedCategory = useParams();
    selectedCategory = selectedCategory.categoryName;
    const [currentCategoryData, setCurrentCategoryData] = useState([]);



    const getIngredientsByCategory = async (selCategory) => {
        const sanitizedIngredientName = selCategory.replace(/"/g, '');
        const something= { categoryName: sanitizedIngredientName }
        const response = await fetch(`https://onlygunicorn.xyz/backend/category/${selCategory}`, {
          method: 'POST',
          headers: {
            "Content-Type" : "application/json",
          },
          body: JSON.stringify(something),
        });
        const data = await response.json();
        setCurrentCategoryData(data);
      };


    // useEffect(() => {
    //     getAllIngredients();
    // }, []);

    useEffect(() => {
        //getAllRecipes();
        getIngredientsByCategory(selectedCategory);
      }, []); // eslint-disable-line react-hooks/exhaustive-deps
    

    return(
        <> 
            <LowerBar />
            <Box
            display= 'flex'
            alignItems='center'
            justifyContent='center'
            width= '100%'
            height= '230px'
            >
                <Typography
                sx={{
                    color: 'var(--Dark-green, #105B27)',
                    fontFamily: 'Quicksand',
                    fontSize: '64px',
                    fontStyle: 'normal',
                    fontWeight: '700',
                    lineHeight: '82.44px',
                    letterSpacing: '-0.274px',
                }}
                >
                {selectedCategory} 
                </Typography>
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
            {
                currentCategoryData.length !== 0 ? (currentCategoryData.map(
                    (ii) => {
                        return (                                                    
                            <Box key={ii._id} style={{width:'400px',padding:'1% 0 1% 0'}} >
                            <Box style={{ display:'flex', height:'92%' ,backgroundColor:'white',margin:'30px', borderRadius:'30px', flexDirection:'column' , boxShadow: '1px 1px 8px rgba(0,0,0,0.3'}}>
                                <Box
                                 key={ii.name} onClick={() => {dispatch(setSelectedIngredient({selectedIngredient: ii}));navigate(`/ingredients/${ii.name}`)}}
                                 sx={{
                                  '&:hover':{
                                    cursor: 'pointer',
                                  }
                                }}
                                >
                                  <img                                         
                                    src={`https://onlygunicorn.xyz/backend/assets/${ii.imagePath}`} width={'100%'} height={'250px'} style={{ borderTopLeftRadius: '30px',borderTopRightRadius:'30px' , zIndex:'1'}} />                                                                                 
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
                                    {ii.name}
                                  </Typography> 
                                  </Box>                                                                                                       
                                </Box>
                            </Box>
                            </Box>
                          )
                    }
                )
                ):(
                    <Box style={{ minWidth: '100vw', minHeight: '100vh' ,display: 'flex', justifyContent: 'center', paddingTop: '10%' }} key={Math.random()}>
                        <Typography               
                            onClick={() => {navigate('/ingredients')}}
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
                              "&:hover" : {
                                cursor: 'pointer',
                                fontWeight: '700',
                              }
                            }}
                        >
                            There are no ingredients in this is category :&#40;<br />
                            Find other Ingredients?
                        </Typography>
                    </Box>
                )
            }
            </Box>
        </>
    );
};

export default SelectedCategory;