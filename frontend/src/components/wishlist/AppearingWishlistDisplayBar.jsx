import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import SingleProductIconSized from "../home/product/SingleProductDisplayHomePageIconSized";
import axios from "axios";
import Loading from "../Loading";

const AppearingWishlistDisplayBar = ({ onClose }) => {
  // Get wishlist ID data stored in redux store
  const [availableWishlistProductsId, setAvailableWishlistProductsId] =
    useState([]);
  // fetch the wishlist ID products from api
  const [availableWishlistProducts, setAvailableWishlistProducts] = useState(
    []
  );

  const [loading, setLoading] = useState(false);

  const userWishlistData = useSelector((state) => state.wishlist.value);

  console.log(userWishlistData);

  useEffect(() => {
    setAvailableWishlistProductsId(userWishlistData);
  }, [userWishlistData]);

  const dispatch = useDispatch();

  useEffect(() => {
    fetchProducts();
  }, [availableWishlistProductsId]);

  // fetch produts for the wishlist IDs
  const fetchProducts = async () => {
    setLoading(true);
    await axios.get("http://localhost:1111/product").then((res) => {
      availableWishlistProductsId[0] &&
        setAvailableWishlistProducts(
          res.data.filter((item) => {
            console.log(availableWishlistProductsId);
            // console.log(item);
            return availableWishlistProductsId.includes(item.id);
          })
        );
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
                <SingleProductIconSized item={item} onClose={handleOnclick} />
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
