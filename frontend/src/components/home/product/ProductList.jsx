import React, { useEffect, useState } from "react";
import axios from "axios";
import SingleProductHomePage from "./SingleProductIconSized.jsx";
import Loading from "../../Loading.jsx";

const ProductList = () => {
  const [productsData, setProductsData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProductData();
  }, []);
  const fetchProductData = async () => {
    setLoading(true);
    await axios.get("http://localhost:1111/product").then((res) => {
      console.log(res);
      setProductsData(res.data);
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
            {productsData.map((e, i) => {
              return <SingleProductHomePage key={e.id} item={e} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
