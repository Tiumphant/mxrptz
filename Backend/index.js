 
 require("./db/config.js")
const express = require("express");
const cors = require("cors");
const PatientController = require("./controller/PatientController.js")
const DoctorController = require("./controller/DoctorController.js")
const UserController = require("./controller/UserController.js")
const AppointmentController = require("./controller/AppointmentController.js")
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", UserController,DoctorController, PatientController, AppointmentController)
app.get("/", (req, res) => {
  res.send("This is the server");
});
app.use("/upload", express.static('upload'));


app.listen(8000)