import { Box, Typography, useMediaQuery } from "@mui/material";
import Form from "./Form";
import './index.css';

const LoginPage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  return (
    <Box>
      <Box
        display='flex'        
      >
        <Box className="iniBox">
          <Box className='upperLogoBox'>
            <img className="upperLogo" display='block' position='absolute' src='https://onlygunicorn.xyz/assets/Group 26.svg' />
            <Box className='mainSlogan'>
              <Typography> 
                Cook With What You Have.
              </Typography>
              <Box position='relative' bottom='-100px' left='30px'>
                <img width='36%' src='https://onlygunicorn.xyz/assets/Vector 5.svg' />
              </Box>
            </Box>
            <Box top='175px' left='320px' position='absolute'>
              <img width='620px' src='https://onlygunicorn.xyz/assets/recipeImage.png' />
            </Box>
          </Box>
        </Box>
        <Box className='loginBox'>
          <Box className= "welcomeBox">
            <Typography className='first'>
              Welcome Back
            </Typography>
            <Typography className="second">
              Please log in to your account
            </Typography>
          </Box>
          <Box
          sx={{
            width: '100%',
            alignItems:'center',
            height:'100%',
            maxWidth:'900px',
          }}>
            <Form />
          </Box>
        </Box>
      </Box>
          <Box bottom='220px' width='500px' position='relative'>
              <img width='470px' src='https://onlygunicorn.xyz/assets/Vector 4.svg' />
            </Box>
    </Box>
  );
};

export default LoginPage;
