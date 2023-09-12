import { useEffect,useState,useRef } from "react";
import { useSelector } from "react-redux";
import Flex from "components/Flex";
import { useDispatch } from "react-redux";
import { Box, IconButton, InputBase, Typography } from "@mui/material";
import Ingredients from "scenes/ingredientPage";
import Image from "components/ImageWrapper";
import { setRecipes,setIngredients, setSelectedIngredient } from "state";
import LowerBar from "scenes/lowerBar";
import { useNavigate } from "react-router-dom";
import CancelIcon from '@mui/icons-material/Cancel';


let currentRecipes;




const SingleIngredient = () =>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const recipes = useSelector((state) => state.recipes);
    const selectedIngredient = useSelector((state) => state.selectedIngredient);
    const [searchText, setSearchText] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [extraIngredients, setExtraIngredients] = useState([selectedIngredient]);
    const ingredients = useSelector((state) => state.ingredients);
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [moreIngredients,setMoreIngredients] = useState(false);
    const [focusedIndex, setFocusedIndex] = useState(-1); // To track the focused item in the dropdown
    const inputRef = useRef(null); // Create a ref for the input field
  
    const handleKeyDown = (event) => {
      if (showPopup) {
        if (event.key === "ArrowDown") {
          event.preventDefault();
          setFocusedIndex((prevIndex) => (prevIndex < ingredients.length - 1 ? prevIndex + 1 : prevIndex));
        } else if (event.key === "ArrowUp") {
          event.preventDefault();
          setFocusedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
        } else if (event.key === "Enter" && focusedIndex !== -1) {
          const selectedIngredient = ingredients[focusedIndex];
          let updated = extraIngredients;
          if (!updated.includes(selectedIngredient)) {
            updated.push(selectedIngredient);
          }
          setExtraIngredients(updated);
          setShowPopup(false);
          handleFilteredRecipes();
          setSearchText("");
          setMoreIngredients(false);
        }
      }
    };

    const recipeFinderFromIngredientStyles = { 
        margin: '3%' , 
        padding: '3%' , 
        minWidth: '100%' ,
        backgroundColor:'#d6e6d5',
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',
     };
    
       const recipeStyle ={
            padding: '0 2% 0 2%',
            backgroundColor:'#d6e6d5',
            display: 'flex',
            borderTop: '1px solid black',  
      };
    
      const descriptionStyle = {
            padding: "4% 2% 4% 2%",
            fontFamily: 'sans-serif',
            lineHeight: '250%',
      };

      const handleSearchInputChange = (event) => {
        const { value } = event.target;
        setSearchText(value);
        setShowPopup(value.length > 0); 
      };

      const getAllRecipes = async () => {
        const response = await fetch("http://localhost:3001/recipes/", {
          method: "GET",
        });
        const data = await response.json();
        dispatch(setRecipes({ recipes: data }));
      };

      const getAllIngredients = async () => {
        const response = await fetch(`http://localhost:3001/recipes/getAllIngredients`, {
          method: "GET",
        });
        const data = await response.json();
        dispatch(setIngredients({ingredients: data}));
      };
    

      const getRecipesByIngredientManual = (ingredientName) => {
        const sanitizedIngredientName = ingredientName.replace(/"/g, '');
        let currentRecipes = [];
        for(const rr in recipes){   
            for(const ll in recipes[rr].ingredientList)
            if(recipes[rr].ingredientList[ll] === sanitizedIngredientName){
                currentRecipes.push(recipes[rr]);
            }
        }
        return currentRecipes;
      };

      const handleFilteredRecipes = () => {
        if(extraIngredients.length !== 0){
          extraIngredients.map(
            (yy) => {
              currentRecipes.map(
                (gg) => {
                  if(!gg.ingredientList.includes(yy.name)){
                    currentRecipes = currentRecipes.filter((hh) => hh !== gg)
                    setFilteredRecipes(currentRecipes);
                  }
                  return("nice");
                }
              )
              return('nice');
            }
          )
        }
      };
      

      const togglePopup = () => {
        setShowPopup(!showPopup);
        setFocusedIndex(-1); // Reset focused item when opening the dropdown
      };

      useEffect(() => {
        //getAllRecipes();
        // getAllIngredients();
        currentRecipes = getRecipesByIngredientManual(selectedIngredient.name);
        setFilteredRecipes(currentRecipes);
        handleFilteredRecipes();
        document.addEventListener("keydown", handleKeyDown);

    
      }, [extraIngredients,showPopup]); // eslint-disable-line react-hooks/exhaustive-deps

        return (
            <>
            <LowerBar />
            <Flex sx={{ flexDirection: 'column' ,padding: '3%', justifyContent: 'center', backgroundColor:'#FFFFFF'}} key={Math.random()}>
            <Flex>
               { extraIngredients.map(
                (oo) => (
                  <Ingredients key={oo._id} ingredientN={JSON.stringify(oo.name)} size={'70%'}  title={oo.name} />
                )
               ) }
            </Flex>
              {filteredRecipes.length === 0 ? (
                <Box style={{ color: 'red', fontSize:'24px' }}>
                  No Recipes Found :&#40;
                </Box>
              ):(
                <Box style={{fontSize:'20px' }}>
                  {filteredRecipes.length} Recipes found!
                </Box>
              )} 
            <Box sx={recipeFinderFromIngredientStyles}>
              <Box style={{ display:'flex', width: '100%', position: 'relative'}}>
                {
                  !moreIngredients ?
                  (
                    <IconButton onClick={() => {setMoreIngredients(true);}}>
                       Add more Ingredients?
                    </IconButton>
                  ) : (
                    <>
                    <InputBase
                      ref={inputRef} // Assign the ref to the input field
                      placeholder="Search more ingredients..."
                      onClick={togglePopup}
                      value={searchText}
                      onChange={handleSearchInputChange}
                      style={{
                        zIndex: "1",
                        width: '30%',
                        margin: ' 0 0 10px 0',
                        minHeight: '30px',
                      }}
                      autoFocus
                    />
                    <IconButton onClick={() => setMoreIngredients(false)}>
                      <CancelIcon />
                    </IconButton>
                    {showPopup && (
                      <Box
                        style={{
                          position: "absolute",
                          top: "calc(100% + 5px)",
                          left: 0,
                          backgroundColor: "white",
                          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                          width: "50%",
                          zIndex: 5,
                          Typography: {
                            paddingLeft: "50px",
                          },
                        }}
                      >
                        {ingredients.map((ii, index) => {
                          if (ii.name.toLowerCase().startsWith(searchText.toLowerCase())) { 
                            return(
                          <Box
                            key={ii.name}
                            variant="body1"
                            onClick={() => {
                              let updated = extraIngredients;
                              if (!updated.includes(ii)) {
                                updated.push(ii);
                              }
                              setExtraIngredients(updated);
                              setShowPopup(false);
                              handleFilteredRecipes();
                              setSearchText("");
                              setMoreIngredients(false);
                            }}
                            sx={{
                              fontFamily: "sans-serif",
                              fontWeight: "normal",
                              fontSize: "1.5rem",
                              "&:hover": {
                                cursor: "pointer",
                                backgroundColor: "rgb(222, 222, 222)",
                              },
                              backgroundColor: index === focusedIndex ? "rgb(222, 222, 222)" : "transparent",
                            }}
                          >
                            <div style={{ padding: "2% 5%" }}>{ii.name}</div>{" "}
                            <div
                              key={ii.name}
                              style={{
                                color: "grey",
                                fontSize: "15px",
                                padding: `10px ${ii.name.length * 13}px`,
                              }}
                            >
                              -Ingredient
                            </div>
                          </Box>
                        );}
                        return null;
                        })
                        }
                        {!ingredients.some((ii) => ii.name.toLowerCase().startsWith(searchText.toLowerCase())) && (
                          <Typography variant="body1" sx={{ fontFamily: "sans-serif", fontWeight: "normal", fontSize: "1.5rem" }}>
                            No Such Ingredient :&#40;
                          </Typography>
                        )}
                      </Box>
                     )
                    }
                 </>
                )
              }
              </Box>
                {
                  (extraIngredients.length > 0) && (
                    <Box 
                    style={{
                      display:'flex',
                      width: '100%',
                    }}>
                    {extraIngredients.map(

                    (uu) => (
                      <Box 
                      sx={{
                        borderRadius: '50%',
                        display: 'flex',
                        width: '100px',
                        padding: '10px 5px', 
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '30px',
                        fontSize: '16px',
                        backgroundColor: 'green',
                        margin: '0 10px',
                        '&:hover':{
                          cursor: 'pointer',
                        }
                      }} key={uu.name}
                      onClick={() => {
                        const updated=extraIngredients.filter((pp) => pp !== uu);
                        if(updated.length === 0){
                          navigate("/ingredients");
                        }
                        else if(updated.length === 1 && updated[0].name !== selectedIngredient.name){
                          dispatch(setSelectedIngredient({ selectedIngredient: updated[0] }));
                          navigate(`/ingredients/${updated[0].name}`);
                        }
                        setExtraIngredients(updated);
                        handleFilteredRecipes();
                        setFilteredRecipes(currentRecipes);
                      }}
                      >
                        {uu.name}
                      </Box>
                    )
                  )
                  }
                  </Box>
                  )
                }
            {(filteredRecipes.map(
                ({
                _id,
                recipeName,
                description,
                preparationSteps,
                imagePath,
                cookingTime,
                servings,
                ingredientList,
                otherDetails,
                }) => (
                    <Box style={recipeStyle} key= {_id} /*onClick={() => {setRecipeToIngredient(!isIngredient);}}*/>
                        <Image image={imagePath} width={'40%'} height={'40%'} title={recipeName}/>  
                        <Box style={descriptionStyle}>
                            <b>Description:-<br /></b>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{description}<br />
                            <b>Preparation Steps:-<br /></b>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{preparationSteps}<br />
                            <b>Cooking Time:-<br /></b>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{cookingTime}<br />
                            <b>Servings:-<br /></b>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{servings}<br />
                            <b>Ingredients List:-<br /></b>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{ingredientList.join(', ')}<br />
                            <b>Extra Information:-<br /></b>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{otherDetails}<br />
                        </Box>
                    </Box>
                )
            ))}
            </Box>
        </Flex>
       </>
        );
    }


export default SingleIngredient;