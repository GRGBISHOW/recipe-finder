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



    const getIngredientsByCategory = async (selCategory) => {
        const sanitizedIngredientName = selCategory.replace(/"/g, '');
        const something= { categoryName: sanitizedIngredientName }
        const response = await fetch(`http://localhost:3001/backend/category/${selCategory}`, {
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
          width='250px'
          height='250px'
          src={`http://localhost:3001/backend/assets/${selectedCategory.imagePath}`} />
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