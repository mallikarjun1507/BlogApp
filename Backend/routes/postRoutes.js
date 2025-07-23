const express = require("express");
const db = require("../config/db");
const router = express.Router();

//  Create a new post
router.post("/", (req, res) => {
    const { title, content, author_id } = req.body;

    //  Basic validation
    if (!title || !content) {
        return res.status(400).json({ error: "Title and content are required" });
    }

    console.log("Incoming POST:", { title, content, author_id });

    const query = "INSERT INTO posts (title, content, author_id) VALUES (?, ?, ?)";
    db.query(query, [title, content, author_id || null], (err, result) => {
        if (err) {
            console.error("Insert Error:", err);
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: result.insertId, title, content, author_id });
    });
});

// Get all posts
router.get("/", (req, res) => {
    db.query("SELECT * FROM posts", (err, results) => {
        if (err) {
            console.error("Fetch Error:", err);
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

//  Get a single post by ID
router.get("/:id", (req, res) => {
    const { id } = req.params;
    db.query("SELECT * FROM posts WHERE id = ?", [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.length === 0) return res.status(404).json({ error: "Post not found" });
        res.json(result[0]);
    });
});

// Update a post
router.put("/:id", (req, res) => {
    const { title, content } = req.body;
    const { id } = req.params;

    if (!title || !content) {
        return res.status(400).json({ error: "Title and content are required for update" });
    }

    const query = "UPDATE posts SET title = ?, content = ? WHERE id = ?";
    db.query(query, [title, content, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ error: "Post not found" });
        res.json({ message: "Post updated successfully" });
    });
});

// Delete a post
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM posts WHERE id = ?", [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ error: "Post not found" });
        res.json({ message: "Post deleted successfully" });
    });
});

module.exports = router;
