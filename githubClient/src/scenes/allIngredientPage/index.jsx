import Ingredients from "scenes/ingredientPage";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { setIngredients, setSelectedIngredient } from "state";
import { useDispatch, useSelector } from "react-redux";
import LowerBar from "scenes/lowerBar";
import { useNavigate } from "react-router-dom";
import ActualLowerBar from "scenes/actualLowerBar";


let currentRecipes;

const AllIngredients = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const ingredient = useSelector((state) => state.ingredients)
    const selectedIngredient = useSelector((state) => state.selectedIngredient);
    const [startFlag, setStartFlag] = useState(false);

    const getAllIngredients = async() => {
        const response = fetch("http://localhost:3001/backend/getAllIngredients",{
            method: 'GET',
        });
        const data = await response.json();
        dispatch(setIngredients({ingredients: data}));
    }; 

      useEffect(() => {
        {
          const scrollToTopButton = document.getElementById('LowerBar');
      if(!startFlag){
        setStartFlag(true);
        scrollToTopButton.scrollIntoView()
      }
        getAllIngredients();
      }},[])

    // useEffect(() => {
    //     //getAllRecipes();
    //     // getAllIngredients();
    //     currentRecipes = getRecipesByIngredientManual(selectedIngredient.name);
    //     setFilteredRecipes(currentRecipes);
    //     handleFilteredRecipes();
    
    //   }, [extraIngredients]); // eslint-disable-line react-hooks/exhaustive-deps
    

    return(
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
                 All Ingredients
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
                                    src={`http://localhost:3001/backend/assets/${ii.imagePath}`} width={'100%'} height={'250px'} style={{ borderTopLeftRadius: '30px',borderTopRightRadius:'30px' , zIndex:'1'}} />                                                                                 
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
            <ActualLowerBar />
        </>
    );
};

export default AllIngredients;