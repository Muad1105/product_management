import React, { useEffect, useState } from "react";
import SideBar from "../components/home/SideBar";
import ProductsDisplaySection from "../components/home/product/ProductsDisplaySection";
import { useDispatch } from "react-redux";
// import { storeLoggedInUser } from "../redux/userReducer";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/home/Navbar";
import { styled, useTheme } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import MuiDrawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { storeLoggedInUserData } from "../redux/userReducer";

// set when using with withCredentials with axios call
axios.defaults.withCredentials = true;

const Home = () => {
  const [displayHome, setDisplayHome] = useState(true);
  const [displayProductDetails, setDisplayProductDetails] = useState(false);
  const dispatch = useDispatch();
  // Logged user store state

  const userId = useParams().id;

  const navigate = useNavigate();

  useEffect(() => {
    const handleBack = (event) => {
      event.preventDefault();
      navigate("/user/home");
    };
    console.log("popstate");

    window.addEventListener("popstate", handleBack);
    return () => {
      window.removeEventListener("popstate", handleBack);
    };
  }, [navigate]);

  const handleResponse = (user) => {
    console.log(user);
    const userData = {
      name: user.user.username,
      id: user.user._id,
      token: user.token,
    };
    dispatch(storeLoggedInUserData(userData));
  };

  let firstRender = true;

  useEffect(() => {
    // if (firstRender) {
    //   firstRender = false;
    sendRequest().then((data) => handleResponse(data));
    // } else {
    //   setInterval(
    //     () => refreshToken().then((data) => handleResponse(data)),
    //     1000 * 28
    //   );
    // }
  }, []);

  //Refresh user credentials comprising cookie and token
  const refreshToken = async () => {
    const res = await axios
      .get("http://localhost:1111/user/refresh", {
        useCredentials: true,
      })
      .catch((err) => console.log(err));
    console.log(res.data);
    const data = await res.data;
    return data;
  };

  //Get user credentials comprising cookie and token
  const sendRequest = async () => {
    const res = await axios
      .get("http://localhost:1111/user/home", { withCredentials: true })
      .catch((err) => "");
    const data = await res.data;
    console.log("data", data);

    return data;
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

  const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
      ...openedMixin(theme),
      "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      "& .MuiDrawer-paper": closedMixin(theme),
    }),
  }));

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const drawerWidth = 240;

  return (
    <div className="">
      <AppBar
        position="fixed"
        sx={{ width: "100vw" }}
        open={open}
        style={{ background: "#FDE047" }}
      >
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
      {displayHome && (
        <div className="flex ">
          {/* Home Button and dropdown sidebar */}
          <div className="flex flex-col p-6 gap-8">
            <SideBar />
          </div>
          <div className="flex">
            <ProductsDisplaySection />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
