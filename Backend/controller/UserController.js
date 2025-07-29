const express = require("express");
const User = require("../model/UserModel");
const router = express.Router();
router.use(express.json());

router.get("/registration", async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error" });
    }
});

router.post("/registration", async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ success: false, message: "Email is required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        const newUser = new User(req.body);
        await newUser.save();

        res.status(201).json({ success: true, message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error registering user" });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email) {
        return res.status(400).json({ message: "Enter Email ID" });
    }

    if (!password) {
        return res.status(400).json({ message: "Enter Password" });
    }

    try {
        const user = await User.findOne({ email, password }).select("-password");

        if (!user) {
            return res.status(404).json({ message: "No result found" });
        }

        return res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: "Server error during login" });
    }
});

module.exports = router;
