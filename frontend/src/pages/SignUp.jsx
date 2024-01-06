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

const SignUp = () => {
  const [newUser, setNewUser] = useState({
    userName: "",
    password: "",
    reEnterPassword: "",
    email: "",
  });
  const [validNewUser, setValidNewUser] = useState({
    validUserName: false,
    validPassword: false,
    validReEnterPassword: false,
  });

  const [passwordView, setPasswordView] = useState(false);
  const [reEnteredpasswordView, setReEnteredPasswordView] = useState(false);
  const [validEmail, setValidEmail] = useState(false);

  const [passwordsMatch, setPasswordsMatch] = useState(false);

  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const nameRegEx = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,}/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%*_]).{4,}$/;

  const validateUserInputs = () => {
    console.log(
      "value",
      validEmail,
      validNewUser.validUserName,
      validNewUser.validPassword,
      validNewUser.validReEnterPassword
    );
    if (
      validEmail &&
      validNewUser.validUserName &&
      validNewUser.validPassword &&
      validNewUser.validReEnterPassword
    ) {
      console.log("Value");
      return true;
    } else return false;
  };

  const handleUserData = async () => {
    console.log(newUser.email);
    if (
      !newUser.userName ||
      !newUser.password ||
      !newUser.reEnterPassword ||
      !newUser.email ||
      validateUserInputs()
    ) {
      setError(true);
      return;
    } else {
      const userData = {
        name: newUser.userName,
        password: newUser.password,
        email: newUser.email,
      };
      await axios
        .post("http://localhost:1111/user", userData)
        .then((res) => {
          console.log(res);
          navigate("/login");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleUserName = (item) => {
    console.log();
    setNewUser((prev) => ({ ...prev, userName: item }));
  };

  useEffect(() => {
    // validation user name
    const userNameValid = nameRegEx.test(newUser.userName);
    console.log(userNameValid);
    setValidNewUser((prev) => ({
      ...prev,
      validUserName: userNameValid,
    }));
  }, [newUser.userName]);

  const handleEnteredPassword = (item) => {
    setNewUser((prev) => ({ ...prev, password: item }));
  };

  useEffect(() => {
    // Validation for password
    console.log(newUser.password);
    const passwordValid = passwordRegex.test(newUser.password);
    console.log("passwordValid", passwordValid);
    setValidNewUser((prev) => ({
      ...prev,
      validPassword: passwordValid,
    }));
  }, [newUser.password]);
  useEffect(() => {}, [validNewUser.validPassword]);

  const handleReEnteredPassword = (item) => {
    setNewUser((prev) => ({ ...prev, reEnterPassword: item }));
  };

  useEffect(() => {
    // Validation re enter password
    if (newUser.password === newUser.reEnterPassword) {
      setPasswordsMatch(true);
    } else {
      setPasswordsMatch(false);
    }
  }, [newUser.reEnterPassword]);

  const handleEmail = (email) => {
    //  validation email

    setNewUser((prev) => ({ ...prev, email }));
    const validEmailformat = validator.isEmail(email);
    const hasUppercase = /[A-Z]/.test(email);
    console.log(hasUppercase);

    validEmailformat && !hasUppercase && setValidEmail(true);
    console.log("validateEmail");
  };

  return (
    <div className="flex items-center bg-slate-0 w-full h-screen text-2xl text-gray-700 top-2 relative">
      {/* Sign in section */}
      <div className="flex flex-col gap-8 justify-center items-center h-screen bg-slate-500 p-20">
        <div className="text-md">Welcome Back</div>
        <Link to="/login">
          <Button variant="contained" size="medium">
            Sign In
          </Button>
        </Link>
      </div>
      {/* User Registration section */}
      <div className="flex flex-col justify-center items-center mx-auto">
        <h1 className="mx-auto font-bold mb-20 text-yellow-400">
          CREATE ACCOUNT
        </h1>
        <div className="flex flex-col p-4 w-[600px] rounded-xl gap-y-12">
          {/* Input User Name */}
          {/* --------------- */}
          <div className="flex items-center relative">
            <PersonOutlineOutlinedIcon className="absolute text-slate-400" />
            <input
              placeholder="Name"
              name="name"
              type="text"
              className="w-full border-2 bg-slate-200 focus:border-gray-600 text-xl px-6 py-2 rounded-md text-[13px]"
              onChange={(e) => handleUserName(e.target.value)}
            />
            <div className="absolute text-[13px] right-0 text-red-700 mb-[-100px] flex flex-col gap-y-[-30px] rounded-md p-1">
              {newUser.userName && !validNewUser.validUserName && (
                <div className="bg-yellow-300 z-20">
                  <div className="mb-[-17px]">Enter a valid user name -</div>
                  <div>4 Charecters, 1 Smallcase, 1 Uppercase 1 Number</div>
                </div>
              )}
            </div>
          </div>

          {/* Input Email */}
          {/* ---------- */}

          <div className="flex justify-between  items-center inline relative">
            <EmailOutlinedIcon className="absolute text-slate-400" />
            <input
              placeholder="email"
              name="email"
              type="text"
              className="w-full border-2 bg-slate-200 focus:border-gray-600 text-xl px-6 py-2 rounded-md text-[13px]"
              onChange={(e) => handleEmail(e.target.value)}
            />
            <div className="absolute right-0 mb-[-70px] text-[15px] text-red-700">
              {newUser.email && !validEmail && (
                <span className=" rounded-md p-1 z-50 bg-yellow-300">
                  Enter a correct email
                </span>
              )}
            </div>
          </div>

          {/*Input Password  */}
          {/* ------------- */}
          <div className="flex items-center inline relative">
            <LockOpenOutlinedIcon className="absolute text-slate-400" />
            <input
              placeholder="password"
              value={newUser.password}
              name="password"
              type={passwordView ? "text" : "password"}
              className="w-full border-2 bg-slate-200 focus:border-gray-600 text-xl px-6 py-2 rounded-md text-[13px]"
              onChange={(e) => handleEnteredPassword(e.target.value)}
            />
            <div
              className="absolute right-2 hover:cursor-pointer"
              onClick={() => setPasswordView((prev) => !prev)}
            >
              {passwordView ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </div>
            <div className="absolute text-[13px] right-0 text-red-700 mb-[-70px] flex flex-col gap-y-[-30px]">
              {newUser.password && !validNewUser.validPassword && (
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
          <div className="flex  items-center inline relative">
            <LockOpenOutlinedIcon className="absolute text-slate-400" />
            <input
              placeholder="re-enter password"
              value={newUser.reEnterPassword}
              name="re-password"
              type={reEnteredpasswordView ? "text" : "password"}
              className="w-full border-2 bg-slate-200 focus:border-gray-600 text-xl px-6 py-2 rounded-md text-[13px]"
              onChange={(e) => handleReEnteredPassword(e.target.value)}
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
            <div className="text-[13px] text-red-700 right-0 mb-[-60px] absolute">
              {newUser.password &&
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

export default SignUp;
