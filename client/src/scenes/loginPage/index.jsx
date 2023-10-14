import { Container, Grid, Box, Typography, useMediaQuery } from "@mui/material";
import Form from "./Form";
import "./index.css";

const LoginPage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 1080px)");
  return (
    <Container>
      <Grid container>
        <Grid item md={8} sm={12} xs={12}>
          <Box className="iniBox">
            <Box className="upperLogoBox">
              <img
                className="upperLogo"
                display="block"
                position="absolute"
                src="https://onlygunicorn.xyz/assets/Group 26.svg"
              />

              <Typography
                className="mainSlogan"
                sx={{
                  fontFamily: "Quicksand",
                  fontWeight: 700,
                  fontSize: {
                    lg: 42,
                    xs: 30,
                  },
                }}
              >
                Cook With What You Have.
              </Typography>
              <Box className="imageOne">
                <img
                  width="80%"
                  src="https://onlygunicorn.xyz/assets/Vector 5.svg"
                />
              </Box>

              <img
                className="imageFlex"
                src="https://onlygunicorn.xyz/assets/recipeImage.png"
              />
            </Box>
            <Box className="botomImage">
              <img
                width="50%"
                src="https://onlygunicorn.xyz/assets/Vector 4.svg"
              />
            </Box>
          </Box>
        </Grid>

        <Grid item md={4} sm={12} xs={12}>
          <Box className="loginBox">
            <Box className="welcomeBox">
              <Typography className="first">Welcome Back</Typography>
              <Typography className="second">
                Please log in to your account
              </Typography>
            </Box>
            <Box
              sx={{
                width: "100%",
                alignItems: "center",
                height: "100%",
                maxWidth: "900px",
              }}
            >
              <Form />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LoginPage;
