import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";
import FavoriteIcon from "@mui/icons-material/Favorite";
import WishlistDisplayBar from "../../components/wishlist/AppearingWishlistDisplayBar";
import SearchBar from "../../components/SearchBar";
import axios from "axios";
import { useSelector } from "react-redux";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const Navbar = () => {
  // Onclick to wishlistbar view
  const [showWishlistBar, setShowWishlistBar] = useState(false);
  // Logged user store state
  const [loggedInUsername, setLoggedInUsername] = useState("");
  // feched user data from server
  const [loggedInUser, setLoggedInUser] = useState("");

  // userAccount Display
  const [userAccountPopup, setUserAccountPopup] = useState(false);

  const loggedInUsernameFromReduxStore = useSelector(
    (state) => state.userData.loggedInUsername.name
  );
  console.log(loggedInUsernameFromReduxStore);

  return (
    <div className="w-screen h-[70px] bg-blue-950 text-slate-100 flex justify-between items-center px-10 relative">
      {/* User Name*/}
      <div></div>
      <SearchBar />
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
              <Button variant="contained" size="small">
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
