import React, { useEffect } from "react";
import Navbar from "../components/home/Navbar";
import SideBar from "../components/home/SideBar";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ProductsDisplaySection from "../components/home/product/ProductsDisplaySection";
import { useDispatch } from "react-redux";
import { storeLoggedInUserId } from "../redux/reducer";
import { useParams } from "react-router-dom";

const Home = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(storeLoggedInUserId(id));
  }, []);

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
