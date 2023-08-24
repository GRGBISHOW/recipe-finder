import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCategories } from "state";
import { Box } from "@mui/material";
import LowerBar from "scenes/lowerBar";
import { Navigate, useNavigate } from "react-router-dom";

const Categories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categories = useSelector((state) => state.categories);


  const getAllCategories = async () => {
    const response = await fetch("http://localhost:3001/category/", {
      method: "GET",
    });
    const data = await response.json();
    dispatch(setCategories({ categories: data }));
  };

  const getIngredientByCategory = async (categoryName) => {
    const response = await fetch(`http://localhost:3001/category/${categoryName}`, {
      method: "GET",
    });
    const data = await response.json();
    dispatch(setCategories({ categories: data }));
  };

  if(!categories){
    getAllCategories();
  }

  useEffect(() => {
   getAllCategories();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
    <LowerBar />
      {categories.map(
        ({
          _id,
          name, 
          description,
          otherDetails,
        }) => (
          <Box key= {_id}> 
          {name}
            {/* <Ingredients ingredientN={name} /> */}
          </Box>
        )
      )}
    </>
  );
};

export default Categories;
