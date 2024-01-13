import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import { useSnackbar } from "notistack";

const AddBrand = ({ onClose }) => {
  const [brand, setBrand] = useState("");
  const [inputError, setInputError] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const handleEnteredBrand = async () => {
    const trimmedBrand = brand.trim();
    let data;

    if (trimmedBrand === "") {
      console.log("true", trimmedBrand);
      setInputError(true);
    } else {
      console.log(trimmedBrand);
      // api trigger if value present
      setInputError(false);
      data = {
        name: trimmedBrand,
      };
      console.log(data);
      await axios
        .post("http://localhost:1111/brand", data)
        .then((res) => {
          console.log(res);
          enqueueSnackbar("Brand Created Succesfully", {
            variant: "success",
          });
          onClose();
        })
        .catch((error) => console.log(error));
    }
  };
  const handleOnChange = (e) => {
    const inputText = e.target.value;
    const trimmedInput = inputText.trim();

    if (trimmedInput === "") {
      setInputError(false);
    } else {
      setInputError(true);
      setBrand(inputText);
    }
  };

  return (
    <div
      className="fixed bottom-0 top-0 right-0 left-0 bg-opacity-50 bg-slate-800 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="w-[400px] h-[250px] rounded-xl max-w-full relative pt-6 flex flex-col justify-center items-center gap-4 bg-slate-100"
        onClick={(event) => event.stopPropagation()}
      >
        <div>Add Brand</div>

        <input
          type="text"
          className="border-2 border-slate-600 rounded-md py-1 px-2"
          onChange={handleOnChange}
        />
        <div>
          {!brand && inputError && (
            <span className="absolute text-slate-200 text-[13px] bg-red-700 px-3 py-1 top-0">
              Input Missing
            </span>
          )}
        </div>
        <div>
          <div>{}</div>
          <Button
            variant="contained"
            size="small"
            style={{
              backgroundColor: "yellow",
              color: "black",
              marginRight: "20px",
            }}
            onClick={handleEnteredBrand}
          >
            Add
          </Button>
          <Button variant="outlined" size="small">
            Discard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddBrand;
