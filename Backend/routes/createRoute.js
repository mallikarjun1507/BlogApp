const express = require("express");
const db = require("../config/db");
const bcrypt = require("bcrypt");

const router = express.Router();

router.post("/", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = "INSERT INTO user (email, passwords) VALUES (?, ?)";
        db.query(query, [email, hashedPassword], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ message: "User registered successfully!" });
        });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
