import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import SingleProductIconSized from "../home/product/SingleProductDisplayHomePageIconSized";
import axios from "axios";
import Loading from "../Loading";
import { storeLoggedInUser } from "../../redux/userReducer";
import DeleteIcon from "@mui/icons-material/Delete";

const AppearingWishlistDisplayBar = ({ onClose }) => {
  // Get wishlist ID data
  const [wishlist, setWishlist] = useState([]);
  // fetch the wishlist ID products from api
  const [availableWishlistProducts, setAvailableWishlistProducts] = useState(
    []
  );

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchWishlist();
  }, []);

  useEffect(() => {
    wishlist[0] && getWishlistProducts();
  }, [wishlist]);

  const userId = useSelector((state) => state.userData.loggedInUser.id);

  console.log(userId);

  // fetch produts for the wishlist IDs
  const fetchWishlist = async () => {
    setLoading(true);
    await axios.get(`http://localhost:1111/user/${userId}`).then((res) => {
      console.log("response", res.data.user);
      const wishlistData = res.data.user.wishlist;
      setWishlist(wishlistData);
      setLoading(false);
    });
  };

  const getWishlistProducts = async () => {
    setLoading(true);
    await axios.get(`http://localhost:1111/product`).then((res) => {
      console.log(res.data);
      const productData = res.data.filter((item, index) => {
        console.log("wishlist", wishlist, "item.id", item.id);
        return wishlist.includes(item.id);
      });
      setAvailableWishlistProducts(productData);
      setLoading(false);
    });
  };

  useEffect(() => {
    console.log(availableWishlistProducts);
  }, [availableWishlistProducts]);

  const handleOnclick = () => {
    onClose();
  };

  return (
    <div
      className="fixed bottom-0 top-0 right-0 left-0 bg-opacity-50 bg-slate-800 z-50 flex justify-end items-center"
      onClick={onClose}
    >
      {/* Stop mouse event propogation from parent */}
      <div
        className="bg-slate-100 w-[300px] h-[100vh] text-slate-700"
        onClick={(e) => e.stopPropagation()}
      >
        {loading ? (
          <div className="flex justify-center">
            <Loading />
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center py-4 gap-y-6">
            <div className="font-bold underline flex">
              <div className="">Wishlist Items</div>
            </div>
            {availableWishlistProducts[0] ? (
              availableWishlistProducts.map((item) => (
                <div className="relative">
                  <div style={{ pointerEvents: "none" }}>
                    <SingleProductIconSized item={item} />
                  </div>
                  <div className="absolute bottom-10 right-12 hover:cursor-pointer">
                    <DeleteIcon
                      style={{ color: "red", fontSize: "30px" }}
                      onClick={()=>removeWishlistItem}
                    />
                  </div>
                </div>
              ))
            ) : (
              <div>No Products</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AppearingWishlistDisplayBar;
