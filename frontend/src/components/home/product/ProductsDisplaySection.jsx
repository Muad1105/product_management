import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { useParams } from "react-router-dom";
import AddSpecification from "./create/AddSpecification";
import AddSubCategory from "./create/AddConfiguration";
import AddProduct from "./create/addProduct/AddProduct";
import ProductList from "./ProductList";
import AddItemCategory from "./create/AddItemCategory";
import AddBrand from "./create/AddBrand";
import { useDispatch, useSelector } from "react-redux";
import EditProduct from "./create/editProduct/EditProduct";
import { setShowEditProductDisplay } from "../../../redux/displayEditItemReducer";

const ProductsDisplaySection = () => {
  const [showBrandModel, setShowBrandModel] = useState(false);
  const [showItemCategoryModel, setShowItemCategoryModel] = useState(false);
  const [showSpecificationModel, setShowSpecificationModel] = useState(false);
  const [showConfigurationModel, setShowConfigurationModel] = useState(false);
  const [showProductModel, setShowProductModel] = useState(false);

  const dispatch = useDispatch();

  const displayEditProduct = useSelector(
    (state) => state.displayEditItem.displayEditProduct
  );

  const handleCloseEditProduct = () => {
    const data = { display: false, productId: "" };
    dispatch(setShowEditProductDisplay(data));
  };

  return (
    <div className="w-[74vw] h-full relative mt-20">
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
              onClick={() => setShowItemCategoryModel(true)}
            >
              Add Item Category
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
              onClick={() => setShowBrandModel(true)}
            >
              Add Brand
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
              onClick={() => setShowSpecificationModel(true)}
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
              onClick={() => setShowConfigurationModel(true)}
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
        {showItemCategoryModel && (
          <AddItemCategory onClose={() => setShowItemCategoryModel(false)} />
        )}
        {showBrandModel && (
          <AddBrand onClose={() => setShowBrandModel(false)} />
        )}{" "}
        {showSpecificationModel && (
          <AddSpecification onClose={() => setShowSpecificationModel(false)} />
        )}
        {showConfigurationModel && (
          <AddSubCategory onClose={() => setShowConfigurationModel(false)} />
        )}
        {showProductModel && (
          <AddProduct onClose={() => setShowProductModel(false)} />
        )}
        {displayEditProduct.display && (
          <EditProduct
            closeEditProduct={handleCloseEditProduct}
            productId={displayEditProduct.productId}
          />
        )}
      </div>
      <ProductList />
    </div>
  );
};

export default ProductsDisplaySection;
