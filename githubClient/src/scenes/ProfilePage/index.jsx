import { Box, IconButton, useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import LowerBar from "scenes/lowerBar";
import { setLikes } from "state";
import { useEffect } from "react";
import { Refresh } from "@mui/icons-material";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const getUser = useSelector((state) => state.user);
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
        likes != null || likes != undefined ? (
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
            <Box style={recipeStyle} key={Math.random()}>
                <Box style={likesHeadingStyle}>
                    Likes are empty :&#40;
                    <br />
                    <br />
                </Box>
            </Box>
        )
      }
    </>
  );
};

export default ProfilePage;
