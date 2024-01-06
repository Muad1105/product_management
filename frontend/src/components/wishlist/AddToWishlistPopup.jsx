import React from "react";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { saveToWishlist } from "../../redux/reducer.jsx";

const AddToWishlistPopup = ({ id, onClose }) => {
  const dispatch = useDispatch();

  const addToWishlist = () => {
    dispatch(saveToWishlist(id));
    onClose();
  };
  return (
    <div
      className="fixed bottom-0 top-0 right-0 left-0 bg-opacity-50 bg-slate-800 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="w-[400px] h-[250px] rounded-xl max-w-full pt-6 flex flex-col justify-center items-center bg-slate-100 relative gap-y-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div>Add to whishlist ?</div>
        <div>
          <Button
            variant="contained"
            size="medium"
            style={{ marginRight: "30px", backgroundColor: "green" }}
            onClick={addToWishlist}
          >
            ADD
          </Button>
          <Button
            variant="contained"
            size="medium"
            style={{ backgroundColor: "red" }}
            onClick={onClose}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddToWishlistPopup;
