import jwt from "jsonwebtoken";

const refreshToken = (req, res, next) => {
  console.log("req", req.headers);
  const cookie = req.headers.cookie;
  console.log("headers", cookie, "cookies", cookie);
  const prevToken = cookie.split("=")[1];

  if (!cookie) {
    return res.status(400).json({ message: "Cookie not found." });
  }

  if (!prevToken) {
    return res.status(400).json({ message: "No Token Found." });
  }

  jwt.verify(String(prevToken), process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      // access to the request source is forbidden (403)
      return res.status(403).json({ message: "Authentication failed" });
    }
    // req.cookies[`${user.id}`] = "";
    res.clearCookie(`${user.id}`);

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    res.cookie(String(user.id), token, {
      path: "/",
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      httpOnly: true,
      sameSite: "lax",
    });
    // set request.id to the user id
    console.log("req.id", req.id);
    req.id = user.id;
    next();
  });
};

export default refreshToken;
