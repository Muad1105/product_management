import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import SideBar from "../components/home/SideBar";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ProductsDisplaySection from "../components/home/product/ProductsDisplaySection";
import { useDispatch } from "react-redux";
import { storeLoggedInUserId } from "../redux/userReducer";
import { useParams } from "react-router-dom";
import axios from "axios";

// set when using with withCredentials with axios call
axios.defaults.withCredentials = true;

const Home = () => {
  const [user, setUser] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    // Access user data and send back the request
    sendRequest().then((data) => handleResponse(data));
  }, []);
  // Logged user store state
  const [loggedInUserId, setLoggedInUserId] = useState("");

  const userId = useParams().id;

  useEffect(() => {}, []);

  const handleResponse = (res) => {
    console.log(res.user._id);
    setUser(res.user.username);
    dispatch(storeLoggedInUserId(res.user._id));
  };
  //
  const sendRequest = async () => {
    console.log("send request");
    const res = await axios
      .get("http://localhost:1111/user/home", { withCredentials: true })
      .catch((err) => console.log(err));
    console.log(res);
    const data = await res.data;

    return data;
  };

  return (
    <div className="">
      {/* Navbar on top */}
      <Navbar />
      <div className="flex ">
        {/* Home Button and dropdown sidebar */}
        <div className="flex flex-col p-6 gap-8">
          <div className="w-[15vw] px-4 flex ">
            Home
            <span className="px-4">
              <ArrowForwardIosIcon />
            </span>
          </div>
          <SideBar className="w-[10vw]" />
        </div>
        <div className="flex">
          <ProductsDisplaySection />
        </div>
      </div>
    </div>
  );
};

export default Home;
