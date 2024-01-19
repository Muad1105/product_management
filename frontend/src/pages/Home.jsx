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
    setUser(user.username);
    dispatch(storeLoggedInUsername({ name: res.username, id: res._id }));
  };

  let firstRender = true;

  useEffect(() => {
    sendRequest().then((data) => handleResponse(data));
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
    const res = await axios
      .get("http://localhost:1111/user/home", { withCredentials: true })
      .catch((err) => "");
    const data = await res.data.user;

    return data;
  };

  return (
    <div className="">
      <div className="flex ">
        {/* Home Button and dropdown sidebar */}
        <div className="flex flex-col p-6 gap-8">
          <SideBar />
        </div>
        <div className="flex">
          <ProductsDisplaySection />
        </div>
      </div>
    </div>
  );
};

export default Home;
