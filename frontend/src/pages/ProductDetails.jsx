import React, { useEffect, useState } from "react";
import Navbar from "../components/home/Navbar.jsx";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Button from "@mui/material/Button";
import { useParams } from "react-router-dom";
import axios from "axios";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useNavigate } from "react-router-dom";
import AddProduct from "../components/home/product/AddProduct.jsx";
import AddToWishlistPopup from "../components/wishlist/AddToWishlistPopup.jsx";
import EditProduct from "../components/home/product/EditProduct.jsx";

const ProductDetails = () => {
  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [allSubCategory, setAllSubCategory] = useState([]);
  const [subCategoryToDisplay, setSubCategoryToDisplay] = useState([]);
  const [editProductModal, setEditProductModal] = useState(false);
  const [wishlistConfirmation, setWishlistConfirmation] = useState(false);

  const id = useParams().id;

  const navigate = useNavigate();
  useEffect(() => {
    fetchProductData();
  }, []);

  const fetchProductData = async () => {
    await axios.get(`http://localhost:1111/product/${id}`).then((res) => {
      console.log(res.data);
      setProduct(res.data);
    });
  };

  // useEffect(() => {
  //   console.log(product);
  // const category = axios
  //   .get(`http://localhost:1111/category/${product.categoryId}`)
  //   .then((res) => {
  //     console.log(res.data);
  //     setCategory(res.data);
  //   });
  // }, [product]);

  // useEffect(() => {
  //   // Get all sub categories to display
  //   axios.get(`http://localhost:1111/subCategory`).then((res) => {
  //     console.log(res.data);
  //     setSubCategoryToDisplay(
  //       res.data.filter((e) => e.categoryId === product.categoryId)
  //     );
  //   });
  // }, [category]);

  const getCategoryName = async (id) => {
    let categoryName = "";
    await axios.get(`http://localhost:1111/category/${id}`).then((res) => {
      console.log(res.data.name);
      categoryName = res.data.name;
    });
    return categoryName;
  };

  const getSubCategoryName = async (id) => {
    let subCategoryName = "";
    axios.get(`http://localhost:1111/subCategory/${id}`).then((res) => {
      console.log(res.data.name);
      subCategoryName = res.data.name;
    });
    return subCategoryName;
  };

  const displayImages = () => {};

  return (
    <div>
      <Navbar />
      <div className="mt-6">
        <div className="px-4" onClick={() => navigate(`/user/${userId}`)}>
          Home{" "}
          <span className="px-4">
            <ArrowForwardIosIcon />
          </span>
          Product details
          <span className="px-4">
            <ArrowForwardIosIcon />
          </span>
        </div>
        <div className="m-8 flex justify-around">
          <div
            className="w-[400px] h-[400px] border-2 border-slate-400 mr-8 flex cursor-pointer"
            onClick={displayImages}
          >
            <img
              className="object-fill"
              src={`data:image/png;base64,${product.image}`}
              alt={`Product: ${product.title}`}
            />
          </div>
          <div className="w-[60vw] flex flex-col justify-start items-start gap-y-4">
            <div>{product.brand}</div>
            <div>{product.title}</div>
            <div>
              Availability:{" "}
              {product.availableQuantity > 0 ? (
                <span>In Stock</span>
              ) : (
                <span>Out of stock</span>
              )}
            </div>
            <div>
              Hurry up! only <span>{product.availableQuantity}</span> left in
              stock!
            </div>
            <div className="border-2 border-slate-400 w-[50vw]"></div>
            {product.categories &&
              product.categories.map((e, i) => {
                return <div></div>;
              })}
            <div className="flex gap-x-4">
              Quantity:{" "}
              <div className="border-2 border-slate-400 rounded-md h-[100%]">
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  min="1"
                  value="1"
                  style={{
                    borderRadius: "5px",
                    height: "30px",
                    padding: "0 10px 0",
                  }}
                />
              </div>
            </div>
            <div className="flex gap-x-4 items-center">
              <Button
                variant="contained"
                size="medium"
                style={{
                  backgroundColor: "yellow",
                  borderRadius: "20px",
                  color: "#333",
                  marginRight: "30px",
                }}
                onClick={() => setEditProductModal(true)}
              >
                Edit Product
              </Button>
              <Button
                variant="contained"
                size="medium"
                style={{
                  backgroundColor: "yellow",
                  borderRadius: "20px",
                  color: "#333",
                }}
              >
                Buy it now
              </Button>
              <div
                className="text-slate-700 rounded-full bg-slate-300 p-2 cursor-pointer"
                onClick={() => setWishlistConfirmation(true)}
              >
                <FavoriteBorderIcon />
              </div>
            </div>
          </div>
        </div>
      </div>
      {editProductModal && (
        <EditProduct id={id} onClose={() => setEditProductModal(false)} />
      )}
      {wishlistConfirmation && (
        <AddToWishlistPopup
          id={id}
          onClose={() => setWishlistConfirmation(false)}
        />
      )}
    </div>
  );
};

export default ProductDetails;
