import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import validator from "validator";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

import { useSnackbar } from "notistack";

const Signup = () => {
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    reEnterPassword: "",
    email: "",
  });
  const [validUser, setValidUser] = useState({
    validUsername: false,
    validPassword: false,
  });

  const [passwordView, setPasswordView] = useState(false);
  const [reEnteredpasswordView, setReEnteredPasswordView] = useState(false);
  const [validEmail, setValidEmail] = useState(false);

  const [passwordsMatch, setPasswordsMatch] = useState(false);

  const [error, setError] = useState(false);

  const [signInButtonTriggered, setSignInButtonTriggered] = useState(false);

  const navigate = useNavigate();

  const nameRegEx = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,}/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%*_]).{4,}$/;

  // notification
  const { enqueueSnackbar } = useSnackbar();

  const validateUserInputs = () => {
    // validation user name
    const usernameValid = nameRegEx.test(newUser.username);
    console.log(usernameValid);
    setValidUser((prev) => ({
      ...prev,
      validUsername: usernameValid,
    }));

    // Validation for password
    console.log(newUser.password);
    const passwordValid = passwordRegex.test(newUser.password);
    console.log("passwordValid", passwordValid);
    setValidUser((prev) => ({
      ...prev,
      validPassword: passwordValid,
    }));

    // Validation re enter password
    if (newUser.password === newUser.reEnterPassword) {
      console.log("passwords match");
      setPasswordsMatch(true);
    } else {
      setPasswordsMatch(false);
    }
    //  validation email
    const validEmailformat = validator.isEmail(newUser.email);

    // Check if email is valid and has no uppercase letters
    if (validEmailformat) {
      setValidEmail(true);
    } else {
      setValidEmail(false);
    }
    if (
      validEmail &&
      validUser.validUsername &&
      validUser.validPassword &&
      passwordsMatch
    ) {
      console.log("Value");
      return true;
    } else return false;
  };

  const handleUserData = async () => {
    setSignInButtonTriggered(true);
    console.log(newUser.email);
    try {
      console.log(
        newUser.username,
        newUser.password,
        newUser.reEnterPassword,
        newUser.email
      );
      if (
        !newUser.username ||
        !newUser.password ||
        !newUser.reEnterPassword ||
        !newUser.email ||
        !validateUserInputs()
      ) {
        setError(true);
        return;
      } else {
        console.log("else");
        const userData = {
          username: newUser.username,
          password: newUser.password,
          email: newUser.email,
        };
        console.log(userData);
        const res = await axios
          .post("http://localhost:1111/user/signup", userData)
          .then((res) => {
            enqueueSnackbar("User Registered Successfully", {
              variant: "success",
            });
            navigate("/login");
          })
          .catch((err) => console.log(err));
        return res;
      }
    } catch (err) {
      enqueueSnackbar("Error", {
        variant: "error",
      });
      console.log(err);
    }
  };

  const handleUsernameChange = (username) => {
    setSignInButtonTriggered(false);
    setValidUser((prev) => ({ ...prev, validUsername: false }));
    setNewUser((prev) => ({
      ...prev,
      username,
    }));
  };

  const handleEmailChange = (email) => {
    setSignInButtonTriggered(false);

    setValidEmail(false);
    setNewUser((prev) => ({ ...prev, email }));
  };

  const handlePasswordChange = (password) => {
    setSignInButtonTriggered(false);

    setValidUser((prev) => ({ ...prev, validPassword: false }));
    setNewUser((prev) => ({
      ...prev,
      password,
    }));
  };

  const handleReEnterPassword = (reEnterPassword) => {
    setSignInButtonTriggered(false);
    setPasswordsMatch(false);
    setNewUser((prev) => ({
      ...prev,
      reEnterPassword,
    }));
  };

  return (
    <div className="flex items-center bg-slate-0 w-full h-screen text-2xl text-gray-700 relative">
      {/* Sign in section */}
      <div className="flex flex-col gap-8 justify-center items-center h-screen bg-slate-500 p-20">
        <div className="text-md">Welcome Back</div>
        <Link to="/login">
          <Button variant="contained" size="medium">
            Login
          </Button>
        </Link>
      </div>
      {/* User Registration section */}
      <div className="flex flex-col justify-center items-center mx-auto">
        <h1 className="mx-auto font-bold text-yellow-400">CREATE ACCOUNT</h1>
        <div className="flex flex-col w-[300px] rounded-xl gap-y-6">
          {/* Input User Name */}
          {/* --------------- */}
          <div className="flex flex-col">
            <div className="relative flex items-center">
              <div className="absolute text-slate-800 mx-2 ">
                <PersonOutlineOutlinedIcon />
              </div>
              <input
                placeholder="Name"
                name="name"
                type="text"
                className="w-full border-2  border-blue-600 text-xl px-8 py-2 rounded-md"
                onChange={(e) => handleUsernameChange(e.target.value)}
              />
            </div>
            <div className="text-[13px] right-0 text-red-700  flex flex-col gap-y-[-30px] rounded-md p-1">
              {signInButtonTriggered &&
                newUser.username &&
                !validUser.validUsername && (
                  <div className="bg-yellow-300 z-20">
                    <div className="mb-[-17px]">Enter a valid user name -</div>
                    <div>4 Charecters, 1 Smallcase, 1 Uppercase 1 Number</div>
                  </div>
                )}
            </div>
          </div>

          {/* Input Email */}
          {/* ---------- */}

          <div className="flex items-center flex-col">
            <div className="relative flex items-center">
              <EmailOutlinedIcon className="absolute text-slate-800 mx-2" />
              <input
                placeholder="email"
                name="email"
                type="email"
                className="w-full border-2 border-blue-600 text-xl px-8 py-2 rounded-md text-[13px]"
                onChange={(e) => handleEmailChange(e.target.value)}
              />
            </div>
            <div className="right-0 text-[15px] text-red-700">
              {signInButtonTriggered && newUser.email && !validEmail && (
                <span className="rounded-md p-1 z-50 bg-yellow-300">
                  Please Enter Valid Email
                </span>
              )}
            </div>
          </div>

          {/*Input Password  */}
          {/* ------------- */}
          <div className="flex items-center flex-col">
            <div className="relative flex items-center">
              <LockOpenOutlinedIcon className="absolute text-slate-800 mx-2" />
              <input
                placeholder="password"
                value={newUser.password}
                name="password"
                type={passwordView ? "text" : "password"}
                className="w-full border-2 bg-slate-200 border-blue-600 text-xl px-8 py-2 rounded-md text-[13px]"
                onChange={(e) => handlePasswordChange(e.target.value)}
              />
              <div
                className="absolute right-2 hover:cursor-pointer"
                onClick={() => setPasswordView((prev) => !prev)}
              >
                {passwordView ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </div>
            </div>
            <div className="text-[13px] right-0 text-red-700 flex flex-col gap-y-[-30px]">
              {signInButtonTriggered &&
                newUser.password &&
                !validUser.validPassword && (
                  <div className="rounded-md p-1 z-50 bg-yellow-300">
                    <div className="mb-[-17px]">Enter a valid Password- </div>
                    <div>
                      4 Charecters, 1 Smallcase, 1 Uppercase 1 Number 1 Special
                      charecter [@#$%*_]
                    </div>
                  </div>
                )}
            </div>
          </div>

          {/* Input Re Enter Password */}
          {/* ----------------------- */}
          <div className="flex items-center flex-col">
            <div className="relative flex items-center">
              <LockOpenOutlinedIcon className="absolute text-slate-800 mx-2" />
              <input
                placeholder="re-enter password"
                value={newUser.reEnterPassword}
                name="re-password"
                type={reEnteredpasswordView ? "text" : "password"}
                className="w-full border-2 bg-slate-200 border-blue-600 text-xl px-8 py-2 rounded-md text-[13px]"
                onChange={(e) => handleReEnterPassword(e.target.value)}
              />
              <div
                className="absolute right-2 hover:cursor-pointer"
                onClick={() => setReEnteredPasswordView((prev) => !prev)}
              >
                {reEnteredpasswordView ? (
                  <VisibilityIcon />
                ) : (
                  <VisibilityOffIcon />
                )}
              </div>
            </div>
            <div className="text-[13px] text-red-700 right-0">
              {signInButtonTriggered &&
                newUser.password &&
                newUser.reEnterPassword &&
                !passwordsMatch && (
                  <span className="rounded-md p-1 z-50 bg-yellow-300">
                    Passwords doesnt match
                  </span>
                )}
            </div>
          </div>
          <div className="flex relative justify-center items-center gap-x-4 text-[17px] m-4">
            <Button variant="contained" size="medium" onClick={handleUserData}>
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
