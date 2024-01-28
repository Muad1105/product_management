import React from "react";
import Button from "@mui/material/Button";
import axios from "axios";
axios.defaults.withCredentials = true;
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogOut } from "../../redux/userReducer";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    const response = await axios.post(
      "http://localhost:1111/user/logout",
      null,
      {
        withCredentials: true,
      }
    );
    console.log(response.status);
    if (response.status == 200) {
      dispatch(userLogOut());
      navigate("/login", { replace: true });
    }
  };

  return (
    <Button variant="contained" size="small" onClick={() => handleLogout()}>
      Logout
    </Button>
  );
};

export default Logout;
