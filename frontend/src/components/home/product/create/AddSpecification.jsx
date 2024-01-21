import React, { useState } from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import { useSnackbar } from "notistack";

const AddSpecification = ({ onClose }) => {
  const [specification, setSpecification] = useState("");
  const [inputError, setInputError] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const handleSpecificationDetails = async () => {
    const trimmedSpecification = specification.trim();

    let data;

    if (trimmedSpecification === "") {
      setInputError(true);
    } else {
      setInputError(false);
      data = { name: trimmedSpecification };

      // Only make the API call if inputError is false
      if (!inputError) {
        await axios
          .post("http://localhost:1111/specification", data)
          .then((res) => {
            console.log(res);
            enqueueSnackbar("Brand Created Succesfully", {
              variant: "success",
            });
            onClose();
          })
          .catch((error) => console.log(error));
      }
    }
  };

  const handleOnChange = (e) => {
    const inputText = e.target.value;
    const trimmedInput = inputText.trim();

    if (trimmedInput === "") {
      setInputError(true);
    } else {
      setInputError(false);
      setSpecification(inputText);
    }
  };

  return (
    <div
      className="fixed bottom-0 top-0 right-0 left-0 bg-opacity-50 bg-slate-800 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="w-[300px] h-[220px] rounded-xl max-w-full relative px-6 py-4  flex flex-col justify-center items-center gap-8 bg-slate-100"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="font-bold text-[18px]">Add Specification</div>
        <div>
          <input
            type="text"
            className="border-2 border-slate-600 rounded-md py-2 px-4 text-[15px] w-full"
            placeholder="Add Specification Name"
            onChange={handleOnChange}
          />
          <div>
            {inputError && (
              <span className="absolute text-slate-200 text-[13px] bg-red-700 px-3 py-1 top-0 right-0 left-0 text-center rounded-t-xl">
                Input Missing
              </span>
            )}
          </div>
        </div>
        <div>
          <Button
            variant="contained"
            size="small"
            style={{
              backgroundColor: "yellow",
              color: "black",
              marginRight: "20px",
            }}
            onClick={handleSpecificationDetails}
          >
            Add
          </Button>
          <Button variant="outlined" size="small" onClick={() => onClose()}>
            Discard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddSpecification;
