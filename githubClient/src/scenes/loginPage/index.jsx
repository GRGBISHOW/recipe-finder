import { Box, Typography, useMediaQuery } from "@mui/material";
import Form from "./Form";
import './index.css';

const LoginPage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  return (
    <Box
    display='flex'  
    alignItems= 'center'
    justifyContent= 'center'
    >
      <Box
        display='flex' 
        width= '100%'      
      >
        <Box className="iniBox">
          <Box className='upperLogoBox'>
            <img className="upperLogo" display='block' position='absolute' src='http://localhost:3000/assets/Group 26.svg' />
            <Box className='mainSlogan'>
              <Typography> 
                Cook With What You Have.
              </Typography>
              <Box position='relative' bottom='-100px' left='30px'>
                <img width='36%' src='http://localhost:3000/assets/Vector 5.svg' />
              </Box>
            </Box>
            <Box top='175px'left='320px' position='absolute' >
              <img width='620px' src='http://localhost:3000/assets/recipeImage.png' />
              <Box  width='500px' position='relative' right='420px' bottom='200px'>
                <img width='470px' src='http://localhost:3000/assets/Vector 4.png' />
            </Box>
            </Box>
          </Box>

        </Box>
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;
