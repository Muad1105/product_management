import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";
import FavoriteIcon from "@mui/icons-material/Favorite";
import WishlistDisplayBar from "../../components/wishlist/AppearingWishlistDisplayBar";
import SearchBar from "../../components/SearchBar";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { storeLoggedInUserId } from "../../redux/userReducer";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import UserAccountNavbarPopup from "./UserAccountNavbarPopup";

const Navbar = () => {
  // Onclick to wishlistbar view
  const [showWishlistBar, setShowWishlistBar] = useState(false);
  // Logged user store state
  const [loggedInUserId, setLoggedInUserId] = useState("");
  // feched user data from server
  const [loggedInUser, setLoggedInUser] = useState("");

  // userAccount Display
  const [userAccountPopup, setUserAccountPopup] = useState(false);

  const fetchLoggedInUserIdFromRedux = useSelector(
    (state) => state.userId.loggedInUserId
  );
  console.log(fetchLoggedInUserIdFromRedux);

  useEffect(() => {
    console.log(fetchLoggedInUserIdFromRedux);
    setLoggedInUserId(fetchLoggedInUserIdFromRedux);
  }, [fetchLoggedInUserIdFromRedux]);
  // fetch userData on load
  const fetchUserData = async () => {
    console.log("fetch");
    await axios
      .get(`http://localhost:1111/user/${loggedInUserId}`)
      .then((res) => {
        console.log(res.data);
        setLoggedInUser(res.data.user.username);
      });
  };

  useEffect(() => {
    loggedInUserId && fetchUserData();
    console.log(loggedInUserId);
  }, [loggedInUserId]);

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
              <div>{loggedInUser}</div>
            </div>
            <div>
              {userAccountPopup ? (
                <div>
                  <KeyboardArrowDownIcon
                    onClick={() => setUserAccountPopup(false)}
                  />
                </div>
              ) : (
                <div>
                  <KeyboardArrowRightIcon
                    onClick={() => setUserAccountPopup(true)}
                  />
                </div>
              )}
            </div>
            {userAccountPopup && (
              <div
                className="absolute mt-10 w-[150px] h-[50px] bg-slate-600"
                style={{ zIndex: "300" }}
              >
                <div
                  className="absolute w-[20px] h-[20px] bg-slate-600 ml-20 top-[-6px] rotate-45"
                  style={{ zIndex: "-200" }}
                ></div>
                <UserAccountNavbarPopup />
              </div>
            )}
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
