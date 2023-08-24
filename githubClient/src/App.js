import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import LoginPage from "scenes/loginPage";
// import LowerBar from "scenes/lowerBar";
// import { useMemo } from "react";
import { useSelector } from "react-redux";
import Categories from "scenes/categoryPage";
import Recipes from "scenes/recipePage";
import ProfilePage from "scenes/ProfilePage";

function App() {
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="app">
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route
              path="/home"
              element={isAuth ? <Recipes /> : <Navigate to="/" />} />

            <Route
              path="/home/:email/likes"
              element={isAuth ? <ProfilePage /> : <Navigate to="/" />} />

            <Route
              path="/category"
              element={<Categories />}
            />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
