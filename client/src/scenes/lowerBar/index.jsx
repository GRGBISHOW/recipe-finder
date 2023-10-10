import { useEffect, useState } from "react";
import {
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  Box,
  useMediaQuery,
} from "@mui/material";
import { Search, Favorite } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setLogout, setSelectedIngredient, setSelectedRecipes, setSortedRecipes, setUserHistory } from "state";
import { useNavigate } from "react-router-dom";
import Flex from "components/Flex";
import { grey } from "@mui/material/colors";
import HistoryIcon from '@mui/icons-material/History';





const LowerBar = () => {
  const [searchText, setSearchText] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const recipes = useSelector((state) => state.recipes);
  const ingredients = useSelector((state) => state.ingredients);
  const sortedRecipes = useSelector((state => state.sortedRecipes));
  const [toggleSearchBar, setToggleSearchBar] = useState(false);
  const [toggleUserMenu, setToggleUserMenu] = useState(false);
  
  let fullName;
  let imagePath;
  if (user) {
    fullName = `${user.firstName} ${user.lastName}`;
    imagePath = user.imagePath;
  } else {
    fullName = "Happy Professor";
    imagePath = "dummy.jpg";
  }

  const desktopScreens = useMediaQuery("(min-width: 1000px)");

  // const scrollToElement = (recipeName) => {
  //   navigate("/recipes");
  //   setTimeout(() => {
  //     const element = document.getElementById(recipeName);
  //     if (element) {
  //       element.scrollIntoView({ behavior: 'smooth' });
  //     }
  //   }, 0);
  // };


  function stableSort(arr, compareFn) {
    if (arr.length <= 1) {
      return arr.slice();
    }
  
    const middle = Math.floor(arr.length / 2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);
  
    return merge(stableSort(left, compareFn), stableSort(right, compareFn), compareFn);
  }
  
  function merge(left, right, compareFn) {
    const result = [];
    let leftIndex = 0;
    let rightIndex = 0;
  
    while (leftIndex < left.length && rightIndex < right.length) {
      const comparison = compareFn(left[leftIndex], right[rightIndex]);
  
      if (comparison <= 0) {
        result.push(left[leftIndex]);
        leftIndex++;
      } else {
        result.push(right[rightIndex]);
        rightIndex++;
      }
    }
  
    return result.concat(left.slice(leftIndex), right.slice(rightIndex));
  }


  const handleUserHistory = async(addedThing) => {
    try{
      const response = await fetch(
        "https://onlygunicorn.xyz/backend/user/getHistory",
        {
          method: 'PATCH',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user: user, toAdd: addedThing }),
        }
      );  
      const data = await response.json();
    }
    catch(err){
      console.log(err)
    }
  };
  
  function handleOpactiyChange(){
    const element = document.getElementById('searchBar');
    if(!toggleSearchBar){
      element.style.opacity = "1";
    }
    else{
      element.style.opacity = "0";
    }
  } 

  const handleSearchInputChange = (event) => {
    const { value } = event.target;
    setSearchText(value);
    setShowPopup(value.length > 0); // Show the popup if the search text has content
  };

  useEffect(() => {
    const sorted = stableSort([...recipes], (a, b) => b.numLikes - a.numLikes);
    dispatch(setSortedRecipes({ sortedRecipes : sorted }));
  },[])

  return (
    <>
    <Box display='Flex' justifyContent= 'space-between' padding="20px 50px" style={{ position: "relative"}}>
      <Box display='Flex' gap="1.75rem" >
        {desktopScreens ? (
          <Box display='Flex'>
            <Box onClick={() => navigate("/home")} sx={{
              display: 'flex',
              justifyContent: 'center',
              marginRight:'50px',
              '&:hover':{
              cursor: 'pointer',
            }}}>
              <img width='200px' src='https://onlygunicorn.xyz/assets/Group 26.svg' />
            </Box>              
          </Box>
        ) : (
          <Typography
            fontWeight="slim"
            fontSize="clamp(0.75rem, 1.5rem, 1.75rem)"
            onClick={() => navigate("/recipes")}
            sx={{
              "&:hover": {
                cursor: "pointer",
              },
            }}
          >
            Recipe Finder
          </Typography>
        )}
      </Box>

      {desktopScreens ? (
        <Flex gap="2rem">
        <Box display='Flex' justifyContent='center' alignItems='center' minWidth='300px' borderRadius="9px" gap="3rem" padding="0.1rem 1.5rem">
        <div id='searchBar' style={{ position: "relative" ,opacity: 0 }}>
                <InputBase
                  placeholder="Search..."
                  value={searchText}
                  onChange={handleSearchInputChange}
                  style={{
                    padding: '15px',
                    zIndex: "1",
                    backgroundColor: 'rgba(217, 255, 227,1)',
                    height: '42px',
                    borderRadius: '10px',
                    width: '650px'
                  }}
                />
                {showPopup && (
                  <Box
                    style={{
                      position: "absolute",
                      top: "calc(100% + 5px)",
                      left: -5,
                      backgroundColor: "white",
                      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                      width: "100%",
                      zIndex: 5,
                      borderRadius: '10px',
                      Typography:{
                        paddingLeft: '50px',
                      }
                    }}
                  >
                    {
                      sortedRecipes.map((rr) => {
                        if (rr.recipeName.toLowerCase().startsWith(searchText.toLowerCase())) {
                          return (
                            <Box key={rr.recipeName} variant="body1" onClick={() => {
                              handleUserHistory((new Date().toLocaleString('en-US', {
                              day: '2-digit',
                              month: '2-digit',
                              hour: '2-digit',
                              minute: '2-digit',
                              hour12: false,
                            }))+ " " + rr.recipeName);
                            dispatch(setSelectedRecipes({ selectedRecipes : rr })); 
                            navigate(`/recipes/${rr.recipeName}`);
                            }} 
                            sx={{ fontFamily: 'sans-serif', fontWeight: 'normal', fontSize: '1.5rem' ,
                            fontFamily: 'Quicksand',
                            fontWeight: '600',
                            "&:hover": {
                              cursor: "pointer",
                              background: 'rgba(207, 208, 209,1)',
                              borderRadius: '10px',
                            }, }}>
                              <div key={Math.random()} style={{ padding:'2% 5%' }}>{rr.recipeName}</div><div key={rr.recipeName} style={{color: 'grey', fontSize:'15px', padding:`10px ${rr.recipeName.length * 13}px`}}> -Recipe</div>
                            </Box>
                          );
                          
                        }
                        return null;
                      })
                    }
                    {
                      ingredients.map((ii) => {
                        if (ii.name.toLowerCase().startsWith(searchText.toLowerCase())) {
                          return (
                            <Box key={ii.name} variant="body1" onClick={async() => {
                              await handleUserHistory((new Date().toLocaleString('en-US', {
                              day: '2-digit',
                              month: '2-digit',
                              hour: '2-digit',
                              minute: '2-digit',
                              hour12: false,
                            }))+ " " + ii.name);
                            dispatch(setSelectedIngredient({ selectedIngredient : ii}));
                            navigate(`/ingredients/${ii.name}`);
                            navigate(0);
                           }} 
                            sx={{ fontFamily: 'sans-serif', fontWeight: 'normal', fontSize: '1.5rem' ,
                            fontFamily: 'Quicksand',
                            fontWeight: '600',
                            "&:hover": {
                              cursor: "pointer",
                              background: 'rgba(207, 208, 209,1)',
                              borderRadius: '10px'
                            }, }}>
                              <div style={{ padding:'2% 5%' }}>{ii.name}</div> <div  key={ii.name} style={{color: 'grey', fontSize:'15px', padding:`10px ${ii.name.length * 13}px`}}> -Ingredient</div>
                            </Box>
                          );
                          
                        }
                        return null;
                      })
                    }

                    {(!sortedRecipes.some((rr) => rr.recipeName.toLowerCase().startsWith(searchText.toLowerCase())) && !ingredients.some((ii) => ii.name.toLowerCase().startsWith(searchText.toLowerCase()))) && (
                      <Typography variant="body1" sx={{ fontFamily: 'sans-serif', fontWeight: 'normal', fontSize: '1.5rem' }}>
                        Empty :&#40;
                      </Typography>
                      )
                    }
                  </Box>
                )}
              </div>
            </Box>
          <IconButton onClick={() => {setToggleSearchBar(!toggleSearchBar);handleOpactiyChange(!toggleSearchBar);}}>
                <Search />
          </IconButton>
          <IconButton onClick={() => navigate(`/camera`)}>
            <img width='26px' src='https://onlygunicorn.xyz/assets/Group 47.svg' />
          </IconButton>
          <IconButton onClick={() => navigate(`/home/${user.email}/history`)}>
            <HistoryIcon sx={{ fontSize: "25px" }} />
          </IconButton>
          <Box
            sx={{
              '&:hover':{
                cursor: 'pointer',
              }
            }}
          onClick={() => navigate(`/home/${user.email}/likes`)}>
          <Typography
              sx={{
                fontFamily:'Quicksand',
                fontWeight:'500',
                '&:hover':{
                  fontWeight: '700',
                }
              }}
            >
              Likes
            </Typography>
          </Box
              
          >
          <Box 
          sx={{
            display: 'flex',
            position: 'relative',
            alignItems: 'center',
          }}>
          <div
            onClick={ () => {setToggleUserMenu(!toggleUserMenu);}}
            style={{
              marginRight: "8px",
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              overflow: "hidden",
            }}
          >
            <img
              src={`https://onlygunicorn.xyz/backend/assets/${imagePath}`}
              width="100%"
              height="100%"
              alt="User"
              style={{ objectFit: "cover" }}
            />
            </div>
            {toggleUserMenu && <Box
              style={{
                position: "absolute",
                top: "calc(100% + 5px)",
                left: "calc(-50% - 5px)",
                backgroundColor: "white",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                width: "250%",
                zIndex: 5,
                borderRadius: '10px',
                Typography:{
                  paddingLeft: '50px',
                }
              }}
            >
              <Box
              sx={{
                height:'30px',
                fontFamily:'Quicksand',
                fontWeight:'600',
                display: 'flex',
                alignItems: 'center',
                padding: '5%',
                paddingLeft: '8%',
              }}
              >
                {fullName}
              </Box>
              <Box 
              sx={{
                height:'30px',
                fontFamily:'Quicksand',
                fontWeight:'400',
                display: 'flex',
                alignItems: 'center',
                padding: '5%',
                paddingLeft: '8%',
                '&:hover':{
                  cursor: "pointer",
                  background: 'rgba(207, 208, 209,1)',
                  borderRadius: '10px',
                }
              }}
              onClick={ () => {dispatch(setLogout());}}>
                Log Out
              </Box>
            </Box>}
          </Box>
        </Flex>
      ) : (
        <Flex gap="2.25rem">
          <IconButton onClick={() => navigate(`${user.email}/likes`)}>
            <Typography
              sx={{
                fontFamily:'Quicksand',
                fontWeight:'500',
              }}
            >
              Likes
            </Typography>
          </IconButton>
          <IconButton
            sx={{
              width: "150px",
              borderRadius: "0.25rem",
              p: "0.25rem 1rem",
              "& .MuiSvgIcon-root": {
                pr: "0.25rem",
                width: "3rem",
              },
              "& .MuiSelect-select:focus": {
                backgroundColor: grey[100],
              },
            }}
          >
            <Typography>{fullName}</Typography>
          </IconButton>
          <IconButton
            onClick={() => {
              dispatch(setLogout());
              navigate("/");
            }}
          >
            Log Out
          </IconButton>
        </Flex>
      )}
    </Box>
    </>
  );
};

export default LowerBar;
