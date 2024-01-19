import React, { useEffect, useState } from "react";
import axios from "axios";
import SingleProductDisplayHomePageIconSized from "./SingleProductDisplayHomePageIconSized.jsx";
import Loading from "../../Loading.jsx";
import { useSelector } from "react-redux";

const ProductList = () => {
  const [allProductsData, setAllProductsData] = useState([]);
  const [allBrandsData, setAllBrandsData] = useState([]);
  const [allitemCategoryData, setAllitemCategoryData] = useState([]);

  const [loading, setLoading] = useState(false);
  const [filteredProductData, setFilteredProductData] = useState([]);
  const [filteredSearchData, setFilteredSearchData] = useState([]);

  // category from the sidebar selected
  const selectedCategoryId = useSelector(
    (state) => state.productInComponent.categorySelected
  );

  const searchProductAphabetData = useSelector(
    (state) => state.productInComponent.searchProducts
  );

  useEffect(() => {
    fetchAllProductData();
    fetchAllBrands();
    fetchAllItemCategories();
  }, []);

  useEffect(() => {
    getProductCategory();
  }, [selectedCategoryId]);

  useEffect(() => {
    searchProductsWithSerachbarAlphabetData();
  }, [searchProductAphabetData]);

  const fetchAllBrands = async () => {
    // console.log("FETCH ALL BRANDS");
    try {
      let response = await axios.get("http://localhost:1111/brand/allBrands");
      let data = await response.data.allBrands;

      // const data = await result.data.allBrands;
      setAllBrandsData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllItemCategories = async () => {
    try {
      let response = await axios.get(
        "http://localhost:1111/itemCategory/allItemCategories"
      );
      const data = await response.data;
      setAllitemCategoryData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getBrandIdForAlphabetData = () => {
    const brandIdData = allBrandsData.filter((e, i) => {
      console.log(e.name);
      const regex = new RegExp(searchProductAphabetData, "i");
      return regex.test(e.name) && regex.test(searchProductAphabetData);
    });
    return brandIdData;
  };

  const getItemCategoryIdForAlphabetData = () => {
    const itemCategoryIdData = allitemCategoryData.filter((e, i) => {
      console.log(e);
      const regex = new RegExp(searchProductAphabetData, "i");
      return regex.test(e.name) && regex.test(searchProductAphabetData);
    });
    return itemCategoryIdData;
  };

  //filter search bar data
  const searchProductsWithSerachbarAlphabetData = async () => {
    //Filter id from brand List
    const filteredBrandId = getBrandIdForAlphabetData();
    //Filter id from item category List
    const filteredItemCategoryId = getItemCategoryIdForAlphabetData();

    //filter from all products checking brand, item category and title
    const searchResult = allProductsData.filter((e, i) => {
      console.log(
        "title",
        e.title,
        searchProductAphabetData,
        filteredBrandId.some((brand, i) => {
          console.log(brand);
          console.log(brand._id, e.brand, brand._id == e.brand);
          return brand._id.includes(e.brand);
        })
      );
      console.log(e);
      return (
        // item category checking for filteredItemCategoryId includes itemCAtegory All products
        filteredItemCategoryId.some((ic, i) => {
          console.log(ic);
          console.log(ic._id, e.itemCategoty, ic._id == e.itemCategoty);
          return ic._id.includes(e.itemCategoty);
        }) ||
        //  brand checking for filtered brand id included in all products brand
        filteredBrandId.some((brand, i) => {
          console.log(brand);
          console.log(brand._id, e.brand, brand._id == e.brand);
          return brand._id.includes(e.brand);
        }) ||
        e.title.toLowerCase().includes(searchProductAphabetData.toLowerCase())
      );
    });
    setFilteredSearchData(searchResult);
  };

  const getProductCategory = () => {
    const result = allProductsData.filter((e, i) => {
      console.log(e.itemCategory, selectedCategoryId);
      return e.itemCategory == selectedCategoryId;
    });
    setFilteredProductData(result);
  };

  const fetchAllProductData = async () => {
    setLoading(true);
    await axios.get("http://localhost:1111/product").then((res) => {
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
