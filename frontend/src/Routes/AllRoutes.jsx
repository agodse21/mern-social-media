import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { MsgSection } from "../Components/Section/MsgSection";
import { HomePage } from "../Pages/HomePage/HomePage";
import { LoginPage } from "../Pages/LoginPage/LoginPage";
import ProfilePage from "../Pages/ProfilePage/ProfilePage";

export const AllRoutes = () => {
  const isAuth = Boolean(useSelector((state) => state.token));
  return (
    <Routes>
      <Route
        path="/"
        element={isAuth ? <HomePage /> : <Navigate to={"/login"} />}
      />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/profile/:userId"
        element={isAuth ? <ProfilePage /> : <Navigate to={"/login"} />}
      />
      <Route path="/message/:userId"   element={isAuth ? <MsgSection /> : <Navigate to={"/login"} />}  />
    </Routes>
  );
};
