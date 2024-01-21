import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import SignIn from "./pages/Login";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import AddProduct from "./components/home/components/AddProduct";
import AddConfiguration from "./components/home/product/AddConfiguration";
import Signup from "./pages/Signup";
import AddSpecification from "./components/home/product/AddSpecification";
import ForgotPassword from "./pages/forgotPassword/ForgotPassword";
import EnterPassword from "./pages/forgotPassword/EnterPassword";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Routes>
      <Route exact path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/register" element={<Signup />} />{" "}
      <Route path="/user/home" element={<Home />} />{" "}
      <Route path="/product_details" element={<ProductDetails />} />
      <Route path="/user/:id/add_product" element={<AddProduct />} />
      <Route path="/user/:id/add_category" element={<AddSpecification />} />
      <Route path="/user/:id/add_subcategory" element={<AddConfiguration />} />
      <Route path="/forgot_password" element={<ForgotPassword />} />
      <Route path="enter_password" element={<EnterPassword />} />
    </Routes>
  );
}

export default App;
