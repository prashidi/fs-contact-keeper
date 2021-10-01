const config = require("config");
const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  //Get token
  const token = req.header("x-auth-token");
  //Check if not token
  if (!token) {
    return res
      .status(401)
      .json({ msg: "No token found, authorization denied" });
  }

  try {
    //decode token
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    req.user = decoded.user;

    next();
  } catch (err) {
    res.status(401).json({
      msg: "Token is not valid",
    });
  }
};
