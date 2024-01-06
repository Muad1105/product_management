import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { useParams } from "react-router-dom";
import AddSpecification from "../../AddSpecification";
import AddSubCategory from "../../AddConfiguration";
import AddProduct from "./AddProduct";
import ProductList from "./ProductList";

const ProductsDisplaySection = () => {
  const [showCategoryModel, setShowCategoryModel] = useState(false);
  const [showSubCategoryModel, setShowSubCategoryModel] = useState(false);
  const [showProductModel, setShowProductModel] = useState(false);

  const id = useParams().id;

  return (
    <div className="w-[83vw] h-full relative pt-4">
      <div>
        <div className="absolute right-10 flex gap-x-6">
          <div>
            <Button
              variant="contained"
              style={{
                background: "yellow",
                color: "Black",
                borderRadius: "15px",
              }}
              size="medium"
              onClick={() => setShowCategoryModel(true)}
            >
              Add Specification
            </Button>
          </div>
          <div>
            <Button
              variant="contained"
              style={{
                background: "yellow",
                color: "Black",
                borderRadius: "15px",
              }}
              size="medium"
              onClick={() => setShowSubCategoryModel(true)}
            >
              Add Configuration
            </Button>
          </div>
          <div>
            <Button
              variant="contained"
              style={{
                background: "yellow",
                color: "Black",
                borderRadius: "15px",
              }}
              size="medium"
              onClick={() => setShowProductModel(true)}
            >
              Add Product
            </Button>
          </div>
        </div>
        {showCategoryModel && (
          <AddSpecification onClose={() => setShowCategoryModel(false)} />
        )}
        {showSubCategoryModel && (
          <AddSubCategory onClose={() => setShowSubCategoryModel(false)} />
        )}
        {showProductModel && (
          <AddProduct onClose={() => setShowProductModel(false)} />
        )}
      </div>
      <ProductList />
    </div>
  );
};

export default ProductsDisplaySection;
