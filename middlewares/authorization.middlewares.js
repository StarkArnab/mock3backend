const jwt = require("jsonwebtoken");
require("dotenv").config();

const authorization = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization?.split("Bearer ")[1];
    jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
      next();
    });
  } else {
    return res.status(400).json({ message: "Please Login!!", flag: true });
  }
};

module.exports = { authorization };
