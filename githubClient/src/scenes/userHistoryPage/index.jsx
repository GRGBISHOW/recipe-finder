import { useSelector,useDispatch } from "react-redux";
import { Box, Typography} from "@mui/material";
import LowerBar from "scenes/lowerBar";
import Flex from "components/Flex";
import { setSelectedIngredient, setSelectedRecipes, setUserHistory } from "state";
import { useEffect } from "react";
import ActualLowerBar from "scenes/actualLowerBar";
import { useNavigate } from "react-router-dom";

const UserHistory = () => {
    const userHistory = useSelector((state) => state.userHistory);
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();


    const recipeFinderFromIngredientStyles = { 
        padding: '2%' , 
        minWidth: '100%' ,
        backgroundColor:'#E9F8EE',
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',
        margin:'1%',
        borderRadius: '30px',
     };
    
       const recipeStyle ={
            padding: '0 1% 0 1%',
            backgroundColor:'#E9F8EE',
            display: 'flex',
      };
    
      const descriptionStyle = {
            padding: "1% 2% 1% 2%",
            fontFamily: 'sans-serif',
            lineHeight: '100%',
            fontFamily: 'Quicksand',
            fontWeight: '500',
            '&:hover':{
              'p':{
                fontWeight:'500',
              }
            },
      };

    const getUser = async() => {
        const sanitizedName = user.email.replace(/"/g, '');
        const response = await fetch(
        `http://localhost:3001/backend/user/getUser`,
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
          width='170px'
          height='170px'
          src={`http://localhost:3000/assets/Group 111.png`} />
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
                 History
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
            <Flex sx={{ flexDirection: 'column' ,padding: '3%', justifyContent: 'center', backgroundColor:'#FFFFFF'}}>
            {
                (userHistory.slice().reverse()).map(
                    (cc,index) => {
                    return(
                        <Box sx={recipeFinderFromIngredientStyles} key={Math.random()} /*onClick={() => {
                            if(cc.type === 'recipe'){
                              dispatch(setSelectedRecipes({selectedRecipes: cc}));
                                navigate(`/recipes/${cc.name}`);                    
                            }else{
                              dispatch(setSelectedIngredient({selectedIngredient: cc}));
                                navigate(`/ingredients/${cc.name}`);
                              
                            }
                        }}*/ 
                        >
                            <Box style={recipeStyle} key= {Math.random()} /*onClick={() => {setRecipeToIngredient(!isIngredient);}}*/>
                                <Box style={descriptionStyle}>
                                    {index + 1}&#41; &nbsp;{cc.date} &nbsp; &nbsp; {cc.name} &nbsp; &nbsp; -<i>{cc.type}</i>
                                </Box>
                            </Box>
                        </Box>
                     );
                    }
                )
            }
            </Flex>
          <ActualLowerBar />
        </>
    );
};


export default UserHistory;