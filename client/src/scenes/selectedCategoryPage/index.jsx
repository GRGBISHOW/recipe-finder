import { useSelector,useDispatch } from "react-redux";
import { Box } from "@mui/material";
import LowerBar from "scenes/lowerBar";
import Ingredients from "scenes/ingredientPage";
import { red } from "@mui/material/colors"
import {Typography} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { setSelectedIngredient, setIngredients } from "state";
import { useState, useEffect } from "react";
import ActualLowerBar from "scenes/actualLowerBar";
import Image from "components/ImageWrapper";


let currentRecipes;

const SelectedCategory = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const ingredient = useSelector((state) => state.ingredients)
    const selectedIngredient = useSelector((state) => state.selectedIngredient);
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [extraIngredients, setExtraIngredients] = useState([selectedIngredient]);
    const recipes = useSelector((state) => state.recipes);
    let selectedCategory = useSelector((state) => state.selectedCategory);
    const [currentCategoryData, setCurrentCategoryData] = useState([]);
    const [startFlag, setStartFlag] = useState(false);


    const currentRecipePill = {
      width: '350px',
      height: '450px',
      flexShrink: '0',
  };
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
        getIngredientsByCategory(selectedCategory.name);
        const scrollToTopButton = document.getElementById('LowerBar');
      if(!startFlag){
        setStartFlag(true);
        scrollToTopButton.scrollIntoView()
      }
      }, []); // eslint-disable-line react-hooks/exhaustive-deps
    

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
          width='250px'
          height='250px'
          src={`https://onlygunicorn.xyz/backend/assets/${selectedCategory.imagePath}`} />
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
                 {selectedCategory.name}
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
                currentCategoryData.length !== 0 ? (currentCategoryData.map(
                    (ii) => {
                        return (                                                    
                            <Box key={ii._id} style={{width:'350px',padding:'1% 0 1% 0'}} >
                            <Box key={ii._id} style={{width:'200px', height: '400px',padding:'1% 0 1% 0'}} >
                                  <Box key={ii._id} onClick={() => {dispatch(setSelectedIngredient({selectedIngredient: ii}));navigate(`/ingredients/${ii.name}`)}} sx={currentRecipePill} >
                                <Box style={{ display:'flex', height:'315px', margin:'30px',backgroundColor:'white', alignItems:'center', justifyContent:'center', borderRadius:'20px'}}>
                                    <Image image={ii.imagePath} width={'234px'} height={'224px'} title={ii.name} />     
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
            <ActualLowerBar />
        </>
    );
};

export default SelectedCategory;