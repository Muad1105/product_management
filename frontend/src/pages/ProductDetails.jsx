import React, { useEffect, useState } from "react";
import Navbar from "../components/home/Navbar.jsx";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Button from "@mui/material/Button";
import { useParams } from "react-router-dom";
import axios from "axios";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useNavigate } from "react-router-dom";
import AddToWishlistPopup from "../components/home/wishlist/ConfirmAddToWishlistPopup.jsx";
import EditProduct from "../components/home/product/create/editProduct/EditProduct.jsx";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { styled, useTheme } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

const ProductDetails = () => {
  const [product, setProduct] = useState([]);
  const [allSpecifications, setAllSpecifications] = useState([]);
  const [allConfigurations, setAllConfigurations] = useState([]);
  const [productSpecsFetched, setProductSpecsFeched] = useState([]);
  const [specsToDisplay, setSpecsToDisplay] = useState([]);
  const [editProductModal, setEditProductModal] = useState(false);
  const [wishlistConfirmation, setWishlistConfirmation] = useState(false);

  const productId = useSelector((item) => item.productInComponent.productId);
  console.log(productId);
  const navigate = useNavigate();
  useEffect(() => {
    getAllSpecifications();
    getAllConfigurations();
    fetchProductData();
  }, []);

  useEffect(() => {
    if (
      allSpecifications[0] &&
      allConfigurations[0] &&
      productSpecsFetched[0]
    ) {
      console.log(allSpecifications, allConfigurations, productSpecsFetched);

      const specsDataName = productSpecsFetched.map((ele, i) => {
        console.log(ele);
        const specificationData = allSpecifications.filter((spec, i) => {
          console.log(spec);
          return ele.specificationId == spec._id;
        });
        const configurationData = allConfigurations.filter((config, i) => {
          return ele.configurationId == config._id;
        });
        return {
          specification: specificationData[0],
          configuration: configurationData[0],
        };
      });
      setSpecsToDisplay(specsDataName);
    }
  }, [allSpecifications, allConfigurations, productSpecsFetched]);

  useEffect(() => {
    console.log(specsToDisplay);
  }, [specsToDisplay]);

  const getAllSpecifications = async () => {
    const data = await axios.get("http://localhost:1111/specification");
    console.log(data.data);
    setAllSpecifications(data.data);
  };

  const getAllConfigurations = async () => {
    const data = await axios.get("http://localhost:1111/configuration");
    console.log(data.data);
    setAllConfigurations(data.data);
  };

  useEffect(() => {
    console.log(product);
  }, [product]);

  const fetchProductData = async () => {
    await axios
      .get(`http://localhost:1111/product/${productId}`)
      .then((res) => {
        console.log(res.data.specs);
        setProductSpecsFeched(res.data.specs);
        setProduct(res.data);
      });
  };

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

  return (
    <div className="flex flex-col gap-y-6">
      <Navbar />
      <div className="mt-2">
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
            onClick={""}
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
            {/* Map Specs */}
            <div>
              {" "}
              SPECS -{" "}
              {specsToDisplay[0] &&
                specsToDisplay.map((specs, idx) => {
                  console.log(specs);
                  return (
                    <span>
                      {specs.specification.name}: {specs.configuration.name},{" "}
                    </span>
                  );
                })}
            </div>
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
          productId={productId}
          onClose={() => setWishlistConfirmation(false)}
        />
      )}
    </div>
  );
};

export default ProductDetails;
