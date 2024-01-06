import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
// import AddCategory from "./components/AddCategory";
import AddProduct from "./components/home/product/AddProduct";
import AddSubCategory from "./components/AddConfiguration";
import ForgotPassword from "./pages/ForgotPassword";
import SignUp from "./pages/SignUP";
import AddSpecification from "./components/AddSpecification";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Routes>
      <Route exact path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/register" element={<SignUp />} />{" "}
      <Route path="/user/:id" element={<Home />} />{" "}
      <Route path="/product_details/:id" element={<ProductDetails />} />
      <Route path="/user/:id/add_product" element={<AddProduct />} />
      <Route path="/user/:id/add_category" element={<AddSpecification />} />
      <Route path="/user/:id/add_subcategory" element={<AddSubCategory />} />
      <Route path="/forgot_password" element={<ForgotPassword />} />
      {/* <Route path="/add_category" element={<AddCategory />} /> */}
    </Routes>
  );
}

export default App;
