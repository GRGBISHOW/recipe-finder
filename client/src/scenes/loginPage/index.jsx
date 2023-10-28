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
    width='100%'
    height= '100%'
    >
      <Box
        display='flex' 
        width= '100%'  
        height= '100vh'
        sx={{
          overflowY: 'hidden',
            }}    >
        <Box className="iniBox">
          <Box className='upperLogoBox'>
            <img className="upperLogo" display='block' position='absolute' src='https://onlygunicorn.xyz/assets/Group 26.svg' />
            <Box className='mainSlogan'>
              <Typography> 
                Cook With What You Have.
              </Typography>
              <Box position='relative' bottom='-100px' left='30px'>
                <img width='270px' src='https://onlygunicorn.xyz/assets/Vector 5.svg' />
              </Box>
            </Box>
            <Box height='616px' top='-175px' left='225px' position='relative' sx={{alignSelf:'flex-end'}} >
              <img width='620px' src='https://onlygunicorn.xyz/assets/recipeImage.png' />
              </Box>
              <Box  width='500px' position='relative' bottom='250px'>
                <img width='470px' src='https://onlygunicorn.xyz/assets/Vector 4.png' />
            </Box>
          </Box>

        </Box>
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;
