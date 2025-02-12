const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const authMiddleware = require('../middleware/auth');

// Public: Get all blogs
router.get('/', async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 });
        res.json(blogs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Protected: Create a blog
router.post('/', authMiddleware, async (req, res) => {
    const { title, content, image } = req.body;
    try {
        const newBlog = new Blog({ title, content, image });
        await newBlog.save();
        res.status(201).json(newBlog);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Protected: Update a blog
router.put('/:id', authMiddleware, async (req, res) => {
    const { title, content, image } = req.body;
    try {
        const blog = await Blog.findByIdAndUpdate(
            req.params.id,
            { title, content, image },
            { new: true }
        );
        if (!blog) return res.status(404).json({ message: 'Blog not found' });
        res.json(blog);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Protected: Delete a blog
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id);
        if (!blog) return res.status(404).json({ message: 'Blog not found' });
        res.json({ message: 'Blog deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
