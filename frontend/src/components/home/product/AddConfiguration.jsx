import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useSnackbar } from "notistack";

const AddConfiguration = ({ onClose }) => {
  //Specification item State
  const [availableSpecificationDetails, setAvailableSpecificationDetails] =
    useState([]);
  const [selectedSpecification, setSelectedSpecification] = useState("");
  const [inputError, setInputError] = useState(false);

  //selected configuration value State
  const [configuration, setConfiguration] = useState("");

  const fetchSpecification = async () => {
    await axios.get("http://localhost:1111/specification").then((res) => {
      console.log(res);
      setAvailableSpecificationDetails([...res.data]);
    });
  };

  useEffect(() => {
    fetchSpecification();
  }, []);

  const { enqueueSnackbar } = useSnackbar();

  // Check availableSpecificationDetails
  useEffect(() => {
    console.log(availableSpecificationDetails);
  }, [availableSpecificationDetails]);

  //dropdown change update to state
  const handleSpecificationChange = (event) => {
    setSelectedSpecification(event.target.value);
  };

  const handleEnteredConfiguration = async () => {
    const trimmedConfiguration = configuration.trim();
    let data;

    if (trimmedConfiguration === "" || selectedSpecification === "") {
      console.log("true", trimmedConfiguration, selectedSpecification);
      setInputError(true);
    } else {
      // api trigger if value present
      setInputError(false);
      data = {
        name: trimmedConfiguration,
        specificationId: selectedSpecification,
      };

      await axios
        .post("http://localhost:1111/configuration", data)
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

    if (trimmedInput === "" || selectedSpecification === "") {
      setInputError(false);
    } else {
      setInputError(true);
      setConfiguration(inputText);
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
        <div>Add Configuration</div>
        <Box sx={{ minWidth: 220 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Specification</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedSpecification}
              label="Specification"
              onChange={handleSpecificationChange}
            >
              {availableSpecificationDetails.map((e, i) => {
                console.log(e);
                return <MenuItem value={e._id}>{e.name}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </Box>
        <input
          type="text"
          className="border-2 border-slate-600 rounded-md py-1 px-2"
          onChange={handleOnChange}
        />
        <div>
          {!configuration && inputError && (
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
            onClick={handleEnteredConfiguration}
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

export default AddConfiguration;
