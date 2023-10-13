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
  selectedLikes: null,
  selectedCategory: null,
  likesCount: 0,
  sortedRecipes: null,
  userHistory: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.userHistory = state.user.history;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
      state.likes = null;
      state.userHistory = [];
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
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload.selectedCategory;
    },
    setIngredients: (state, action) => {
      state.ingredients = action.payload.ingredients;
    },
    setLikes: (state, action) => {
      state.user = action.payload.user;
      state.likes = action.payload.likes;
      state.token = action.payload.token;
    },
    setSelectedLikes: (state, action) => {
      state.user = action.payload.user;
      state.selectedLikes = action.payload.selectedLikes;
      state.token = action.payload.token;
    },
    setLikesCount: (state,action) => {
      state.likesCount = action.payload.likesCount;
    },
    setSortedRecipes: (state, action) => {
      state.sortedRecipes = action.payload.sortedRecipes;
    },
    setUserHistory: (state,action) => {
      state.userHistory = action.payload.userHistory;
    },
  }
  },
);

export const { setLogin, setLogout, setCategories, setLikes, setRecipes, setIngredients, setSelectedIngredient, setSelectedRecipes, setSelectedLikes, setSelectedCategory, setLikesCount, setSortedRecipes, setUserHistory } = authSlice.actions;
export default authSlice.reducer;
