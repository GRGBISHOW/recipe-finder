import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import LoginPage from "scenes/loginPage";
// import LowerBar from "scenes/lowerBar";
// import { useMemo } from "react";
import { useSelector } from "react-redux";
import Categories from "scenes/categoryPage";
import Recipes from "scenes/recipePage";
import ProfilePage from "scenes/ProfilePage";
import SingleIngredient from "scenes/singleIngredientPage";
import SingleRecipe from "scenes/singleRecipePage";
import Home from "scenes/homePage";
import AllIngredients from "scenes/allIngredientPage";
import SelectedCategory from "scenes/selectedCategoryPage";
import Camera from "scenes/cameraPage";
import UserHistory from "scenes/userHistoryPage";

function App() {
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="app">
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route
              path="/recipes"
              element={isAuth ? <Recipes /> : <Navigate to="/" />} />

            <Route
              path="/ingredients"
              element={isAuth ? <AllIngredients /> : <Navigate to="/" />} /> 

            <Route
              path="/home"
              element={isAuth ? <Home /> : <Navigate to="/" />} />

            <Route
              path="/ingredients/:ingredientName"
              element={isAuth ? <SingleIngredient /> : <Navigate to="/" />} /> 

            <Route
              path="/recipes/:recipe"
              element={isAuth ? <SingleRecipe /> : <Navigate to="/" />} /> 

            <Route
              path="/home/:email/likes"
              element={isAuth ? <ProfilePage /> : <Navigate to="/" />} />

            <Route
              path="/home/:email/history"
              element={isAuth ? <UserHistory /> : <Navigate to="/" />} />

            <Route
              path="/category"
              element={<Categories />}
            />

            <Route
              path="/camera"
              element={<Camera />}
            />

            <Route
              path="/category/:categoryName"
              element={<SelectedCategory />}
            />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
