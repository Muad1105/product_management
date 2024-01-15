import React, { useEffect, useState } from "react";
import axios from "axios";
import SingleProductDisplayHomePageIconSized from "./SingleProductDisplayHomePageIconSized.jsx";
import Loading from "../../Loading.jsx";
import { useSelector } from "react-redux";

const ProductList = () => {
  const [allProductsData, setAllProductsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredProductData, setFilteredProductData] = useState([]);
  const [filteredSearchData, setFilteredSearchData] = useState([]);

  const selectedCategoryId = useSelector(
    (state) => state.productInComponent.categorySelected
  );

  console.log(selectedCategoryId);

  const searchProductAphabetData = useSelector(
    (state) => state.productInComponent.searchProducts
  );
  console.log(searchProductAphabetData);

  useEffect(() => {
    fetchProductData();
  }, []);

  useEffect(() => {
    getCategoryProducts();
  }, [selectedCategoryId]);

  useEffect(() => {
    searchProductsWithAlphabetData();
  }, [searchProductAphabetData]);

  const searchProductsWithAlphabetData = () => {
    const searchResult = allProductsData.filter((e, i) => {
      console.log(searchProductAphabetData, e);
      return (
        e.itemCategory.includes(searchProductAphabetData) ||
        e.brand.includes(searchProductAphabetData)
      );
    });
    console.log(searchResult);
    setFilteredSearchData(searchResult);
  };

  const getCategoryProducts = () => {
    console.log("fetch category data");
    const result = allProductsData.filter((e, i) => {
      console.log(e.itemCategory, selectedCategoryId);
      return e.itemCategory == selectedCategoryId;
    });
    setFilteredProductData(result);
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
            {/* Check the filtered data is present and display data */}
            {filteredProductData.length > 0
              ? filteredSearchData.length > 0
                ? filteredSearchData.map((e, i) => {
                    return (
                      <SingleProductDisplayHomePageIconSized
                        key={e.id}
                        item={e}
                      />
                    );
                  })
                : filteredProductData.map((e, i) => {
                    return (
                      <SingleProductDisplayHomePageIconSized
                        key={e.id}
                        item={e}
                      />
                    );
                  })
              : filteredSearchData.length > 0
              ? filteredSearchData.map((e, i) => {
                  return (
                    <SingleProductDisplayHomePageIconSized
                      key={e.id}
                      item={e}
                    />
                  );
                })
              : allProductsData.map((e, i) => {
                  return (
                    <SingleProductDisplayHomePageIconSized
                      key={e.id}
                      item={e}
                    />
                  );
                })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
