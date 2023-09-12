import { useSelector,useDispatch } from "react-redux";
import { Box } from "@mui/material";
import LowerBar from "scenes/lowerBar";
import Ingredients from "scenes/ingredientPage";
import { red } from "@mui/material/colors"
import {Typography} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { setSelectedIngredient } from "state";

const SelectedCategory = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const selectedCategory = useSelector((state) => state.selectedCategory);


    return(
        <>
            <LowerBar />
            {
                selectedCategory.length !== 0 ? (selectedCategory.map(
                (cc) => {
                    return(
                        <Box key={cc._id}  onClick={() => {dispatch(setSelectedIngredient({selectedIngredient: cc}));navigate(`/ingredients/${cc.name}`)}}>
                            <Ingredients ingredientN={cc.name} title={cc.name}/>
                        </Box>
                    );
                }
            ))
                : (
                <Box style={{ minWidth: '100vw', minHeight: '100vh' ,display: 'flex', justifyContent: 'center', paddingTop: '10%' }} key={Math.random()}>
                    <Typography               
                    
                        sx={{
                            color: red[200],
                            fontSize: "200%"
                        }}
                    >
                        Category is empty :&#40;
                    </Typography>
                </Box>
                )
        }
        </>
    );
};


export default SelectedCategory;