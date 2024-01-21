import otpGenerator from "otp-generator";
import nodemailer from "nodemailer";

import { User } from "../../model/user/userModel.js";

export const sendOtp = async (req, res, next) => {
  const { email } = req.body;

  const userFound = await User.findOne({ email });

  console.log(userFound);
  if (!userFound) {
    return res.status(400).json({ message: "User Not Found" });
  }

  const otp = otpGenerator.generate(6, {
    digits: true,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "muadnoushad@gmail.com",
        pass: "Qwerty+_1",
      },
    });

    const message = {
      from: "muadnoushad@gmail.com", // sender address
      to: `${email}`, // list of receivers
      subject: "OTP To Reset Password", // Subject line
      text: "Hello", // plain text body
      html: `<p>The otp generated is sent to confirm your password change OTP : <b>${otp}</b></p>`, // html body
    };

    const info = transporter.sendMail(message);

    res.status(201).json({
      msg: "message sent",
      info: info.messageId,
      preview: nodemailer.getTestMessageUrl(info),
    });
  } catch (err) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Error sending OTP email" });
  }
  //   return res.status(200).json({ message: "OTP sent successfully" });
};
