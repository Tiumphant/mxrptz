const mongoose = require("mongoose")
const AppointmentSchema = mongoose.Schema(
    {
       appointment_date: { type: Date },
       status: { type: String, enum: ['Scheduled', 'Completed', 'Cancelled'], default: 'Scheduled' },
       reason: { type: String }

    }, { timestamps: true }
)
module.exports = mongoose.model('Appointment', AppointmentSchema);