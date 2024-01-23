const mongoose = require("mongoose");

const doctorSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    imageURL: { type: String, required: true },
    specialization: {
      type: String,
      required: true,
      enum: ["Cardiologist", "Dermatologist", "Pediatrician", "Psychiatrist"],
    },
    experience: { type: Number, required: true },
    location: { type: String, required: true },
    date: { type: Date, default: Date.now },
    slots: { type: Number, required: true },
    fee: { type: Number, required: true },
  },
  { timestamps: true }
);

const DoctorModel = mongoose.model("doctor", doctorSchema);

module.exports = { DoctorModel };
