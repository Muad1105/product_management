import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import axios from "axios";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { useDispatch } from "react-redux";
import { storeLoggedInUserData } from "../redux/userReducer";

const Login = () => {
  // Save input user name and password to login
  const [enteredUserDetails, setEnteredUserDetails] = useState({
    email: "",
    password: "",
  });
  // Logged in user state
  const [passwordView, setPasswordView] = useState(false);

  const [userNotFound, setUserNotFound] = useState(false);

  const [userCredentialsFalse, setUserCredentialsFalse] = useState(false);

  const [logoutCheck, setLogoutCheck] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  // Handle login function on submit button click
  const handleLogin = async () => {
    console.log("handleLogin");
    try {
      const userData = enteredUserDetails;
      //Get the details to check for the user credetials availability

      const response = await axios.post(
        "http://localhost:1111/user/login",
        userData
      );

      console.log("res data");

      const user = response.data;

      console.log(user, user.token, user.user._id, user.user.username);

      const data = {
        token: user.token,
        id: user.user._id,
        name: user.user.username,
      };

      dispatch(storeLoggedInUserData(data));

      navigate(`/user/home`);
    } catch (error) {
      console.log("error");
      console.log(error);
      if (error.response.status === 404) {
        setUserNotFound(true);
      }
      if (error.response.status === 401) {
        setUserCredentialsFalse(true);
      }
    }
  };

  const handleEmailChange = (email) => {
    setEnteredUserDetails({
      ...enteredUserDetails,
      email,
    });
    setUserNotFound(false);
  };

  const handlePasswordChange = (password) => {
    setEnteredUserDetails({
      ...enteredUserDetails,
      password,
    });
    setUserCredentialsFalse(false);
    setUserCredentialsFalse(false);
  };

  return (
    <div className="top-2 bg-slate w-full h-screen flex">
      <div className="flex flex-col items-center text-2xl text-gray-700 justify-center w-[70%] h-screen">
        {userNotFound && (
          <div className="text-md text-red-700 border-2 border-red-700 px-6 py-1 bg-yellow-500 rounded-md">
            User Not Found, Please Try Again
          </div>
        )}
        {userCredentialsFalse && (
          <div className="text-md text-red-700 border-2 border-red-700 px-6 py-1 bg-yellow-500 rounded-md">
            Email/Password Incorrect
          </div>
        )}

        <div className="flex flex-col p-4 rounded-xl gap-y-4 justify-center items-cnter">
          <h1 className="mx-auto text-2xl font-bold text-yellow-400">Login</h1>
          <div className="relative">
            <EmailOutlinedIcon className="absolute text-slate-400 top-4 left-1" />
            <input
              placeholder="email"
              name="email"
              type="text"
              className="border-2 focus:border-gray-600 text-[13px] py-2 rounded-md w-[280px] px-8"
              onChange={(e) => handleEmailChange(e.target.value)}
            />
          </div>
          <div className="relative">
            <LockOpenOutlinedIcon className="absolute text-slate-400 top-4 left-1" />
            <input
              placeholder="password"
              name="password"
              type={passwordView ? "text" : "password"}
              className="border-2 focus:border-gray-600 text-[13px] py-2 rounded-md w-[280px] px-8"
              onChange={(e) => handlePasswordChange(e.target.value)}
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
          <Button
            variant="contained"
            size="small"
            onClick={handleLogin}
            style={{ width: "150px", marginLeft: "auto", marginRight: "auto" }}
          >
            Login
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
