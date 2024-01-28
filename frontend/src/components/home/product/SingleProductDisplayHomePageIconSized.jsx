import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSelectedProduct } from "../../../redux/productReducer.jsx";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddToWishlistPopup from "../wishlist/ConfirmAddToWishlistPopup.jsx";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditProduct from "./create/editProduct/EditProduct.jsx";
import displayEditItemReducer, {
  setShowEditProductDisplay,
} from "../../../redux/displayEditItemReducer.jsx";
import { setShowProductsListModified } from "../../../redux/showItemChangesReducer.jsx";

const SingleProductDisplayHomePageIconSized = ({ item, onClose }) => {
  const [wishlistConfirmation, setWishlistConfirmation] = useState(false);
  const [brandId, setBrandId] = useState(item.brand);
  const [brandName, setBrandName] = useState("");
  const [editProduct, setEditProduct] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    // console.log(item);
  }, []);

  useEffect(() => {
    fetchBrandName();
  }, [brandId]);

  const fetchBrandName = async () => {
    const res = await axios.get(`http://localhost:1111/brand/${brandId}`);
    
    setBrandName(res.data.name);
  };

  const handleClick = () => {
    dispatch(setSelectedProduct(item._id));
    navigate(`/product_details`);
  };

  const handleEditProduct = () => {
    console.log("edit product");
    const data = { display: true, productId: item._id };
    dispatch(setShowEditProductDisplay(data));
  };

  const handleDeleteProduct = async () => {
    console.log("delete product");
    console.log(item);
    const res = await axios
      .delete(`http://localhost:1111/product/${item._id}`)
      .then((res) => {
        console.log(res.data);
      });
    dispatch(setShowProductsListModified(true));
  };

  return (
    <div
      className="mb-4 border-2 border-slate-400 w-[200px] rounded-md flex flex-col p-2 bg-orange-300 transition-all cursor-pointer hover:scale-110"
      onClick={handleClick}
    >
      <div className="h-[100px] border-2 border-slate-400 flex justify-center bg-slate-100">
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
        </div>
      </div>
      <div
        className="flex justify-center gap-4"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="text-green-600" onClick={() => handleEditProduct()}>
          <EditIcon />
        </div>
        <div className="text-red-600" onClick={() => handleDeleteProduct()}>
          <DeleteIcon />
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
