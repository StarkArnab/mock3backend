const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { UserModel } = require("../models/users.model");

const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  res.json({ message: "Hi from inside the user" });
});

userRouter.post("/signup", async (req, res) => {
  const { email, password, confirmPassword } = req.body;
  if (email && password && confirmPassword) {
    const userDetails = await UserModel.findOne({ email });
    if (userDetails) {
      return res.status(400).json({
        message: "User already exists, please login first!!",
        flag: true,
      });
    }
    if (password !== confirmPassword) {
      return res.json({ message: "Password does not match", flag: true });
    }
    bcrypt.hash(password, 5, async function (err, hash) {
      await UserModel.create({
        email,
        password: hash,
      });
      return res.json({ message: "User signed in succesfully" });
    });
  } else {
    return res
      .status(400)
      .json({ message: "Please fill all the details", flag: true });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    const userDetail = await UserModel.findOne({ email });
    if (userDetail) {
      bcrypt.compare(password, userDetail.password, function (err, result) {
        if (result) {
          const token = jwt.sign(
            { userID: userDetail._id },
            process.env.JWT_SECRET
          );
          return res.json({ message: "Login successfull", token });
        } else {
          return res
            .status(400)
            .json({ message: "Wrong credentials", flag: true });
        }
      });
    } else {
      return res
        .status(400)
        .json({ message: "User does not exist please signup", flag: true });
    }
  } else {
    return res.json({ message: "Please enter all your details", flag: true });
  }
});

module.exports = { userRouter };
