import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSelectedProduct } from "../../../redux/productReducer";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddToWishlistPopup from "../../wishlist/ConfirmAddToWishlistPopup.jsx";
import axios from "axios";

const SingleProductDisplayHomePageIconSized = ({ item, onClose }) => {
  const [wishlistConfirmation, setWishlistConfirmation] = useState(false);
  const [brandId, setBrandId] = useState(item.brand);
  const [brandName, setBrandName] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    fetchBrandName();
  }, [brandId]);

  const fetchBrandName = async () => {
    const res = await axios.get(`http://localhost:1111/brand/${brandId}`);
    setBrandName(res.data.name);
  };

  const handleClick = () => {
    dispatch(setSelectedProduct(item.id));
    navigate(`/product_details`);
  };

  return (
    <div className="mb-4 border-2 border-slate-400 w-[200px] rounded-md flex flex-col p-2">
      <div
        className="h-[100px] border-2 border-slate-400 flex justify-center cursor-pointer"
        onClick={handleClick}
      >
        <img
          src={`data:image/png;base64,${item.image}`}
          alt={`Product Image: ${item.title}`}
          onError={(e) => console.log("Image failed to load:", e)}
          onLoad={() => ""}
        />
      </div>
      <div className="flex justify-between">
        <div>
          <div className="text-sm">{brandName}</div>
          <div className="text-[11px]">{item.title}</div>
          <div className="text-[15px]">$ {item.price}</div>
        </div>
        <div className="flex flex-col justify-center">
          <div></div>
          <div
            className="text-slate-700 rounded-full bg-slate-300 p-1 cursor-pointer"
            onClick={() => setWishlistConfirmation(true)}
          >
            <FavoriteBorderIcon />
          </div>
        </div>
      </div>
      {wishlistConfirmation && (
        <AddToWishlistPopup
          id={item.id}
          onClose={() => setWishlistConfirmation(false)}
        />
      )}
    </div>
  );
};

export default SingleProductDisplayHomePageIconSized;
