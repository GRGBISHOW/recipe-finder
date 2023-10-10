import Ingredients from "scenes/ingredientPage";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { setIngredients, setSelectedIngredient } from "state";
import { useDispatch, useSelector } from "react-redux";
import LowerBar from "scenes/lowerBar";
import { useNavigate } from "react-router-dom";

let currentRecipes;

const AllIngredients = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const ingredient = useSelector((state) => state.ingredients)
    const selectedIngredient = useSelector((state) => state.selectedIngredient);
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [extraIngredients, setExtraIngredients] = useState([selectedIngredient]);
    const recipes = useSelector((state) => state.recipes);



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

    // const getAllIngredients = async() => {
    //     const response = fetch("https://onlygunicorn.xyz/backend/getAllIngredients",{
    //         method: 'GET',
    //     });
    //     const data = await response.json();
    //     dispatch(setIngredients({ingredients: data}));
    // }; 

    // useEffect(() => {
    //     getAllIngredients();
    // }, []);

    useEffect(() => {
        //getAllRecipes();
        // getAllIngredients();
        currentRecipes = getRecipesByIngredientManual(selectedIngredient.name);
        setFilteredRecipes(currentRecipes);
        handleFilteredRecipes();
    
      }, [extraIngredients]); // eslint-disable-line react-hooks/exhaustive-deps
    

    return(
        <> 
            <LowerBar />
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
                ingredient.map(
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
            }
            </Box>
        </>
    );
};

export default AllIngredients;