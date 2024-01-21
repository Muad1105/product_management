import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ProductsDisplaySection from "../components/home/product/ProductsDisplaySection";
import { useDispatch } from "react-redux";
import { storeLoggedInUser } from "../redux/userReducer";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

// set when using with withCredentials with axios call
axios.defaults.withCredentials = true;

const Home = () => {
  const [user, setUser] = useState("");
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
    const userData = { name: user.username, id: user._id };
    setUser(user.username);
    dispatch(storeLoggedInUser(userData));
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
    console.log("data", res.data.user);

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
