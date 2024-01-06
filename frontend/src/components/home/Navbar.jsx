import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";
import FavoriteIcon from "@mui/icons-material/Favorite";
import WishlistDisplayBar from "../wishlist/AppearingWishlistDisplayBar";
import SearchBar from "../SearchBar";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { storeLoggedInUserId } from "../../redux/reducer";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Navbar = () => {
  // Onclick to wishlistbar view
  const [showWishlistBar, setShowWishlistBar] = useState(false);
  // Logged user store state
  const [loggedUser, setLoggedUser] = useState("");

  const userId = useParams().id;

  // fetch userData on load
  const fetchUserData = async () => {
    await axios.get("http://localhost:1111/user").then((res) => {
      console.log(res);
      setLoggedUser(res.data.filter((e, i) => e._id === userId && e.name));
    });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    console.log(loggedUser);
  }, [loggedUser]);

  return (
    <div className="w-screen h-[70px] bg-blue-950 text-slate-100 flex justify-between items-center px-10 relative">
      {/* User Name*/}
      <div></div>
      <SearchBar />
      <div className="flex items-center justify-center gap-12">
        <div className="cursor-pointer flex gap-2 items-center justify-center ">
          <AccountCircleIcon />
          <div>{loggedUser[0] && loggedUser[0].name}</div>
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
