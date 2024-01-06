import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import validator from "validator";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);

  const handleEmailChange = () => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    setIsValidEmail(validator.isEmail(newEmail));
  };
  useEffect(() => {
    console.log(isValidEmail);
  }, [isValidEmail]);

  const handleSendOTP = () => {};

  return (
    <div className="flex flex-col justify-center items-center p-10 gap-y-4">
      <div>Please enter your email id:</div>
      <input
        type="text"
        className="border-2 border-gray-500 w-[300px] px-2 py-1"
        onChange={handleEmailChange}
      />
      <Button variant="contained" size="medium" onClick={handleSendOTP}>
        Send OTP
      </Button>
    </div>
  );
};

export default ForgotPassword;
