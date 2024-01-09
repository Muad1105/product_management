import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SingleProductIconSized = ({ item, onClose }) => {
  const navigate = useNavigate();
  useEffect(() => {
    // console.log(item);
  }, []);

  const handleOnclick = () => {
    navigate(`/product_details/${item.id}`);
    onClose();
  };

  return (
    <div
      className="mb-4 border-2 border-slate-400 w-[200px] rounded-md flex flex-col cursor-pointer p-2"
      onClick={() => handleOnclick()}
    >
      <div className="h-[100px] border-2 border-slate-400 flex justify-center">
        <img
          src={`data:image/png;base64,${item.image}`}
          alt={`Product Image: ${item.title}`}
          onError={(e) => console.log("Image failed to load:", e)}
          onLoad={() => console.log("Image loaded successfully")}
        />
      </div>
      <div className="text-[11px]">{item.title}</div>
      <div className="text-[15px]">$ {item.price}</div>
    </div>
  );
};

export default SingleProductIconSized;
