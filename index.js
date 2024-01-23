const express = require("express");
const cors = require("cors");
const { connection } = require("./config/db");
const { userRouter } = require("./routes/users.routes");
const { doctorRouter } = require("./routes/doctors.routes");
require("dotenv").config();

const app = express();

app.use(express.json());

app.use(cors({ origin: "*" }));

app.get("/", (req, res) => {
  return res.json({ message: "Server is working" });
});

app.use("/user", userRouter);
app.use("/doctor", doctorRouter);

const PORT = process.env.PORT || 8080;

app.listen(PORT, async () => {
  try {
    await connection;
    console.log(`Database is connnected`);
    console.log(`Server is running on PORT ${PORT}`);
  } catch (error) {
    console.log(error);
  }
});
