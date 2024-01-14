import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar.jsx";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Button from "@mui/material/Button";
import { useParams } from "react-router-dom";
import axios from "axios";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useNavigate } from "react-router-dom";
import AddToWishlistPopup from "../components/wishlist/ConfirmAddToWishlistPopup.jsx";
import EditProduct from "../components/home/components/EditProduct.jsx";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { styled, useTheme } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

const ProductDetails = () => {
  const [product, setProduct] = useState([]);
  const [editProductModal, setEditProductModal] = useState(false);
  const [wishlistConfirmation, setWishlistConfirmation] = useState(false);

  const productId = useSelector((item) => item.productInComponent.productId);
  console.log(productId);
  const navigate = useNavigate();
  useEffect(() => {
    fetchProductData();
  }, []);

  const fetchProductData = async () => {
    await axios
      .get(`http://localhost:1111/product/${productId}`)
      .then((res) => {
        // console.log(res.data);
        setProduct(res.data);
      });
  };

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

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  const drawerWidth = 240;

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  return (
    <div className="flex flex-col gap-y-20">
      <Box>
        <AppBar position="fixed" sx={{ width: "100vw" }} open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Navbar />
          </Toolbar>
        </AppBar>
      </Box>
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
              className="object-contain"
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
