const express = require("express");
const Appointment = require("../model/Appointmentmodel");
const route = express.Router();
route.use(express.json())

route.get("/appointment", async (req, res) => {
    try {
        let result = await Appointment.find();
        res.status(200).json(result);
    } catch (err) {
       res.status(500).json({message: "internal server Error", err})
    }
});

route.get('/appointment/:id', async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);
        res.json(appointment);
    } catch (error) {
        res.status(500).json({ message: "Error fetching appointment", error });
    }
});

route.post("/appointment", async (req, res) => {
    try {
        let result = await new Appointment(req.body).save();
        res.status(201).json({ message: "Post appointment successfully", data: result });
    } catch (err) {
        res.status(500).json({ message: "Error posting appointment", error: err.message });
    }
});

route.put("/appointment/:id", async (req, res) => {
    try {
        const id = req.params.id;
        let result = await Appointment.updateOne({ _id: id }, { $set: req.body });
        res.status(200).json({ message: "Appointment updated successfully", data: result });
    } catch (err) {
        res.status(500).json({message: "internal server Error", err})
    }
});

route.delete("/appointment/:id", async (req, res) => {
    try {
        const { id } = req.params;
        let result = await Appointment.deleteOne({_id:id});
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Appointment not found" });
        }
        res.status(200).json({ message: "Appointment deleted successfully" });
    } catch (err) {
       res.status(500).json({message: "Error in deleting appointment data", err})
    }
});

module.exports = route;