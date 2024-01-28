import React, { useEffect, useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import WishlistDisplayBar from "./wishlist/AppearingWishlistDisplayBar";
import SearchBar from "./SearchBar";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { storeLoggedInUserData } from "../../redux/userReducer";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Logout from "./Logout";

const Navbar = () => {
  // Onclick to wishlistbar view
  const [showWishlistBar, setShowWishlistBar] = useState(false);
  // Logged user store state
  const [loggedInUserId, setLoggedInUserId] = useState("");
  // feched user data from server
  const [loggedInUser, setLoggedInUser] = useState("");

  const userData = useSelector((state) => state.userData.loggedInUser);
  console.log("userData", userData);
  useEffect(() => {
    loggedInUserId && fetchUserData();
    console.log(loggedInUserId);
  }, [loggedInUserId]);

  // fetch userData on load
  const fetchUserData = async () => {
    await axios
      .get(`http://localhost:1111/user/${loggedInUserId}`)
      .then((res) => {
        console.log(res.data);
        setLoggedInUser(res.data.name);
      });
  };

  return (
    <div className="w-screen h-[70px] text-blue-700 flex justify-between items-center px-10 relative z-100 bg-yellow-300">
      {/* User Name*/}
      <div>Product-Management</div>
      <SearchBar />
      <div className="flex items-center justify-center gap-12">
        <div className="cursor-pointer flex gap-2 items-center justify-center ">
          <AccountCircleIcon />
          <div className="text-blue-700">{loggedInUser}</div>
        </div>
        <div>User: {userData.name}</div>
        <Logout />
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
