import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";
import FavoriteIcon from "@mui/icons-material/Favorite";
import WishlistDisplayBar from "../../components/wishlist/AppearingWishlistDisplayBar";
import SearchBar from "../../components/SearchBar";
import axios from "axios";
axios.defaults.withCredentials = true;

import { useDispatch, useSelector } from "react-redux";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { userLoggedOut } from "../../redux/userReducer";

const Navbar = () => {
  // Onclick to wishlistbar view
  const [showWishlistBar, setShowWishlistBar] = useState(false);

  const loggedInUsernameFromReduxStore = useSelector(
    (state) => state.userData.loggedInUsername.name
  );
  console.log(loggedInUsernameFromReduxStore);

  const dispatch = useDispatch();

  const sendLogoutReq = async () => {
    const res = await axios.post("http://logout:1111/user/logout", null, {
      withCredentials: true,
    });
    if (res.status == 200) {
      return res;
    }
    return new Error("Unable To Logout. Please Try Again");
  };

  const handleLogout = async () => {
    sendLogoutReq().then(() => dispatch(userLoggedOut()));
  };

  return (
    <div className="w-screen text-slate-100 flex justify-between items-center px-10 relative">
      {/* User Name*/}
      <div>Product Management App</div>
      <div>
        <SearchBar />
      </div>
      <div className="flex items-center justify-center gap-12">
        <div className="cursor-pointer flex gap-2 items-center justify-center relative">
          <div className="flex gap-2">
            <div className="flex gap-2">
              <AccountCircleIcon />
              <div>
                User :{" "}
                {loggedInUsernameFromReduxStore &&
                  loggedInUsernameFromReduxStore}
              </div>
              <Button variant="contained" size="small" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
        {/* Wishlist Icon */}
        <div
          className="cursor-pointer p-2 flex  items-center justify-center gap-x-4"
          onClick={() => setShowWishlistBar(true)}
        >
          <div>Wishlist</div>
          <div>
            <FavoriteIcon />
          </div>
        </div>
      </div>
      {showWishlistBar && (
        <WishlistDisplayBar onClose={() => setShowWishlistBar(false)} />
      )}
    </div>
  );
};

export default Navbar;
