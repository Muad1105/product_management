import React, { useEffect, useState } from "react";
import axios from "axios";
import SingleProductDisplayHomePageIconSized from "./SingleProductDisplayHomePageIconSized.jsx";
import Loading from "../../Loading.jsx";
import { useSelector } from "react-redux";

const ProductList = () => {
  const [allProductsData, setAllProductsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productCategorySelected, setProductCategorySelected] = useState("");

  const categorySection = useSelector(
    (state) => state.productInComponent.categorySelected
  );
  console.log(categorySection);
  useEffect(() => {
    fetchProductData();
  }, []);

  useEffect(() => {
    getCategoryProducts();
  }, [categorySection]);

  const getCategoryProducts = async () => {
    allProductsData.filter((e, i) => {
      console.log(e);
    });
  };

  const fetchProductData = async () => {
    setLoading(true);
    await axios.get("http://localhost:1111/product").then((res) => {
      console.log(res);

      setAllProductsData(res.data);
      setLoading(false);
    });
  };
  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="mt-[50px] px-4 pt-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {allProductsData.map((e, i) => {
              return (
                <SingleProductDisplayHomePageIconSized key={e.id} item={e} />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
