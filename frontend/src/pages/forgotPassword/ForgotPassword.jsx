import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import validator from "validator";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [noEmailFound, setNoEmailFound] = useState(false);

  const [userNotFound, setUserNotFound] = useState(false);

  const navigate = useNavigate();

  const handleEmailChange = (email) => {
    setNoEmailFound(false);
    setEmail(email);
  };

  const handleSendOTP = async () => {
    console.log("api call");
    if (!email) {
      console.log("no email");
      setNoEmailFound(true);
      return;
    }

    {
      await axios
        .post("http://localhost:1111/user/send-otp", { email })
        .then((res) => {
          console.log(res);
          navigate("/enter_password");
        })
        .catch((err) => {
          console.log(err.response.status);
          if (err.response.status === 404) {
            setUserNotFound(true);
          }
        });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center p-10 gap-y-4">
      <div>Please enter your email id:</div>
      <input
        type="text"
        className="border-2 border-gray-500 w-[300px] px-2 py-1"
        onChange={(e) => handleEmailChange(e.target.value)}
      />
      <Button variant="contained" size="medium" onClick={handleSendOTP}>
        Send OTP
      </Button>
      {noEmailFound && <div className="text-red-700">Enter email id</div>}

      {userNotFound && <div className="text-red-700">User Not Found!</div>}
    </div>
  );
};

export default ForgotPassword;
