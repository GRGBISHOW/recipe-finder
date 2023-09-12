import { useSelector,useDispatch } from "react-redux";
import { Box } from "@mui/material";
import LowerBar from "scenes/lowerBar";
import Flex from "components/Flex";
import { setUserHistory } from "state";
import { useEffect } from "react";

const UserHistory = () => {
    const userHistory = useSelector((state) => state.userHistory);
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const recipeFinderFromIngredientStyles = { 
        padding: '2%' , 
        minWidth: '100%' ,
        backgroundColor:'#d6e6d5',
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',
     };
    
       const recipeStyle ={
            padding: '0 1% 0 1%',
            backgroundColor:'#d6e6d5',
            display: 'flex',
            borderTop: '1px solid black',  
      };
    
      const descriptionStyle = {
            padding: "1% 2% 1% 2%",
            fontFamily: 'sans-serif',
            lineHeight: '100%',
      };

    const getUser = async() => {
        const sanitizedName = user.email.replace(/"/g, '');
        const response = await fetch(
        `http://localhost:3001/user/getUser`,
        {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: sanitizedName }),
        }
        );  
        const data = await response.json();
        dispatch(setUserHistory({ userHistory : data.history }))
    };

    
      useEffect(() => {
        getUser();
        }
      ,[]);


    return(
        <>
            <LowerBar />
            <Flex sx={{ flexDirection: 'column' ,padding: '3%', justifyContent: 'center', backgroundColor:'#FFFFFF'}}>
            {
                userHistory.map(
                    (cc,index) => {
                    return(
                        <Box sx={recipeFinderFromIngredientStyles} key={Math.random()}>
                            <Box style={recipeStyle} key= {Math.random()} /*onClick={() => {setRecipeToIngredient(!isIngredient);}}*/>
                                <Box style={descriptionStyle}>
                                    {index + 1}.&#41; {cc}
                                </Box>
                            </Box>
                        </Box>
                     );
                    }
                )
            }
            </Flex>

        </>
    );
};


export default UserHistory;