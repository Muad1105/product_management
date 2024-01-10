import React, { useEffect, useState } from "react";
import axios from "axios";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const SideBar = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState();
  const [dropDownDisplayedCategory, setDropDownDisplayedCategory] = useState(
    []
  );
  const [toggleAllCategoriesDropdown, setToggleAllCategoriesDropdown] =
    useState(false);
  const [toggleCategoryType, setToggleCategoryType] = useState(false);
  const [toggleCategoryItems, setToggleCategoryItems] = useState(false);

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const fetchAllProducts = async () => {
    const uniqueProductsArray = [];
    await axios.get("http://localhost:1111/product").then((res) => {
      setAllProducts(
        res.data.map((product) => {
          if (!uniqueProductsArray.includes(product._id)) {
            // console.log("product", product);
            uniqueProductsArray.push(product._id);
            return product;
          }
        })
      );
    });

    // To get a state {} and toggle the products boolean for products be toggling dropdown
    setShowCategoryDropdown(
      uniqueProductsArray.reduce((acc, product) => {
        acc[product] = false;
        return acc;
      }, {})
    );
  };

  useEffect(() => {
    console.log(showCategoryDropdown, "allProducts", allProducts);
  }, [showCategoryDropdown, allProducts]);

  const getSubcategoriesOfTheActiveCategory = async (product) => {
    await axios.get("http://localhost:1111/subCategory").then((res) => {
      res.data.reduce((acc, subCategory) => {
        acc[product] = subCategory;
        if (product in acc) {
          return;
        } else return (acc[product] = subCategory);
      }, {});
    });
  };

  // const setToggleCategoryType = (product) => {
  //   getSubcategoriesOfTheActiveCategory(product);
  //   // Set a state [] clicked category to display dropdown
  //   setDropDownDisplayedCategory((prev) => {
  //     if (prev.includes(product)) {
  //       return prev.filter((item) => item !== product);
  //     } else {
  //       return [...prev, product];
  //     }
  //   });
  //   // Set the product dropdown pressed
  //   setShowCategoryDropdown((prev) => ({
  //     ...prev,
  //     [product]: !prev[product],
  //   }));
  // };

  return (
    <div className="flex flex-col gap-y-4">
      <div>Categories</div>
      <div className="flex">
        All categories{" "}
        <span>
          {/* Show Arrow when products are available */}
          {toggleAllCategoriesDropdown ? (
            <KeyboardArrowDownIcon
              className="cursor-pointer"
              onClick={() => handleToggleAllCategoriesDropdown(false)}
            />
          ) : (
            <KeyboardArrowRightIcon
              className="cursor-pointer"
              onClick={() => handleToggleAllCategoriesDropdown(true)}
            />
          )}
        </span>
      </div>
      {toggleAllCategoriesDropdown &&
        allProducts.map((product) => {
          return (
            <div className="flex gap-x-4" key={product._id}>
              {product.itemCategory}
              <div>
                <span>
                  {/* Show Arrow when products are available */}
                  {showCategoryDropdown ? (
                    <KeyboardArrowDownIcon
                      className="cursor-pointer"
                      onClick={() => setToggleCategoryType(product)}
                    />
                  ) : (
                    <KeyboardArrowRightIcon
                      className="cursor-pointer"
                      onClick={() => setToggleCategoryType(product)}
                    />
                  )}
                </span>
              </div>
              {dropDownDisplayedCategory.includes(product) && <div></div>}
            </div>
          );
        })}
      {toggleCategoryType && <div>Brand</div>}
    </div>
  );
};

export default SideBar;
