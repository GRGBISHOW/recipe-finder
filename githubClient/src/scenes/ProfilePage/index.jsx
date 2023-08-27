import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import LowerBar from "scenes/lowerBar";
import {Typography} from "@mui/material";
import { red } from "@mui/material/colors"


const ProfilePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const likes = useSelector((state) => state.likes);


  const recipeStyle ={
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

  return (
    <>
      <LowerBar />{
        (likes.length !== 0) ? (
            likes.map((like) => (
                <Box style={recipeStyle} key={like}>
                    <Box style={likesHeadingStyle}>
                        {like}
                        <br />
                        <br />
                    </Box>
                </Box>
            ))
        ) : (
            <Box style={{ minWidth: '100vw', minHeight: '100vh' ,display: 'flex', justifyContent: 'center', paddingTop: '10%' }} key={Math.random()}>
                <Typography               
                
                    sx={{
                        color: red[200],
                        fontSize: "200%"
                    }}
                >
                    Likes are empty :&#40;
                </Typography>
            </Box>
        )
      }
    </>
  );
};

export default ProfilePage;
