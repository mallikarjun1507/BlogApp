const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
    res.json({ message: "Login logic goes here..." });
});

module.exports = router;
