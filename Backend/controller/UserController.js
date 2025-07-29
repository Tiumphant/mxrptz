
 const express = require("express");
const User = require("../model/UserModel")

const route = express.Router();
route.use(express.json());
route.get("/registration", async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        console.error("Error fetching registrations:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
});
route.post("/registration", async (req, res) => {
    try {
        const { email } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        const newUser = new User(req.body);
        await newUser.save();

        res.status(201).json({ success: true, message: "User regiser successfuly" });
    } catch (error) {
        res.status(500).json({ success: false, message: "server error" });
    }
});


route.post("/login", async (req, resp) => {
    if (req.body.email && req.body.password) {
        try {
            const data = await User.findOne(req.body).select("-password")
            if (data === null) {
                resp.send({ message: "No result found" })
            } else {
                console.log(data)
                resp.send(data)
            }
        } catch (err) {
            console.log("Error in login Api", err)
        }
    } else if (req.body.email === "undefined") {
        resp.send({ message: "Enter Email id" })
    } else if (req.body.password === "undefined") {
        resp.send({ message: "Enter Password" })
    } else {
        resp.send({ message: "Enter LoginId And Password" })
    }
})

    

module.exports = route;
