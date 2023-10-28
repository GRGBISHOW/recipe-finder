import Ingredients from "scenes/ingredientPage";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { setIngredients, setSelectedIngredient } from "state";
import { useDispatch, useSelector } from "react-redux";
import LowerBar from "scenes/lowerBar";
import { useNavigate } from "react-router-dom";
import ActualLowerBar from "scenes/actualLowerBar";
import Image from "components/ImageWrapper";


let currentRecipes;

const AllIngredients = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const ingredient = useSelector((state) => state.ingredients)
    const selectedIngredient = useSelector((state) => state.selectedIngredient);
    const [startFlag, setStartFlag] = useState(false);

    const currentRecipePill = {
      width: '350px',
      height: '450px',
      flexShrink: '0',
  };

    const getAllIngredients = async() => {
        const response = fetch("https://onlygunicorn.xyz/backend/getAllIngredients",{
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
        <img src='https://onlygunicorn.xyz/assets/Vector 6.png' width='600px' height='280px' />
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
          src={`https://onlygunicorn.xyz/assets/Vector.png`} />
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
         <img  src='https://onlygunicorn.xyz/assets/Vector 5.png' width='250px' height='310px' />
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
                            <Box key={ii._id} style={{width:'350px', height: '400px',padding:'1% 0 1% 0'}} >
                                  <Box key={ii._id} onClick={() => {dispatch(setSelectedIngredient({selectedIngredient: ii}));navigate(`/ingredients/${ii.name}`)}} sx={currentRecipePill} >
                                <Box style={{ display:'flex', height:'315px', margin:'30px',backgroundColor:'white', alignItems:'center', justifyContent:'center', borderRadius:'20px'}}>
                                    <Image image={ii.imagePath} width={'234px'} height={'224px'} title={ii.name} />     
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