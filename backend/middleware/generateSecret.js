import crypto from "crypto";

const jwtSecretKey = () => crypto.randomBytes(64).toString("hex");
console.log(jwtSecretKey);

const secretKey = jwtSecretKey();
