const express = require("express");
const { DoctorModel } = require("../models/doctors.model");
const { authorization } = require("../middlewares/authorization.middlewares");

const doctorRouter = express.Router();

doctorRouter.get("/", (req, res) => {
  res.json({ message: "Hi from inside doctor" });
});

doctorRouter.get("/appointments", authorization, async (req, res) => {
  const { filter, name, sortOrder } = req.query;
  let query = {};
  if (filter) {
    query.specialization = filter;
  }
  if (name) {
    query.name = { $regex: name, $options: "i" };
  }
  let data = await DoctorModel.find(query);
  if (sortOrder === "asc") {
    data = data.sort((a, b) => new Date(a.date) - new Date(b.date));
  } else {
    data = data.sort((a, b) => new Date(b.date) - new Date(a.date));
  }
  res.json({ data });
});

doctorRouter.post("/appointments", authorization, async (req, res) => {
  const {
    name,
    imageURL,
    specialization,
    experience,
    location,
    date = Date.now(),
    slots,
    fee,
  } = req.body;

  if (
    name &&
    imageURL &&
    specialization &&
    experience &&
    location &&
    date &&
    slots &&
    fee
  ) {
    await DoctorModel.create({
      name,
      imageURL,
      specialization,
      experience,
      location,
      date,
      slots,
      fee,
    });

    return res.json({ message: "Doctor entry has been created successfully" });
  } else {
    return res
      .status(400)
      .json({ message: "Please enter all the fields", flag: true });
  }
});

module.exports = { doctorRouter };
