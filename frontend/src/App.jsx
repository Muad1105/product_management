import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import SignIn from "./pages/Login";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/forgotPassword/ForgotPassword";
import EnterPassword from "./pages/forgotPassword/EnterPassword";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/register" element={<Signup />} />{" "}
      <Route path="/user/home" element={<Home />} />{" "}
      <Route path="/product_details" element={<ProductDetails />} />
      <Route path="/forgot_password" element={<ForgotPassword />} />
      <Route path="enter_password" element={<EnterPassword />} />
    </Routes>
  );
}

export default App;
