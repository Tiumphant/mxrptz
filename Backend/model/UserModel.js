const mongoose = require("mongoose")
const UserSchema = new mongoose.Schema(
    {
        name: {type: String},
        age: {type: Number},
        role: { type: String, enum: ['patient', 'doctor'] }, 
        details: { type: mongoose.Schema.Types.Mixed },
        contactNumber: { type: String },
        email: { type: String, required: true },
        password: {type: String}
    });
    
const User = mongoose.model("user",UserSchema)
module.exports = User;
