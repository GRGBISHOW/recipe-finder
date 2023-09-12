import Ingredients from "scenes/ingredientPage";
import { Box } from "@mui/material";
import { useEffect } from "react";
import { setIngredients, setSelectedIngredient } from "state";
import { useDispatch, useSelector } from "react-redux";
import LowerBar from "scenes/lowerBar";
import { useNavigate } from "react-router-dom";

const AllIngredients = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const ingredient = useSelector((state) => state.ingredients)

    // const getAllIngredients = async() => {
    //     const response = fetch("http://localhost:3001/getAllIngredients",{
    //         method: 'GET',
    //     });
    //     const data = await response.json();
    //     dispatch(setIngredients({ingredients: data}));
    // }; 

    // useEffect(() => {
    //     getAllIngredients();
    // }, []);

    return(
        <> 
            <LowerBar />
            {
                ingredient.map(
                    (ii) => {
                        return (
                            <Box key={ii.name} onClick={() => {dispatch(setSelectedIngredient({selectedIngredient: ii}));navigate(`/ingredients/${ii.name}`)}}
                                sx={
                                    {
                                    "&:hover":{
                                    cursor: 'pointer',
                                    },
                                    }
                                }
                            >
                                <Ingredients key={ii.name} ingredientN={ii.name} title={ii.name} />   
                            </Box>
                        );  
                    }
                )
            }
        </>
    );
};

export default AllIngredients;