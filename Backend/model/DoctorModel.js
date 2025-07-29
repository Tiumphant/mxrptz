
const mongoose = require("mongoose")
const DoctorSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    unique:true
  },
  description: {
    type: String,
  }
});
module.exports = mongoose.model("Doctor", DoctorSchema);