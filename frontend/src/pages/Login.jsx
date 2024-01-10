import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import axios from "axios";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

const Login = () => {
  // Save input user name and password to login
  const [enteredUserDetails, setEnteredUserDetails] = useState({
    email: "",
    password: "",
  });
  // Logged in user state
  const [passwordView, setPasswordView] = useState(false);

  const navigate = useNavigate();

  // Handle login function on submit button click
  const handleLogin = async () => {
    console.log("handleLogin");
    try {
      const userData = enteredUserDetails;
      //Get the details to check for the user credetials availability
      await axios
        .post("http://localhost:1111/user/login", userData)
        .then((response) => {
          console.log(response);
          const users = response.data;
          console.log(users);
          navigate(`/user/home`);
        });
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className="top-2 bg-slate w-full h-screen flex justify-center items-center">
      <div className="flex flex-col items-center text-2xl text-gray-700 justify-center w-[70%] h-screen">
        <div className="flex flex-col p-4 w-[500px] rounded-xl gap-y-4">
          <h1 className="mx-auto text-2xl font-bold text-yellow-400">
            Sign In to Your Account
          </h1>
          <div className="relative">
            <EmailOutlinedIcon className="absolute text-slate-400 top-4 left-1" />
            <input
              placeholder="email"
              name="email"
              type="text"
              className="border-2 focus:border-gray-600 text-[13px] py-2 rounded-md w-[480px] px-8"
              onChange={(e) =>
                setEnteredUserDetails({
                  ...enteredUserDetails,
                  email: e.target.value,
                })
              }
            />
          </div>
          <div className="relative">
            <LockOpenOutlinedIcon className="absolute text-slate-400 top-4 left-1" />
            <input
              placeholder="password"
              name="password"
              type={passwordView ? "text" : "password"}
              className="border-2 focus:border-gray-600 text-[13px] py-2 rounded-md w-[480px] px-8"
              onChange={(e) =>
                setEnteredUserDetails({
                  ...enteredUserDetails,
                  password: e.target.value,
                })
              }
            />
            <div
              className="absolute top-1 right-0 hover:cursor-pointer"
              onClick={() => setPasswordView((prev) => !prev)}
            >
              {passwordView ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </div>
          </div>
          <div className="flex flex-col justify-center items-center gap-x-4 text-[17px] m-4 ">
            <Link to="/forgot_password">
              <div className="text-xl font-[bold] text-slate-900 underline cursor-pointer">
                Forgot Password ?
              </div>
            </Link>
          </div>
          <Button variant="contained" size="medium" onClick={handleLogin}>
            Sign In
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-8 justify-center items-center h-screen bg-slate-500 p-20">
        <div className="text-md">Hello Friend, You can register Here</div>
        <Link to="/register">
          <Button variant="contained" size="medium">
            Sign Up
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
