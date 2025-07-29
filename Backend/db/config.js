const mongoose = require('mongoose')
module.exports = mongoose.connect('mongodb://localhost:27017/hospitalmanagment').then(()=>{
    console.log("Database connected")
}).catch((err)=>{
    console.log("Error in Connecting to datatbse", err)
})