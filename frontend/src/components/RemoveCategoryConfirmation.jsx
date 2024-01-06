import React from "react";
import Button from "@mui/material/Button";

const RemoveCategoryConfirmation = ({ onClose, count, removeCategory }) => {
  const handleRemoveCategory = () => {
    removeCategory();
    onClose();
  };

  return (
    <div
      className="fixed bottom-0 top-0 right-0 left-0 bg-opacity-10 bg-slate-800 z-70 flex justify-center items-center"
      onClick={onClose}
      style={{ zIndex: 100 }}
    >
      <div
        className="relative border-2 border-red-900 p-10 bg-white bg-opacity-100 rounded-xl flex flex-col gap-y-6 items-center"
        style={{ zIndex: 200 }}
        onClick={(event) => event.stopPropagation()}
      >
        <div>Remove Category?</div>
        <div className="flex justify-center gap-x-4">
          <Button
            variant="contained"
            size="medium"
            style={{ backgroundColor: "green" }}
            onClick={handleRemoveCategory}
          >
            Yes, Remove
          </Button>
          <Button
            variant="contained"
            size="medium"
            onClick={onClose}
            style={{ backgroundColor: "red" }}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RemoveCategoryConfirmation;
