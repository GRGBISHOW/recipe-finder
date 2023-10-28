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
        minWidth: '75vw' ,
        backgroundColor:'#E9F8EE',
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',
        margin:'1%',
        borderRadius: '30px',
     };


    const getUser = async() => {
        const sanitizedName = user.email.replace(/"/g, '');
        const response = await fetch(
        `https://onlygunicorn.xyz/backend/user/getUser`,
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
          src={`https://onlygunicorn.xyz/assets/Group 111.png`} />
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
         <img  src='https://onlygunicorn.xyz/assets/Vector 5.png' width='250px' height='310px' />
        </Box>
      </Box>
            <Flex sx={{ flexDirection: 'column' ,padding: '3%', justifyContent: 'center', borderRadius:'30px',backgroundColor:'#E9F8EE'}}>
              <Box
              sx={{
                width:'75vw',
                borderRadius:'40px',
                backgroundColor:'#105B27',
                color:"#fff",                
                height: '60px',
                display:'flex',
              }}>
                <Box sx={{
                  width:'20vw',
                  display:'flex',
                  justifyContent:'center',
                  alignItems:'center',
                  height:'100%',
                }}>
                  <Typography
                  sx={{
                    fontFamily:'Quicksand',
                    fontWeight: '600',
                  }}>
                  Date
                  </Typography>
                </Box>
                <Box sx={{
                  width:'35vw',
                  display:'flex',
                  alignItems:'center',
                  height:'100%',
                }}>
                  <Typography
                  sx={{
                    fontFamily:'Quicksand',
                    fontWeight: '600',
                  }}>
                  Name
                  </Typography>
                </Box>
                <Box sx={{
                  width:'20vw',
                  display:'flex',
                  justifyContent:'center',
                  alignItems:'center',
                  height:'100%',
                }}>
                  <Typography
                  sx={{
                    fontFamily:'Quicksand',
                    fontWeight: '600',
                  }}>
                  Type
                  </Typography>
                </Box>
              </Box>
            {
                (userHistory.slice().reverse()).map(
                    (cc,index) => {
                    return(
                      <Box
                      sx={{
                        width:'75vw',
                        borderRadius:'40px',
                        backgroundColor:'#E9F8EE',                                    
                        height: '60px',
                        display:'flex',
                      }}>
                      <Box sx={{
                        width:'20vw',
                        display:'flex',
                        justifyContent:'center',
                        alignItems:'center',
                        height:'100%',
                      }}>
                        <Typography
                        sx={{
                          color: '#105B27',  
                          fontFamily:'Quicksand',
                          fontWeight: '600',
                        }}>
                        {cc.date}
                        </Typography>
                      </Box>
                      <Box sx={{
                        width:'35vw',
                        display:'flex',
                        alignItems:'center',
                        height:'100%',
                      }}>
                        <Typography
                        sx={{
                          color: '#105B27',  
                          fontFamily:'Quicksand',
                          fontWeight: '600',
                        }}>
                        {cc.name}
                        </Typography>
                      </Box>
                      <Box sx={{
                        width:'20vw',
                        display:'flex',
                        justifyContent:'center',
                        alignItems:'center',
                        height:'100%',
                      }}>
                        <Typography
                        sx={{
                          color: 'white',  
                          fontFamily:'Quicksand',
                          fontWeight: '600',
                        }}>
                        {cc.type === 'recipe' ? (
                          <Box
                          sx={{
                            borderRadius:'30px',
                            width:'100px',
                            padding:'2% 2%',
                            backgroundColor: '#f2994a',
                            display:'flex',
                            justifyContent:'center',
                          }}
                          >
                            <Typography
                            sx={{fontFamily:'Quicksand', fontWeight:'400'}}>
                            Recipe
                              </Typography>
                          </Box>
                        ): (
                          <Box
                          sx={{
                            borderRadius:'30px',
                            width:'100px',
                            padding:'2% 1%',
                            backgroundColor: '#20b64d',
                            display:'flex',
                            justifyContent:'center',
                          }}
                          >
                            <Typography
                            sx={{fontFamily:'Quicksand', fontWeight:'400'}}>
                            Ingredient
                              </Typography>                            
                          </Box>
                        )} 
                        </Typography>
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