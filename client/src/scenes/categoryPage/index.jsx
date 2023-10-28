import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCategories, setSelectedCategory } from "state";
import { Box, Typography } from "@mui/material";
import LowerBar from "scenes/lowerBar";
import { useNavigate } from "react-router-dom";
import ActualLowerBar from "scenes/actualLowerBar";
import Image from "components/ImageWrapper";




const Categories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categories = useSelector((state) => state.categories);
  const [startFlag, setStartFlag] = useState(false);
  


  const recipeStyle = {
    padding: '0 2% 0 2%',
    backgroundColor:'#d6e6d5',
    display: 'flex',
    borderTop: '1px solid black',
    padding: '2%',
};


  const likesHeadingStyle = {
    padding: '1%',
    fontFamily: 'sans-serif',
    display:'flex',

  };

  const getAllCategories = async () => {
    const response = await fetch("https://onlygunicorn.xyz/backend/category/", {
      method: "GET",
    });
    const data = await response.json();
    dispatch(setCategories({ categories: data }));
  };

  const getIngredientByCategory = async (categoryName) => {
    const response = await fetch(`https://onlygunicorn.xyz/backend/category/${categoryName}`, {
      method: "GET",
    });
    const data = await response.json();
    dispatch(setCategories({ categories: data }));
  };

  if(!categories){
    getAllCategories();
  }

  const currentRecipePill = {
    width: '350px',
    height: '450px',
    flexShrink: '0',
};

  useEffect(() => {
    const scrollToTopButton = document.getElementById('LowerBar');
      if(!startFlag){
        setStartFlag(true);
        scrollToTopButton.scrollIntoView()
      }
   getAllCategories();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
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
                 All Categories
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
                categories.map(
                    (ii) => {
                        return (                                                    
                            <Box key={ii._id} style={{width:'350px',padding:'1% 0 0 0'}} >
                            <Box key={ii._id} style={{width:'300px', height: '400px',padding:'1% 0 1% 0'}} >
                                  <Box key={ii._id} onClick={() => {dispatch(setSelectedCategory({selectedCategory: ii}));navigate(`/category/${ii.name}`)}} sx={currentRecipePill} >
                                <Box style={{ display:'flex', height:'315px', margin:'30px',backgroundColor:'white', alignItems:'center', justifyContent:'center', borderRadius:'20px'}}>
                                    <Image image={ii.imagePath} width={'234px'} height={'224px'} title={ii.name} />     
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

export default Categories;

