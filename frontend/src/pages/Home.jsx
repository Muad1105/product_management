import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import SideBar from "../components/home/SideBar";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ProductsDisplaySection from "../components/home/product/ProductsDisplaySection";
import { useDispatch } from "react-redux";
import { storeLoggedInUsername } from "../redux/userReducer";
import { useParams } from "react-router-dom";
import axios from "axios";

// set when using with withCredentials with axios call
axios.defaults.withCredentials = true;

const Home = () => {
  const [user, setUser] = useState("");
  const dispatch = useDispatch();
  // Logged user store state

  const userId = useParams().id;

  useEffect(() => {}, []);

  const handleResponse = (res) => {
    console.log(res._id);
    setUser(user.username);
    dispatch(storeLoggedInUsername({ name: res.username, id: res._id }));
  };

  let firstRender = true;

  useEffect(() => {
    sendRequest().then((data) => handleResponse(data));
    // if (firstRender) {
    //   firstRender = false;
    // Access user data and send back the request
    // } else {
    //   let interval = setInterval(() => {
    //     refreshToken().then((data) => handleResponse(data));
    //   }, 1000 * 28);

    //   return () => clearInterval(interval);
    // }
  }, []);

  //Refresh user credentials comprising cookie and token
  const refreshToken = async () => {
    const res = await axios
      .get("http://localhost:1111/user/refresh", {
        useCredentials: true,
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  //Get user credentials comprising cookie and token
  const sendRequest = async () => {
    console.log("send request");
    const res = await axios
      .get("http://localhost:1111/user/home", { withCredentials: true })
      .catch((err) => console.log(err));
    console.log(res);
    const data = await res.data.user;

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
