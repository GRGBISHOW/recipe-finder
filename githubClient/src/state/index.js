import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  categories: null,
  recipes: null,
  ingredients: null,
  selectedIngredient: null,
  selectedRecipes: null,
  likes: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setCategories: (state, action) => {
      state.categories = action.payload.categories;
    },
    setRecipes: (state, action) => {
      state.recipes = action.payload.recipes;
    },
    setSelectedIngredient: (state, action) => {
      state.selectedIngredient = action.payload.selectedIngredient;
    },
    setSelectedRecipes: (state, action) => {
      state.selectedRecipes = action.payload.selectedRecipes;
    },
    setIngredients: (state, action) => {
      state.ingredients = action.payload.ingredients;
    },
    setLikes: (state, action) => {
      state.user = action.payload.user;
      state.likes = action.payload.likes;
      state.token = action.payload.token;
    },
  },
});

export const { setLogin, setLogout, setCategories, setLikes, setRecipes, setIngredients, setSelectedIngredient, setSelectedRecipes } = authSlice.actions;
export default authSlice.reducer;
